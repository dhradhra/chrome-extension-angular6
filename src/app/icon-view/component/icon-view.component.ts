import {Component, ElementRef, Inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DOCUMENT} from '@angular/common';
import {IconUnit} from '../models/icon-unit';
import {IconVerticalLayer} from '../models/icon-vertical-layer';
import {DeskViewBaseComponent} from '../../shared/base-structures/desk-view-base.component';
import {Widget} from '../../shared/base-structures/widget';
import {WidgetType} from '../../shared/base-structures/widget-type';
import {ChromeStorageService} from '../../shared/storage/services/chrome-storage.service';
import {IconUnitStorageable} from '../models/icon-unit-storageable';
import {IconUnitPosition} from '../models/icon-unit-position';

@Component({
    selector: 'app-icon-view',
    templateUrl: './icon-view.component.html',
    styleUrls: ['./icon-view.component.scss']
})
export class IconViewComponent extends DeskViewBaseComponent implements OnInit {

    @Input() widgets: Widget[];
    @Input() addUnit: Observable<void>;
    @Input() viewChangeEvent: Observable<void>;

    units: IconUnit[];

    @ViewChild('addWidgetModal') addWidgetModalTpl: TemplateRef<any>;
    @ViewChild('widgetsBar') widgetsBar: ElementRef;
    hideOpenedWidgets: Subject<void> = new Subject<void>();

    availableWidgets: Widget[];
    layers: IconVerticalLayer[] = [];
    matDialogRef: MatDialogRef<any, any>;

    draggingWidget: Widget;
    draggingLayer: IconVerticalLayer;
    lastEnteredArea: {
        layer: IconVerticalLayer,
        layerIdx: number,
    };

    canDrag = false;

    private _userUnitKeys: string[];

    private readonly STORAGE_KEY = 'icon-view';

    constructor(
        public dialog: MatDialog,
        @Inject(DOCUMENT) public document: Document,
        private storage: ChromeStorageService,
    ) {
        super();
    }

    ngOnInit() {
        this.availableWidgets = this.widgets;
        this.addUnit.subscribe(() => {
            this.openAddWidgetModal();
        });
        this.viewChangeEvent.subscribe(event => {
            this.hideOpenedWidgets.next();
        });
        this.storage.get(this.STORAGE_KEY).subscribe((data: IconUnitStorageable[]) => {
            if (data) {
                this.units = this.fromStorageToModel(data, this.widgets);
            } else {
                this.units = this.fromStorageToModel([], this.widgets);
            }
            this.initLayers();
        });
    }

    widgetOpened() {
        return () => this.hideOpenedWidgets.next();
    }

    openAddWidgetModal() {
        this.matDialogRef = this.dialog.open(this.addWidgetModalTpl, {
            panelClass: 'app-add-widget-modal-overlay',
            data: {
                widgets: this.widgets
            },
        });
    }

    onDragStart($event, type: string, widget: Widget, layer?: IconVerticalLayer) {
        if (!type) {
            type = $event.type;
            widget = $event.widget;
        }
        if (type === 'available') {
            const modals = this.document.getElementsByClassName('cdk-overlay-container');
            Array.from(modals).forEach((el: any) => {
                el.style.zIndex = -1;
                el.style.opacity = 0;
            });
        }

        this.draggingWidget = widget;
        if (layer) {
            this.draggingLayer = layer;
            layer.isDragging = true;
        }
        setTimeout(() => {
            const el = this.document.querySelector('.drag-active') as HTMLElement;
            if (el) {
                el.style.display = 'none';
            }
        }, 20);
    }

    onDragEnd($event, type: string, layer?: IconVerticalLayer) {
        if (!type) {
            type = $event.type;
        }
        const el = this.document.querySelector('.drag-active') as HTMLElement;
        if (el) {
            el.style.display = 'block';
        }
        if (type === 'available') {
            this.matDialogRef.close();
            const modals = this.document.getElementsByClassName('cdk-overlay-container');
            setTimeout(() => {
                Array.from(modals).forEach((_el: any) => {
                    _el.style.zIndex = null;
                    _el.style.opacity = null;
                });
            }, 500);
        }

        if (!this.lastEnteredArea) {
            this.draggingWidget = null;
            return false;
        }

        if (type === 'user') {
            const idx = this.layers.indexOf(layer);
            this.layers.splice(idx, 1);
            for (let i = idx; i < this.layers.length; i++) {
                this.layers[i].unit.position.verticalLayer--;
                if (this.lastEnteredArea.layer === this.layers[i]) {
                    this.lastEnteredArea.layerIdx--;
                }
            }
        }

        const newUnit = new IconUnit(
            this.draggingWidget,
            {
                verticalLayer: this.lastEnteredArea.layerIdx,
            }
        );
        const units = this.layers.reduce((_units: IconUnit[], _layer: IconVerticalLayer, layerIdx: number) => {
            if (_layer.isSpacer) {
                return _units;
            }
            if (layerIdx >= this.lastEnteredArea.layerIdx) {
                _layer.unit.position.verticalLayer++;
            }
            _units.push(_layer.unit);
            return _units;
        }, [newUnit]);
        if (layer) {
            layer.isDragging = false;
        }
        this.draggingWidget = null;
        this.lastEnteredArea = null;

        this.saveUnits(units);
        this.setWidgetsOverflowScroll();
        this.canDrag = false;
    }

    onDragEnter($event, layer: IconVerticalLayer, layerIdx: number) {
        if (this.lastEnteredArea) {
            this.lastEnteredArea.layer.hasGhost = false;
        }
        this.lastEnteredArea = {
            layer,
            layerIdx,
        };
        layer.hasGhost = true;
    }

    removeLayer(layerIdx: number) {
        const units = this.layers.reduce((_units: IconUnit[], _layer: IconVerticalLayer, _layerIdx: number) => {
            if (_layer.isSpacer) {
                return _units;
            }
            if (_layerIdx < layerIdx) {
                _units.push(_layer.unit);
            }
            if (_layerIdx > layerIdx) {
                _layer.unit.position.verticalLayer--;
                _units.push(_layer.unit);
            }
            return _units;
        }, []);

        this.saveUnits(units);
    }

    onDragIconOver($event) {
        if (!this.draggingWidget) {
            this.canDrag = true;
        }
        this.setWidgetsOverflowHidden();
    }

    onDragIconOut($event) {
        if (!this.draggingWidget) {
            this.canDrag = false;
        }
        this.setWidgetsOverflowScroll();
    }

    setWidgetsOverflowHidden() {
        this.widgetsBar.nativeElement.style.overflowY = 'hidden';
    }

    setWidgetsOverflowScroll() {
        // TODO do something with scroll
        // this.widgetsBar.nativeElement.style.overflowY = 'scroll';
        this.widgetsBar.nativeElement.style.overflowY = 'hidden';
    }

    getValidateDragFn() {
        return coords => this.validateDrag(coords);
    }

    validateDrag(coords) {
        return this.canDrag;
    }

    private saveUnits(units) {
        this.storage
            .set(this.STORAGE_KEY, this.fromModelToStorage(units))
            .subscribe(() => {
                this.units = units;
                this.initLayers();
            });
    }

    private fromStorageToModel(data: IconUnitStorageable[], widgets: Widget[]): IconUnit[] {
        return data.map(record => {
            const widget = widgets.find(w => w.key === record.k);
            const position = <IconUnitPosition>{
                verticalLayer: record.v,
            };
            return new IconUnit(widget, position);
        });
    }

    private fromModelToStorage(units: IconUnit[]): IconUnitStorageable[] {
        return units.map(unit => (<IconUnitStorageable>{
            k: unit.widget.key,
            v: unit.position.verticalLayer,
        }));
    }

    private initLayers() {
        this._userUnitKeys = [];
        this.layers = this.units.sort((unit1, unit2) => {
            return unit1.position.verticalLayer < unit2.position.verticalLayer ? -1 : 1;
        }).map(unit => {
            this._userUnitKeys.push(unit.widget.key);
            return <IconVerticalLayer>{
                unit,
            };
        });
        this.layers.push(<IconVerticalLayer>{
            unit: {
                widget: new Widget('shadow', null, null, {types: [WidgetType.icon]}),
                position: {
                    verticalLayer: this.layers.length,
                }
            },
            isSpacer: true,
        });
        // this.availableWidgets = this.widgets.filter(widget => !this._userUnitKeys.includes(widget.key));
        this.availableWidgets = this.widgets;
    }
}

import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Widget} from '../../shared/base-structures/widget';
import {WidgetType} from '../../shared/base-structures/widget-type';
import {ChromeStorageService} from '../../shared/storage/services/chrome-storage.service';
import {WidgetsDynamicService} from '../../widgets/widgets-dynamic/widgets-dynamic.service';

enum ViewType {
    'icon' = 0,
    'full' = 1,
}

@Component({
    selector: 'app-desk',
    templateUrl: './desk.component.html',
    styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit {

    allWidgets: Widget[];
    fullWidgets: Widget[];
    iconWidgets: Widget[];
    currentView: string;
    defaultView: string;
    addFullUnit: Subject<void> = new Subject();
    addIconUnit: Subject<void> = new Subject();
    viewChange: Subject<any> = new Subject<any>();
    firstLoad = true;

    get viewTypeIndex() {
        return ViewType[this.currentView];
    }

    private defaults: {
        currentView: ViewType,
        defaultView: ViewType,
    } = {
        currentView: ViewType.icon,
        defaultView: ViewType.icon,
    };

    private readonly STORAGE_KEY = 'desk';

    constructor(
        private widgetsService: WidgetsDynamicService,
        private storage: ChromeStorageService,
    ) {
    }

    ngOnInit() {
        this.widgetsService.widgets.subscribe(widgets => {
            this.storage.get(this.STORAGE_KEY).subscribe((data: { v: number }) => {
                this.allWidgets = widgets;
                this.fullWidgets = widgets.filter(widget => widget.settings.types.includes(WidgetType.full));
                this.iconWidgets = widgets.filter(widget => widget.settings.types.includes(WidgetType.icon));
                if (data) {
                    this.currentView = ViewType[data.v];
                    this.defaultView = ViewType[data.v];
                } else {
                    this.currentView = ViewType[this.defaults.currentView];
                    this.defaultView = ViewType[this.defaults.defaultView];
                }
                setTimeout(() => {
                    this.firstLoad = false;
                }, 100);
            });
        });
    }

    onAddUnit($event) {
        if (this.currentView === ViewType[ViewType.full]) {
            this.addFullUnit.next($event);
        } else {
            this.viewChange.next(ViewType.icon);  // close opened widgets
            this.addIconUnit.next($event);
        }
    }

    searchBarOpen($event) {
        this.viewChange.next(ViewType.icon);  // close opened widgets
    }

    goFullView() {
        this.viewChange.next(ViewType.full);
        this.currentView = ViewType[ViewType.full];
    }

    goIconView() {
        this.viewChange.next(ViewType.icon);
        this.currentView = ViewType[ViewType.icon];
    }

    setDefaultViewType() {
        this.defaultView = this.currentView;
        const data = {
            v: ViewType[this.defaultView],
        };
        this.storage.set(this.STORAGE_KEY, data);
    }
}

import {Injectable} from '@angular/core';
import {FullVerticalLayer} from './models/full-vertical-layer';
import {FullUnit} from './models/full-unit';
import {FullUnitPosition} from './models/full-unit-position';
import {Widget} from '../shared/base-structures/widget';
import {IconUnitStorageable} from '../icon-view/models/icon-unit-storageable';
import {IconUnit} from '../icon-view/models/icon-unit';
import {IconUnitPosition} from '../icon-view/models/icon-unit-position';
import {FullUnitStorageable} from './models/full-unit-storageable';

@Injectable()
export class FullViewHelperService {

    constructor() {
    }

    layerHasWidget(layer: FullVerticalLayer, widget: Widget) {
        return !!layer.units.find(unit => unit.widget === widget);
    }

    getLayerUnitsHeight(layer: FullVerticalLayer) {
        const unitsHeight = layer.units.reduce((max, unit) => Math.max(unit.widget.settings.height, max), 0);
        return layer.isDragging && layer.units.length === 1 ? 0 : unitsHeight;
    }

    columnHasLayer(column: FullVerticalLayer[], layer: FullVerticalLayer) {
        return column.includes(layer);
    }

    getLayerColumn(layer: FullVerticalLayer, columns: FullVerticalLayer[][]) {
        return columns.find(column => this.columnHasLayer(column, layer));
    }

    removeUnitFromLayer(unit: FullUnit, layer: FullVerticalLayer) {
        layer.units = layer.units.filter(_unit => _unit !== unit);
    }

    removeLayerFromColumn(layer: FullVerticalLayer, column: FullVerticalLayer[]) {
        const layerIdx = column.indexOf(layer);
        column[layerIdx] = null;
        this.addXtoVerticalLayer(-1, column, layerIdx);
    }

    addXtoVerticalLayer(x: number, layers: FullVerticalLayer[], startIndex: number = 0) {
        for (let l = startIndex; l < layers.length - 1; l++) {    // column.length - 1, because last layer is spacer
            if (layers[l] !== null) {
                layers[l].units.forEach(unit => unit.position.verticalLayer += x);
            }
        }
    }

    isLayerWithSmallUnits(layer: FullVerticalLayer) {
        return layer.units.length && layer.units[0].widget.settings.cellsCount === 1;
    }

    getLayerStaticUnits(layer: FullVerticalLayer, draggingUnit: FullUnit) {
        return layer.units.filter(unit => unit !== draggingUnit);
    }

    addWidgetToExistedLayer(widget: Widget, layer: FullVerticalLayer) {
        const existedUnit = layer.units[0];
        const newUnits: FullUnit[] = [];
        const newUnit = new FullUnit(widget, <FullUnitPosition> {
            column: existedUnit.position.column,
            verticalLayer: existedUnit.position.verticalLayer,
            horizontalLayer: layer.ghostPosition.left ? 0 : 1,
        });
        if (newUnit.position.horizontalLayer === 1) {
            existedUnit.position.horizontalLayer = 0;
            newUnits.push(existedUnit, newUnit);
        } else {
            existedUnit.position.horizontalLayer = 1;
            newUnits.push(newUnit, existedUnit);
        }
        layer.units = newUnits;
    }

    addWidgetToNewLayer(widget: Widget, layer: FullVerticalLayer, columns: FullVerticalLayer[][]) {
        const column = this.getLayerColumn(layer, columns);
        const columnIdx = columns.indexOf(column);
        const layerIdx = column.indexOf(layer);
        const realLayerIdx = this.getRealLayerIdx(layer, column);
        const newLayer = <FullVerticalLayer>{
            height: widget.settings.height,
            units: [
                new FullUnit(widget, <FullUnitPosition> {
                    column: columnIdx,
                    verticalLayer: realLayerIdx,
                    horizontalLayer: layer.ghostPosition.left ? 0 : 1,
                }),
            ]
        };
        if (layer.isSpacer) {
            const prevLayerIdx = this.getPrevLayerIdx(layerIdx, column);
            const newExtraLayers = this.getExtraLayersForLayer(newLayer);
            newExtraLayers.forEach((_layer, i) => {
                column.splice(prevLayerIdx + i + 1, 0, _layer);
            });
        } else {
            let newLayerIdx;
            if (layer.ghostPosition.top) {
                const prevLayerIdx = this.getPrevLayerIdx(layerIdx, column);
                newLayerIdx = ~~((prevLayerIdx + layerIdx) / 2);
                column[newLayerIdx] = newLayer;
                this.addXtoVerticalLayer(1, column, newLayerIdx + 1);
            } else {
                const nextLayerIdx = this.getNextLayerIdx(layerIdx, column);
                newLayerIdx = ~~((nextLayerIdx + layerIdx) / 2);
                column[newLayerIdx] = newLayer;
                this.addXtoVerticalLayer(1, column, newLayerIdx);
            }
        }
    }

    getNextLayerIdx(layerIdx: number, column: FullVerticalLayer[]) {
        for (let i = layerIdx + 1; i < column.length; i++) {
            if (column[i] !== null) {
                return i;
            }
        }
        return layerIdx + 1;
    }

    getPrevLayerIdx(layerIdx: number, column: FullVerticalLayer[]) {
        for (let i = layerIdx - 1; i >= 0; i--) {
            if (column[i] !== null) {
                return i;
            }
        }
        return 0;
    }

    getRealLayerIdx(layer: FullVerticalLayer, column: FullVerticalLayer[]) {
        const realLayers = column.reduce((layers, _layer) => {
            if (_layer) {
                layers.push(_layer);
            }
            return layers;
        }, []);
        return realLayers.indexOf(layer);
    }

    getExtraLayersForLayer(layer: FullVerticalLayer) {
        const layers = Array(20).fill(null);
        layers.push(layer);
        return layers;
    }

    hasColumnEnoughEmptyAreas(column: FullVerticalLayer[]) {
        let diff = null;
        for (let i = 0; i < column.length; i++) {
            if (column[i] === null) {
                diff++;
            } else {
                if (diff === 0) {
                    return false;
                }
                diff = 0;
            }
        }
        return true;
    }

    getColumnLayerHeight(layer: FullVerticalLayer, draggingWidget: Widget) {
        let widgetsAreaHeight: number;
        let ghostAreaHeight: number;

        if (layer.isSpacer) {
            widgetsAreaHeight = 0;
            ghostAreaHeight = 0;
        } else {
            widgetsAreaHeight = this.getLayerUnitsHeight(layer);
            if (layer.hasGhost) {
                if (draggingWidget && draggingWidget.settings.cellsCount === 2) {
                    ghostAreaHeight = draggingWidget.settings.height;
                } else {
                    if (this.isLayerWithSmallUnits(layer)) {
                        if (layer.units.length === 1 || (layer.units.length === 2 && layer.isDragging)) {
                            ghostAreaHeight = layer.units.reduce((max, unit: FullUnit) => {
                                const widgetHeight = unit.widget.settings.height;
                                return widgetHeight > max ? widgetHeight : max;
                            }, draggingWidget ? draggingWidget.settings.height : 0);
                            ghostAreaHeight = ghostAreaHeight - widgetsAreaHeight;
                        } else {
                            ghostAreaHeight = draggingWidget ? draggingWidget.settings.height : 0;
                        }
                    } else {
                        ghostAreaHeight = draggingWidget ? draggingWidget.settings.height : 0;
                    }
                }

            } else {
                ghostAreaHeight = 0;
            }
        }
        return widgetsAreaHeight + ghostAreaHeight;
    }

    getGhostPosition(layer: FullVerticalLayer, draggingWidget: Widget) {
        const position: any = {
            top: false,
            bottom: false,
            left: false,
            right: false,
        };
        if (layer.hasGhost) {
            if (
                this.isLayerWithSmallUnits(layer)
                && ((layer.units.length === 2 && layer.isDragging) || layer.units.length === 1)
            ) {
                if (layer.hasGhost.endsWith('left')) {
                    position.top = false;
                    position.left = true;
                    position.right = false;
                    position.bottom = false;
                }
                if (layer.hasGhost.endsWith('right')) {
                    position.top = false;
                    position.left = false;
                    position.right = true;
                    position.bottom = false;
                }
            } else {
                const isBigWidget = draggingWidget && draggingWidget.settings.cellsCount === 2;
                switch (layer.hasGhost) {
                    case 'up-left':
                        position.top = true;
                        position.left = isBigWidget || true;
                        position.right = isBigWidget || false;
                        position.bottom = false;
                        break;
                    case 'down-left':
                        position.top = false;
                        position.left = isBigWidget || true;
                        position.right = isBigWidget || false;
                        position.bottom = true;
                        break;
                    case 'up-right':
                        position.top = true;
                        position.left = isBigWidget || false;
                        position.right = isBigWidget || true;
                        position.bottom = false;
                        break;
                    case 'down-right':
                        position.top = false;
                        position.left = isBigWidget || false;
                        position.right = isBigWidget || true;
                        position.bottom = true;
                        break;
                }
            }
        }
        return position;
    }

    fromStorageToModel(data: FullUnitStorageable[], widgets: Widget[]): FullUnit[] {
        return data.map(record => {
            const widget = widgets.find(w => w.key === record.k);
            const position = <FullUnitPosition>{
                column: record.c,
                verticalLayer: record.v,
                horizontalLayer: record.h,
            };
            return new FullUnit(widget, position);
        });
    }

    fromModelToStorage(units: FullUnit[]): FullUnitStorageable[] {
        return units.map(unit => ({
            k: unit.widget.key,
            c: unit.position.column,
            v: unit.position.verticalLayer,
            h: unit.position.horizontalLayer,
        }));
    }
}

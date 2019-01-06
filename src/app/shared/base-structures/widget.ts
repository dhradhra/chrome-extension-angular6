import { Type } from '@angular/core';
import { WidgetSettings } from './widget-settings';

export class Widget {
    constructor(public key: string, public title: string, public component: Type<any>, public settings: WidgetSettings) {}
}

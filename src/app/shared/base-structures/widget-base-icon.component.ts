import {Input} from '@angular/core';
import {Observable} from 'rxjs';
import {WidgetBaseComponent} from './widget-base.component';

export abstract class WidgetBaseIconComponent extends WidgetBaseComponent {
    @Input() frozen = false;
    @Input() hide: Observable<any>;
    @Input() opened: () => any;
}




import {EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Widget} from './widget';

export abstract class DeskViewBaseComponent  {
    @Input() abstract widgets: Widget[];
    @Input() abstract addUnit: Observable<void>;
    @Input() abstract viewChangeEvent: Observable<void>;
}

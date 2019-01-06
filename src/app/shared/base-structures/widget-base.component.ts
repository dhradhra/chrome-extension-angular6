import {Input} from '@angular/core';
import {WidgetType} from './widget-type';
import {WidgetSettings} from './widget-settings';
import { NewsfeedService } from '../../services/newsfeed-service';

export abstract class WidgetBaseComponent  {
    @Input() type: WidgetType;
    @Input() settings: WidgetSettings;
}

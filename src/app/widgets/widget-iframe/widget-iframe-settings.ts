import {WidgetSettings} from '../../shared/base-structures/widget-settings';

export interface WidgetIframeSettings extends WidgetSettings {
    url: string,
    fontIcon: string,
    fontSet: string,
}

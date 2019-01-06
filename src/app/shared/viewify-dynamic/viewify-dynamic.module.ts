import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DynamicAttributesDirective, DynamicComponent, DynamicDirective, DynamicModule} from 'ng-dynamic-component';
import {WidgetTimeComponent} from '../../widgets/widget-time/component/widget-time.component';
import {WidgetFeedComponent} from '../../widgets/widget-feed/component/widget-feed.component';
import {WidgetWeatherComponent} from '../../widgets/widget-weather/component/widget-weather.component';
import {WidgetIframeComponent} from '../../widgets/widget-iframe/component/widget-iframe.component';
import {WidgetTimeModule} from '../../widgets/widget-time/widget-time.module';
import {WidgetFeedModule} from '../../widgets/widget-feed/widget-feed.module';
import {WidgetWeatherModule} from '../../widgets/widget-weather/widget-weather.module';
import {WidgetIframeModule} from '../../widgets/widget-iframe/widget-iframe.module';


@NgModule({
    imports: [
        CommonModule,

        WidgetTimeModule,
        WidgetFeedModule,
        WidgetWeatherModule,
        WidgetIframeModule,

        DynamicModule.withComponents([
            WidgetTimeComponent,
            WidgetFeedComponent,
            WidgetWeatherComponent,
            WidgetIframeComponent
        ]),
    ],
    declarations: [],
    exports: [
        DynamicComponent,
        DynamicDirective,
        DynamicAttributesDirective,
        DynamicModule,
    ]
})
export class ViewifyDynamicModule {
}

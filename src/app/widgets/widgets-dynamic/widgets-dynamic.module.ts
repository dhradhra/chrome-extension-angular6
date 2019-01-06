import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicAttributesDirective, DynamicComponent, DynamicDirective, DynamicModule} from 'ng-dynamic-component';
import {WidgetTimeModule} from '../widget-time/widget-time.module';
import {WidgetFeedModule} from '../widget-feed/widget-feed.module';
import {WidgetWeatherModule} from '../widget-weather/widget-weather.module';
import {WidgetIframeModule} from '../widget-iframe/widget-iframe.module';
import {WidgetTimeComponent} from '../widget-time/component/widget-time.component';
import {WidgetFeedComponent} from '../widget-feed/component/widget-feed.component';
import {WidgetWeatherComponent} from '../widget-weather/component/widget-weather.component';
import {WidgetIframeComponent} from '../widget-iframe/component/widget-iframe.component';
import {WidgetsDynamicService} from './widgets-dynamic.service';

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
    providers: [
        WidgetsDynamicService,
    ],
    exports: [
        DynamicComponent,
        DynamicDirective,
        DynamicAttributesDirective,
        DynamicModule,
    ]
})
export class WidgetsDynamicModule {
}


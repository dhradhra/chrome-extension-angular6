import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetWeatherComponent} from './component/widget-weather.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {WeatherService} from './weather.service';
import {UtilsModule} from '../../shared/utils/utils.module';
import {BaseStructuresModule} from '../../shared/base-structures/base-structures.module';
import {WidgetModule} from '../widget/widget.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        UtilsModule,
        BaseStructuresModule,
        WidgetModule,
        MatSlideToggleModule,
    ],
    providers: [
        WeatherService,
    ],
    declarations: [WidgetWeatherComponent],
    exports: [
        WidgetWeatherComponent,
    ]
})
export class WidgetWeatherModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetComponent, WidgetFullComponent, WidgetIconComponent, WidgetSettingsComponent} from './component/widget.component';
import {BaseStructuresModule} from '../../shared/base-structures/base-structures.module';

@NgModule({
    imports: [
        CommonModule,
        BaseStructuresModule,
    ],
    declarations: [
        WidgetComponent,
        WidgetIconComponent,
        WidgetFullComponent,
        WidgetSettingsComponent,
    ],
    exports: [
        WidgetComponent,
        WidgetIconComponent,
        WidgetFullComponent,
        WidgetSettingsComponent,
    ]
})
export class WidgetModule {
}

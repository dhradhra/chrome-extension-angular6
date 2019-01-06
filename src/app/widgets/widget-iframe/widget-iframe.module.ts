import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetIframeComponent} from './component/widget-iframe.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {BaseStructuresModule} from '../../shared/base-structures/base-structures.module';
import {WidgetModule} from '../widget/widget.module';

@NgModule({
    imports: [
        CommonModule,
        BaseStructuresModule,
        MatIconModule,
        MatButtonModule,
        WidgetModule,
    ],
    declarations: [WidgetIframeComponent],
    exports: [WidgetIframeComponent],
})
export class WidgetIframeModule {
}

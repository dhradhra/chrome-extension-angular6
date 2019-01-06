import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetTimeComponent} from './component/widget-time.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {BaseStructuresModule} from '../../shared/base-structures/base-structures.module';
import {WidgetModule} from '../widget/widget.module';

@NgModule({
    imports: [
        CommonModule,
        BaseStructuresModule,
        MatButtonModule,
        MatIconModule,
        WidgetModule,
    ],
    declarations: [WidgetTimeComponent],
    exports: [
        WidgetTimeComponent,
    ]
})
export class WidgetTimeModule {
}

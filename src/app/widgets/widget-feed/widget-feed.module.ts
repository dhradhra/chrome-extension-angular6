import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetFeedComponent} from './component/widget-feed.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {BaseStructuresModule} from '../../shared/base-structures/base-structures.module';
import {WidgetModule} from '../widget/widget.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        BaseStructuresModule,
        MatButtonModule,
        MatIconModule,
        WidgetModule,
    ],
    declarations: [WidgetFeedComponent],
    exports: [
        WidgetFeedComponent,
    ]
})
export class WidgetFeedModule {
}

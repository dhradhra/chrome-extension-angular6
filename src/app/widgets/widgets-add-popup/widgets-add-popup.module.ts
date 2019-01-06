import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WidgetsAddPopupComponent} from './component/widgets-add-popup.component';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {WidgetsDynamicModule} from '../widgets-dynamic/widgets-dynamic.module';
import {MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        DragAndDropModule,
        WidgetsDynamicModule,
        MatIconModule,
        MatTabsModule,
    ],
    declarations: [
        WidgetsAddPopupComponent,
    ],
    exports: [
        WidgetsAddPopupComponent,
    ],
})
export class WidgetsAddPopupModule {
}

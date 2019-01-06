import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteModule} from '../quote/quote.module';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule, MatSidenavModule, MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {IconViewComponent} from './component/icon-view.component';
import {BaseStructuresModule} from '../shared/base-structures/base-structures.module';
import {StorageModule} from '../shared/storage/storage.module';
import {WidgetsDynamicModule} from '../widgets/widgets-dynamic/widgets-dynamic.module';
import {WidgetsAddPopupModule} from '../widgets/widgets-add-popup/widgets-add-popup.module';

@NgModule({
    imports: [
        CommonModule,

        MatCardModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTabsModule,
        DragAndDropModule,
        QuoteModule,
        BaseStructuresModule,
        StorageModule,
        WidgetsDynamicModule,
        WidgetsAddPopupModule,
    ],
    declarations: [IconViewComponent],
    exports: [
        IconViewComponent,
    ]
})
export class IconViewModule { }

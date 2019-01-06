import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StorageModule} from '../shared/storage/storage.module';
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule, MatSidenavModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {IconViewModule} from '../icon-view/icon-view.module';
import {DeskComponent} from './component/desk.component';
import {SearchBarModule} from '../search-bar/search-bar.module';
import {BaseStructuresModule} from '../shared/base-structures/base-structures.module';
import {FullViewModule} from '../full-view/full-view.module';
import {WidgetsDynamicModule} from '../widgets/widgets-dynamic/widgets-dynamic.module';

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
        MatTooltipModule,

        StorageModule,
        BaseStructuresModule,
        WidgetsDynamicModule,

        FullViewModule,
        IconViewModule,

        SearchBarModule
    ],
    declarations: [
        DeskComponent,
    ],
    exports: [
        DeskComponent,
    ]
})
export class DeskModule {
}

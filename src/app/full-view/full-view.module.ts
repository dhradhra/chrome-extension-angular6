import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullViewHelperService} from './full-view-helper.service';
import { FullViewComponent } from './component/full-view.component';
import {GhostComponent} from './component/ghost.component';
import {
    MatButtonModule, MatCardModule, MatIconModule, MatMenuModule
} from '@angular/material';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {BaseStructuresModule} from '../shared/base-structures/base-structures.module';
import {WidgetsDynamicModule} from '../widgets/widgets-dynamic/widgets-dynamic.module';
import {WidgetsAddPopupModule} from '../widgets/widgets-add-popup/widgets-add-popup.module';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        DragAndDropModule,
        BaseStructuresModule,
        WidgetsDynamicModule,
        WidgetsAddPopupModule,
    ],
    providers: [
        FullViewHelperService,
    ],
    declarations: [
        FullViewComponent,
        GhostComponent,
    ],
    exports: [
        FullViewComponent,
    ],
})
export class FullViewModule { }

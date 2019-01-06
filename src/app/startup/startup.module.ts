import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartupComponent} from './component/startup.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {UserModule} from '../shared/user/user.module';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        UserModule,
    ],
    declarations: [StartupComponent],
    exports: [StartupComponent],
})
export class StartupModule {
}

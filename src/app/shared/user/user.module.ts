import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './user.service';
import {StorageModule} from '../storage/storage.module';

@NgModule({
    imports: [
        CommonModule,
        StorageModule,
    ],
    providers: [
        UserService,
    ],
    declarations: []
})
export class UserModule {
}

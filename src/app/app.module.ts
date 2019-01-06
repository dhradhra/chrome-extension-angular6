import { HotkeyModule } from 'angular2-hotkeys';
import { HttpClientModule } from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {DeskModule} from './desk/desk.module';
import {StorageModule} from './shared/storage/storage.module';

import {UserModule} from './shared/user/user.module';
import {StartupModule} from './startup/startup.module';
import {UtilsModule} from './shared/utils/utils.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewsfeedService } from './services/newsfeed-service';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        HotkeyModule.forRoot(),
        StorageModule,
        DeskModule,
        UserModule,
        StartupModule,
        UtilsModule,
        HttpModule
    ],
    providers:[
        NewsfeedService
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

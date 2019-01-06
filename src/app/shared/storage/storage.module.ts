import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageService} from './services/storage-service';
import {ChromeStorageService} from './services/chrome-storage.service';
import {UtilsModule} from '../utils/utils.module';
import {AppStorageService} from './services/app-storage.service';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
  ],
  providers: [
      ChromeStorageService,
      AppStorageService,
  ],
  declarations: [],
  exports: [
     // StorageService,
     // ChromeStorageService,
  ]
})
export class StorageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilsService} from './utils.service';
import {FlickrImagesService} from './flickr-images.service';

@NgModule({
  imports: [
    CommonModule,
  ],
    providers: [
        UtilsService,
        FlickrImagesService,
    ],
  declarations: [
  ],
  exports: [
  ]
})
export class UtilsModule { }

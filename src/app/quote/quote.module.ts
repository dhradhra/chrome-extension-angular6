import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteComponent} from './component/quote.component';
import {QuoteService} from './quotes-service';
import {MatSlideToggleModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatSlideToggleModule,
    ],
    declarations: [
        QuoteComponent,
    ],
    providers: [
        QuoteService,
    ],
    exports: [
        QuoteComponent,
    ],
})
export class QuoteModule {
}

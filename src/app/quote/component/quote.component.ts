import {Component, ElementRef, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {QuoteService} from '../quotes-service';
import {Quote} from '../quote';

@Component({
    selector: 'app-quote',
    styleUrls: ['quote.component.scss'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './quote.component.html',
})
export class QuoteComponent implements OnInit {

    @Input() type: 'text' | 'settings' = 'text';

    favoriteQuotes: Quote[] = [];
    quote = new Quote();
    showQuote = true;

    constructor(private element: ElementRef, private quoteService: QuoteService) { }

    ngOnInit(): void {

        this.quoteService.getFavoritesQuotes().subscribe((quotes: Quote[]) => {
            this.favoriteQuotes = quotes;
        });

        this.quoteService.getQuotesState().subscribe(checked => {
            if (checked) {
                this.showQuote = true;
                this.loadQuote();
            } else {
                this.showQuote = false;
            }
        });
    }

    saveQuoteToFavorite(): void {
        const currentQuoteIndex = this.favoriteQuotes.map(x => x.quote).indexOf(this.quote.quote);
        if (currentQuoteIndex > -1) {
            alert('This quote already added');
        } else {
            this.favoriteQuotes.push(this.quote);
            this.quoteService.setFavoriteQuotes(this.favoriteQuotes);
        }
    }

    onOffQuote($event) {
        this.quoteService.setQuotesState($event.checked);
        if ($event.checked) {
            this.loadQuote();
        }
    }

    private loadQuote() {
        this.quoteService.getQuote().then(quotes => {
            if (quotes.length > 0) {
                this.quote = quotes[0];
                this.quote.quote = `"${this.quote.quote}"`;
            }
        });
    }
}

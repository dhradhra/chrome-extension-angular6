import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Quote} from './quote';
import {AppStorageService} from '../shared/storage/services/app-storage.service';
import {AppStorageKey} from '../shared/storage/models/app-storage-key';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable()
export class QuoteService {
    private quotesSourceUrl = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous';

    private _favStorageKey = new AppStorageKey<any>('w-todo-fav');
    private _onOffStorageKey = new AppStorageKey<any>('w-todo-on-off');

    private _favQuotesSubject: BehaviorSubject<Quote[]> = new BehaviorSubject([]);
    private _favQuotes: Observable<Quote[]> = this._favQuotesSubject.asObservable();

    private _onOffQuotesSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private _onOffQuotes: Observable<boolean> = this._onOffQuotesSubject.asObservable();

    constructor(
        private http: HttpClient,
        private storage: AppStorageService,
    ) { }

    public getQuote(): Promise<Quote[]> {
        return this.http.get<Quote[]>(this.quotesSourceUrl, {
            headers: {
                'X-Mashape-Key': 'NLWx8zPrtjmshDJbBPL3BdyRPqfUp1pFP72jsn8OAh3uOHSWiS',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }).toPromise();
    }

    public getFavoritesQuotes() {
        const quotes: Quote[] = [];
        this.storage.get(this._favStorageKey).then(value => {
            if (value && value.length > 0) {
                value.forEach(quote => {
                    quotes.push(Object.assign(new Quote(), quote));
                });
            }
            this._favQuotesSubject.next(quotes);
        });
        return this._favQuotes;
    }

    public setFavoriteQuotes(quotes: Quote[]) {
        this.storage.set(this._favStorageKey, quotes).then(() => {
            this._favQuotesSubject.next(quotes);
        });
    }

    public getQuotesState() {
        this.storage.get(this._onOffStorageKey).then(value => {
            this._onOffQuotesSubject.next(value !== false);
        });
        return this._onOffQuotes;
    }

    public setQuotesState(checked: boolean) {
        this.storage.set(this._onOffStorageKey, checked).then(() => {
            this._onOffQuotesSubject.next(checked);
        });
    }
}

import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

    @Output() open: EventEmitter<any> = new EventEmitter<any>();

    private maxWidth = '20vw';

    public searchInput: string;

    ngOnInit(): void {
        this.initJqueryEvents();
    }

    public searchGoogle(): void {
        window.open('https://www.google.com/search?q=' + this.searchInput, '_blank');
    }

    public searchAmazon(): void {
        window.open('https://www.amazon.com/s/field-keywords=' + this.searchInput, '_blank');
    }

    public searchEbay(): void {
        window.open('https://www.ebay.com/sch/i.html?_nkw=' + this.searchInput, '_blank');
    }

    public searchWalmart(): void {
        window.open('https://www.walmart.com/search/?query=' + this.searchInput, '_blank');
    }

    public searchAliexpress(): void {
        window.open('https://www.aliexpress.com/wholesale?&SearchText=' + this.searchInput, '_blank');
    }

    public get highlightText(): string {
        return this.searchInput ? this.searchInput.replace(/ /g, '\u00a0') : '';
    }

    public onKeyup(): void {
        const randomColor = 'hsl(' + 360 * Math.random() + ',' +
            (50 + 40 * Math.random()) + '%,' +
            (40 + 30 * Math.random()) + '%)';

        $('.input-highlight').css('border-top-color', randomColor);

        if (this.searchInput.length > 1) {
            this.open.emit(true);
        }
    }

    private initJqueryEvents(): void {
        const searchBar = this;
        $('#inpt_search').on('focus', function () {
            $(this).parent('label').addClass('active');
        });

        $('#inpt_search').on('mouseover', function () {
            $('app-searchbar').css('max-width', 'calc(' + searchBar.maxWidth + ' + 20px)');
        });

        $('#inpt_search').on('mouseout', function () {
            if (!$('#inpt_search').is(':focus') && $('#inpt_search').val().toString().length === 0) {
                $('app-searchbar').css('max-width', searchBar.maxWidth);
            }
        });

        $('#inpt_search').on('blur', function () {
            if ($(this).val().toString().length === 0) {
                $(this).parent('label').removeClass('active');
                $('app-searchbar').css('max-width', searchBar.maxWidth);
            // } else {
            //     setTimeout(() => {
            //         searchBar.searchInput = '';
            //     }, 500);
            }
        });
    }

}

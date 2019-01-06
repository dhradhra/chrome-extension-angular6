import {Component, OnInit} from '@angular/core';
import {WidgetBaseIconComponent} from '../../../shared/base-structures/widget-base-icon.component';

@Component({
    selector: 'app-widget-time',
    templateUrl: './widget-time.component.html',
    styleUrls: ['./widget-time.component.scss'],
})
export class WidgetTimeComponent extends WidgetBaseIconComponent implements OnInit {

    public currentTime: number;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.currentTime = Date.now();
        setInterval(() => this.currentTime = Date.now(), 1000);
    }
}


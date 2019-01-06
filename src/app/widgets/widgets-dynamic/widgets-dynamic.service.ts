import {Injectable} from '@angular/core';
import {WidgetIframeComponent} from '../widget-iframe/component/widget-iframe.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {WidgetWeatherComponent} from '../widget-weather/component/widget-weather.component';
import {WidgetFeedComponent} from '../widget-feed/component/widget-feed.component';
import {WidgetIframeSettings} from '../widget-iframe/widget-iframe-settings';
import {WidgetTimeComponent} from '../widget-time/component/widget-time.component';
import {WidgetType} from '../../shared/base-structures/widget-type';
import {Widget} from '../../shared/base-structures/widget';
import {WidgetSettings} from '../../shared/base-structures/widget-settings';

@Injectable()
export class WidgetsDynamicService {

    private widgetsList: BehaviorSubject<Widget[]> = new BehaviorSubject([

        new Widget('w-time', 'Time', WidgetTimeComponent, <WidgetSettings>{
            cellsCount: 1,
            height: 110,
            types: [WidgetType.icon, WidgetType.full],
        }),
     
        new Widget('w-g-mail', 'Gmail', WidgetIframeComponent, <WidgetIframeSettings>{
            cellsCount: 1,
            height: 450,
            types: [WidgetType.icon, WidgetType.full],
            fontSet: 'far',
            fontIcon: 'fa-envelope',
            url: 'https://mail.google.com/mail/mu/mp/?authuser=0',
        }),
        new Widget('w-weather', 'Weather', WidgetWeatherComponent, <WidgetSettings>{
            cellsCount: 1,
            height: 200,
            types: [WidgetType.icon, WidgetType.full],
        }),
        new Widget('w-feed', 'Feed', WidgetFeedComponent, <WidgetSettings>{
            cellsCount: 1,
            height: 500,
            types: [WidgetType.icon, WidgetType.full],
        }),
        new Widget('w-whats-app', 'Whatsapp', WidgetIframeComponent, <WidgetIframeSettings>{
            cellsCount:2,
            height: 500,
            types: [WidgetType.icon, WidgetType.full],
            fontSet: 'far',
            fontIcon: 'fa-envelope',
            url: 'https://web.whatsapp.com/send?',
        }),
        new Widget('w-google-analytics', 'Analytics', WidgetIframeComponent, <WidgetIframeSettings>{
            cellsCount: 1,
            height: 500,
            
            types: [WidgetType.icon, WidgetType.full],
            fontSet: 'far',
            fontIcon: 'fa-envelope',
            url: 'https://analytics.google.com/analytics/web/provision/?authuser=0#/provision',
        })
    ]);

    public readonly widgets: Observable<Widget[]> = this.widgetsList.asObservable();

    constructor() { }

}

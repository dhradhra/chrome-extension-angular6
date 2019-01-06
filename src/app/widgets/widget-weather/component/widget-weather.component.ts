import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {WeatherService} from '../weather.service';
import * as OAuth from 'oauth-1.0a';
import {Location} from '../models/location';
import {Astronomy, Atmosphere, Unit, WeatherData, Wind} from '../models/weather-data';
import {WeatherSettings} from '../models/weather-settings';
import {WidgetBaseIconComponent} from '../../../shared/base-structures/widget-base-icon.component';
import {AppStorageKey} from '../../../shared/storage/models/app-storage-key';
import {AppStorageService} from '../../../shared/storage/services/app-storage.service';
import {UtilsService} from '../../../shared/utils/utils.service';

@Component({
  selector: 'app-widget-weather',
  templateUrl: './widget-weather.component.html',
  styleUrls: ['./widget-weather.component.scss']
})
export class WidgetWeatherComponent extends WidgetBaseIconComponent implements OnInit, OnDestroy {

    public tempType = '';
    public woeid: number;
    public userIpAddress: string;
    public userAddress: string;
    public showAddress = false;
    public FindAutoAddress: boolean;
    public isFahrenheit = true;
    private sub = new Subscription();
    private serverUrl = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';

    private clientOAuthOptions: OAuth.Options = {
        consumer: {
            key: 'dj0yJmk9ZmFVb2cya3E1Ym03JmQ9WVdrOVZsUlBjWHBQTldVbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD02Yw--',
            secret: 'fb6a2ac83f818dd2cf47bca7c836b40039f9f5cd'
        },
        signature_method: 'PLAINTEXT',
        realm: ''
    };

    public weatherDatas: WeatherData[] = [];
    public weatherLocation: string;

    private readonly _storageKey = new AppStorageKey<Location>('w-weather');

    constructor(
        private http: HttpClient,
        private appStorage: AppStorageService,
        private weatherService: WeatherService,
        // private userService: UserService,
        private utils: UtilsService,
    ) {
        super();
        this.sub.add(this.weatherService.getWeatherForecast$.subscribe(isFahrenheit => {
            this.isFahrenheit = isFahrenheit;
            this.getWeatherForecast(this.woeid);
        }));
    }

    ngOnInit(): void {
        this.weatherService.getUserSettings();
        if (this.weatherService.UserSettings !== undefined) {
            this.userAddress = this.weatherService.UserSettings.ManualAddress;
        } else {
            this.userAddress = '';
        }
        this.getUserLocation(this.userAddress).then(location => {
            this.weatherLocation = location.city;
            this.woeid = location.woeid;
            this.weatherService.getTempType().then(data => {
                this.tempType = data;
                this.CheckStoredTempType();
                this.utils.getIpAddress().subscribe(resp => {
                    this.userIpAddress = resp['ip'];
                    if (this.weatherService.UserSettings !== undefined) {
                        this.showAddress = !this.weatherService.UserSettings.FindAutoAddress;
                        const hoursDifference = (new Date().getTime() -
                            new Date(this.weatherService.UserSettings.WeatherUpdatedAt).getTime()) / 1000 / 60 / 60;
                        if (this.userIpAddress !== this.weatherService.UserSettings.IpAddress || Math.floor(hoursDifference) > 0) {
                            this.getWeatherForecast(location.woeid);
                        } else {
                            this.weatherDatas = this.weatherService.UserSettings.WeatherData;
                        }
                    } else {
                        this.FindAutoAddress = true;
                        this.getWeatherForecast(location.woeid);
                    }

                });
            });
        });
    }


    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    updateUserSettingsAddress(Address) {
        let us: WeatherSettings;
        if (!this.weatherService.UserSettings) {
            us = this.getCurrentUserSettings();
        } else {
            us = this.weatherService.UserSettings;
        }
        us.ManualAddress = Address;
        us.FindAutoAddress = false;
        this.weatherService.syncUserSettings(us);
        this.userAddress = Address;
        this.FindAutoAddress = false;
        this.getUserLocation(Address).then(location => {
            this.weatherLocation = location.city;
            this.woeid = location.woeid;
            this.weatherService.getTempType().then(data => {
                this.tempType = data;
                this.CheckStoredTempType();
                this.utils.getIpAddress().subscribe(resp => {
                    this.userIpAddress = resp['ip'];
                    this.getWeatherForecast(location.woeid);
                });
            });
        });
    }

    onLocationSettingsChange(value) {
        if (value.checked === false) {
            this.showAddress = true;
            this.weatherService.UserSettings.FindAutoAddress = false;

        } else {
            this.showAddress = false;
            this.weatherService.UserSettings.FindAutoAddress = true;
        }
        this.weatherService.syncUserSettings(this.weatherService.UserSettings);
    }

    onChangeTempUnit(value) {
        if (value.checked === true) {
            this.isFahrenheit = true;
            this.weatherService.addOrUpdateTempType('f');
        } else {
            this.isFahrenheit = false;
            this.weatherService.addOrUpdateTempType('c');
        }

        this.weatherService.getWeatherForecast(this.isFahrenheit);
    }

    public weatherIcon(conditionCode?: string): string {
        if (!conditionCode && !this.weatherDatas[0]) {
            return '<i class="wi wi-cloud"></i>';
        }
        if (this.weatherDatas[0].conditionCode !== undefined) {
            switch (conditionCode || this.weatherDatas[0].conditionCode.toString()) {
                case '0': return '<i class="wi wi-tornado"></i>';
                case '1': return '<i class="wi wi-storm-showers"></i>';
                case '2': return '<i class="wi wi-tornado"></i>';
                case '3': return '<i class="wi wi-thunderstorm"></i>';
                case '4': return '<i class="wi wi-thunderstorm"></i>';
                case '5': return '<i class="wi wi-snow"></i>';
                case '6': return '<i class="wi wi-rain-mix"></i>';
                case '7': return '<i class="wi wi-rain-mix"></i>';
                case '8': return '<i class="wi wi-sprinkle"></i>';
                case '9': return '<i class="wi wi-sprinkle"></i>';
                case '10': return '<i class="wi wi-hail"></i>';
                case '11': return '<i class="wi wi-showers"></i>';
                case '12': return '<i class="wi wi-showers"></i>';
                case '13': return '<i class="wi wi-snow"></i>';
                case '14': return '<i class="wi wi-storm-showers"></i>';
                case '15': return '<i class="wi wi-snow"></i>';
                case '16': return '<i class="wi wi-snow"></i>';
                case '17': return '<i class="wi wi-hail"></i>';
                case '18': return '<i class="wi wi-hail"></i>';
                case '19': return '<i class="wi wi-cloudy-gusts"></i>';
                case '20': return '<i class="wi wi-fog"></i>';
                case '21': return '<i class="wi wi-fog"></i>';
                case '22': return '<i class="wi wi-fog"></i>';
                case '23': return '<i class="wi wi-cloudy-gusts"></i>';
                case '24': return '<i class="wi wi-cloudy-windy"></i>';
                case '25': return '<i class="wi wi-thermometer"></i>';
                case '26': return '<i class="wi wi-cloudy"></i>';
                case '27': return '<i class="wi wi-night-cloudy"></i>';
                case '28': return '<i class="wi wi-day-cloudy"></i>';
                case '29': return '<i class="wi wi-night-cloudy"></i>';
                case '30': return '<i class="wi wi-day-cloudy"></i>';
                case '31': return '<i class="wi wi-night-clear"></i>';
                case '32': return '<i class="wi wi-day-sunny"></i>';
                case '33': return '<i class="wi wi-night-clear"></i>';
                case '34': return '<i class="wi wi-day-sunny-overcast"></i>';
                case '35': return '<i class="wi wi-hail"></i>';
                case '36': return '<i class="wi wi-day-sunny"></i>';
                case '37': return '<i class="wi wi-thunderstorm"></i>';
                case '38': return '<i class="wi wi-thunderstorm"></i>';
                case '39': return '<i class="wi wi-thunderstorm"></i>';
                case '40': return '<i class="wi wi-storm-showers"></i>';
                case '41': return '<i class="wi wi-snow"></i>';
                case '42': return '<i class="wi wi-snow"></i>';
                case '43': return '<i class="wi wi-snow"></i>';
                case '44': return '<i class="wi wi-cloudy"></i>';
                case '45': return '<i class="wi wi-lightning"></i>';
                case '46': return '<i class="wi wi-snow"></i>';
                case '47': return '<i class="wi wi-thunderstorm"></i>';
                case '3200': return '<i class="wi wi-cloud"></i>';
                default: return '<i class="wi wi-cloud"></i>';
            }
        } else {
            return '<i class="wi wi-cloud"></i>';
        }
    }

    public get currentTemperature(): string {
        return this.weatherDatas[0] && this.weatherDatas[0].temp !== undefined && this.weatherDatas[0].temp.toString() !== 'NaN' ?
            this.weatherDatas[0].temp.toString() : '';
    }

    public get currentStatus(): string {
        return this.weatherDatas[0] && this.weatherDatas[0].condition;
    }

    public get currentWind(): Wind {
        return this.weatherDatas[0] && this.weatherDatas[0].wind || {};
    }

    public get currentAtmosphere(): Atmosphere {
        return this.weatherDatas[0] && this.weatherDatas[0].atmosphere || {};
    }

    public get currentAstronomy(): Astronomy {
        return this.weatherDatas[0] && this.weatherDatas[0].astronomy || {};
    }

    public get currentUnit(): Unit {
        return this.weatherDatas[0] && this.weatherDatas[0].unit || {};
    }

    private getWeatherForecast(woeid: number): void {
        const oauth = new OAuth(this.clientOAuthOptions);

        if (this.isFahrenheit) {
            this.tempType = 'f';
        } else {
            this.tempType = 'c';
        }
        const request_data = {
            url: this.serverUrl,
            method: 'POST',
            data: { w: woeid, u: this.tempType }
        };

        const thisComp = this;
        $.ajax({
            url: request_data.url,
            type: request_data.method,
            data: oauth.authorize(request_data)
        }).done(function (data) {
            thisComp.weatherDatas = [];
            const condition = $(data).find('item>yweather\\:condition');
            const wind = $(data).find('channel>yweather\\:wind');
            const atmosphere = $(data).find('channel>yweather\\:atmosphere');
            const astronomy = $(data).find('channel>yweather\\:astronomy');
            const units = $(data).find('channel>yweather\\:units');
            thisComp.weatherDatas.push({
                day: 'Today',
                temp: parseInt(condition.attr('temp'), 10),
                conditionCode: parseInt(condition.attr('code'), 10),
                condition: condition.attr('text'),
                wind: { chill: +wind.attr('chill'), direction: +wind.attr('direction'), speed: +wind.attr('speed') },
                atmosphere: { humidity: +atmosphere.attr('humidity'), pressure: +atmosphere.attr('pressure') },
                astronomy: { sunrise: astronomy.attr('sunrise'), sunset: astronomy.attr('sunset') },
                unit: {
                    distance: units.attr('distance'), pressure: units.attr('pressure'),
                    speed: units.attr('speed'), temperature: units.attr('temperature')
                }
            });

            $(data).find('item>yweather\\:forecast').each((index, forecast) => {
                thisComp.weatherDatas.push({
                    day: $(forecast).attr('day'),
                    high: parseInt($(forecast).attr('high'), 10),
                    low: parseInt($(forecast).attr('low'), 10),
                    conditionCode: parseInt($(forecast).attr('code'), 10),
                    condition: $(forecast).attr('text')
                });
            });

            // save to user settings
            const userSettingsData: WeatherSettings = {
                WeatherData: thisComp.weatherDatas,
                IpAddress: thisComp.userIpAddress,
                WeatherUpdatedAt: new Date().toString(),
                ShowWeather: true,
                FindAutoAddress: thisComp.FindAutoAddress,
                ManualAddress: thisComp.userAddress,
                WeatherLocation: thisComp.weatherLocation,
                Woeid: thisComp.woeid

            };
            thisComp.weatherService.syncUserSettings(userSettingsData);
        });
    }

    private getCurrentUserSettings() {
        return  <WeatherSettings>{
            WeatherData: this.weatherDatas,
            IpAddress: this.userIpAddress,
            WeatherUpdatedAt: new Date().toString(),
            ShowWeather: true,
            FindAutoAddress: this.FindAutoAddress,
            ManualAddress: this.userAddress,
            WeatherLocation: this.weatherLocation,
            Woeid: this.woeid
        };
    }

    CheckStoredTempType() {
        if (this.tempType !== '') {
            if (this.tempType === 'f') {
                this.isFahrenheit = true;
            } else {
                this.isFahrenheit = false;
            }
        } else {
            // if user comes fr the first time
            // if (this.woeid && this.woeid.toString() === '23424977') { // for usa only, defalut is Fahrenheit
            if (this.woeid.toString() === '23424977') { // for usa only, defalut is Fahrenheit
                this.isFahrenheit = true;
            } else {
                this.isFahrenheit = false;
            }
        }

    }

    private getUserLocation(UserLocation): Promise<Location> {
        return new Promise(resolve => {
            if (UserLocation === '') {
                this.appStorage.get(this._storageKey).then(value => {
                    if (value && value.woeid && value.city) {
                        resolve(value);
                    } else {

                        const regionUrlRequest = 'http://api.ipstack.com/check?access_key=3589f68db60f0f3e4898489508833085&format=1';
                        this.http.get<any>(regionUrlRequest).toPromise().then(data => {
                            const woeidUrlRequest = `http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=` +
                                `"${data.region_name}"&format=json`;
                            this.http.get<any>(woeidUrlRequest).toPromise().then(res => {
                                const woeid = +res.query.results.place.woeid || +res.query.results.place[0].woeid;
                                const location: Location = {
                                    woeid: woeid,
                                    regionName: data.region_name,
                                    city: data.city
                                };
                                this.appStorage.set<Location>(this._storageKey, location);
                                resolve(location);
                            });
                        });

                    }
                });
            } else {
                const woeidUrlRequest = `http://query.yahooapis.com/v1/public/yql?q=select * from geo.places where text=` +
                    `"${UserLocation}"&format=json`;
                this.http.get<any>(woeidUrlRequest).toPromise().then(res => {
                    const woeid = +res.query.results.place.woeid || +res.query.results.place[0].woeid;
                    const location: Location = {
                        woeid: woeid,
                        regionName: res.query.results.place.length > 0 ? res.query.results.place[0].name : res.query.results.place.name,
                        city: res.query.results.place.length > 0 ? res.query.results.place[0].name : res.query.results.place.name,
                    };
                    this.appStorage.set<Location>(this._storageKey, location);
                    resolve(location);
                });
            }
        });
    }
}

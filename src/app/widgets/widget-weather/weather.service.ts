import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {WeatherSettings} from './models/weather-settings';

@Injectable()
export class WeatherService {
    private getWeatherForecastSub = new Subject<boolean>();
    public getWeatherForecast$ = this.getWeatherForecastSub.asObservable();
    public UserSettings: WeatherSettings;

    public tempType = '';

    private _tempTypeKey = 'widget-weather-temp-type';
    private _userSettingsKey = 'widget-weather-user-settings';

    public addOrUpdateTempType(newContent: string): void {
        this.tempType = newContent;
        this.sync();
    }
    public getTempType(): any {
        return new Promise(resolve => {
            chrome.storage.sync.get(this._tempTypeKey, data => {
                if (data.tempType != null) {
                    this.tempType = data.tempType;
                    resolve(this.tempType);
                } else {
                    resolve('');
                }
            });
        });
    }

    public sync(): void {
        chrome.storage.sync.set({ tempType: this.tempType });
    }

    public getWeatherForecast(isFahrenheit: boolean): void {
        this.getWeatherForecastSub.next(isFahrenheit);
    }

    public getUserSettings(): Promise<WeatherSettings> {
        return new Promise(resolve => {
            chrome.storage.sync.get(this._userSettingsKey, data => {
                if (data.UserSettings != null) {
                    this.UserSettings = data.UserSettings;
                    resolve(this.UserSettings);
                } else {
                    resolve(null);
                }
            });
        });

    }
    public syncUserSettings(userSettings): void {
        chrome.storage.sync.set({ UserSettings: userSettings });
        this.UserSettings = userSettings;
    }
}

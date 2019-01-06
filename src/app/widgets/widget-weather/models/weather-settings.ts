import {WeatherData} from './weather-data';

export class WeatherSettings {
    public IpAddress: string;
    public WeatherUpdatedAt: string;
    public WeatherData: WeatherData[];
    public ShowWeather: boolean;
    public FindAutoAddress: boolean;
    public ManualAddress: string;
    public WeatherLocation: string;
    public Woeid: number;
}

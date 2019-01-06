import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UtilsService {

    constructor(private http: HttpClient) { }

    public static isNotEmpty(obj: any): boolean {
        return obj !== undefined && obj !== null && (obj instanceof String ? obj.trim() !== '' : obj);
    }

    public getIpAddress(): any {
        return this.http
            .get('https://ipinfo.io/json')
            .map(response => response || {});
    }
}

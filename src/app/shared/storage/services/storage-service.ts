import {Observable} from 'rxjs';

export interface StorageService {
    get(key: string): Observable<any>;
    set(key: string, data: any): Observable<any>;
    remove(key: string): Observable<any>;
}

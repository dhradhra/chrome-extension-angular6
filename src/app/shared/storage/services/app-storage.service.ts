import { Injectable } from '@angular/core';

import {AppStorageKey} from '../models/app-storage-key';
import {UtilsService} from '../../utils/utils.service';

@Injectable()
export class AppStorageService {
    public set<T>(key: AppStorageKey<T>, value: T): Promise<void> {
        const obj = {};
        obj[key.keyName] = value;
        return new Promise(resolve => {
            chrome.storage.local.set(obj, () => {
                resolve();
            });
        });
    }

    public get<T>(key: AppStorageKey<T>): Promise<T> {
        return new Promise(resolve => {
            chrome.storage.local.get(key.keyName, data => {
                resolve(<T>data[key.keyName]);
            });
        });
    }

    public isNotEmpty<T>(key: AppStorageKey<T>): Promise<boolean> {
        return new Promise(resolve => {
            this.get(key).then(data => {
                resolve(UtilsService.isNotEmpty(data));
            });
        });
    }
}

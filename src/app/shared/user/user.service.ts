import {Injectable} from '@angular/core';
import {AppStorageService} from '../storage/services/app-storage.service';
import {AppStorageKey} from '../storage/models/app-storage-key';

@Injectable()
export class UserService {

    private readonly _storageKey = new AppStorageKey<string>('user-username');

    constructor(private appStorage: AppStorageService) {
    }

    set(username) {
        return this.appStorage.set(this._storageKey, username);
    }

    hasUserName() {
        return this.appStorage.isNotEmpty(this._storageKey);
    }
}

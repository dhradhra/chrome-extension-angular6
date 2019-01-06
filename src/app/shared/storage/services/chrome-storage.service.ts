import {Injectable} from '@angular/core';

import {from, Subject} from 'rxjs';
import {StorageService} from './storage-service';

@Injectable()
export class ChromeStorageService implements StorageService {

  private records: Map<string, Subject<any>> = new Map();

  constructor() {
      // chrome.storage.onChanged.addListener((data, type: string) => {
      //     if (type === 'sync') {
      //         for (const key in data) {
      //             if (this.records.has(key)) {
      //                 this.records.get(key).next(data[key].newValue);
      //             }
      //         }
      //     }
      // });
  }

  get(key: string) {
      const bs = new Subject();
      this.records.set(key, bs);
      const promise = new Promise(resolve => {
          chrome.storage.sync.get(key, data => {
              resolve(data);
          });
      });
      promise.then(data => {
          bs.next(data[key] || null);
      });
      return bs.asObservable();
  }

  set(key: string, data: any) {
      return from(new Promise((resolve, reject) => {
          if (!chrome || !chrome.storage) {
              reject('Chrome Storage is not defined');
          } else {
              chrome.storage.sync.set({ [key]: data}, () => {
                  resolve();
              });
          }
      }));
  }

  remove(key: string) {
      return from(new Promise((resolve, reject) => {
          if (!chrome || !chrome.storage) {
              reject('Chrome Storage is not defined');
          } else {
              chrome.storage.sync.remove(key, () => {
                  resolve();
              });
          }
      }));
  }
}

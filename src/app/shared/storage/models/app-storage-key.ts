export class AppStorageKey<T> {
    private _key: string;

    constructor(key: string) {
        this._key = key;
    }

    public get keyName(): string {
        return this._key;
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class BackgroundImage {
    public url: string;
    public title: string;
    public owner: string;
}

@Injectable()
export class FlickrImagesService {

    private imagesSourceUrl = 'https://nickalekhine.herokuapp.com/content/interesting_photographs/';

    constructor(private http: HttpClient) { }

    public getRandomImage(): Promise<BackgroundImage> {
        // this.http.get(this.imagesSourceUrl).toPromise().then((data: any) => {
        //     const photos = data.photos.photo;
        //     const randomIndex = Math.floor(Math.random() * photos.length - 1) + 0;
        //     const randomPhoto = photos[randomIndex];

        //     let bgImage = `https://farm${randomPhoto.farm}.staticflickr.com/
        //         ${randomPhoto.server}/${randomPhoto.id}_${randomPhoto.secret}_z.jpg`;
        // });
        return new Promise(resolve => {
            const bg = new BackgroundImage();
            bg.url = 'assets/images/bg.jpg';
            resolve(bg);
        });
    }
}

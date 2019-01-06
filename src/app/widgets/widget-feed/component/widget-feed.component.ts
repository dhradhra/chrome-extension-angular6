import { Component, OnInit } from '@angular/core';
import {WidgetBaseIconComponent} from '../../../shared/base-structures/widget-base-icon.component';
import { NewsfeedService } from '../../../services/newsfeed-service';
import { IArticleObject, IArticle } from '../../../model/articlemodel';
import { ISource, ISourceObject } from '../../../model/sourcemodel';

@Component({
  selector: 'app-widget-feed',
  templateUrl: './widget-feed.component.html',
  styleUrls: ['./widget-feed.component.scss']
})
export class WidgetFeedComponent extends WidgetBaseIconComponent implements OnInit {
  // @Output() sourceId = new EventEmitter<string>();


  public currentTime: number;

  // My replacements

  // @Output() sourceId = new EventEmitter<string>();
  public sourceId ;

  
  // Source properties
  sourceArray: Array<ISourceObject> = [];
  sourceObject: ISourceObject;
  sourceItem = '';
  
  // Articles Properties
    loading: boolean;
    articleArray: IArticleObject[] = [];
  
  constructor(private _newsFeed: NewsfeedService) {
    super();
   }


  ngOnInit(): void {
      // this.currentTime = Date.now();
      // setInterval(() => this.currentTime = Date.now(), 1000);

      this.getSource();
      this.source();
  }

// Code to show drop down of list of news source

  getSource() {
    this._newsFeed.getSources().subscribe((res: ISource) =>
    {
    console.log(res.sources);
      this.sourceArray = res.sources
    }
      );
  };

  source() {
    return this.sourceObject = {
      description: '',
      category: '',
      name: '',
      urlsToLogos: {}
    };
  };

  getSoucreDetail(item: any) {
    this.sourceObject.description = item.description;
    this.sourceObject.urlsToLogos.small = item.urlsToLogos.small;
    this.sourceObject.name = item.name;
    this.sourceObject.url = item.url;
    this.getSourceId(item.id);
  };


  // Code to show articles in widget Articles 
  getSourceId(sourceId) {
    this.getArticle(sourceId);
    this.loading = true;
    this.articleArray = [];
  };

  getArticle(id: string) {
    this._newsFeed.getArticles(id).subscribe(
      (res: IArticle) => {
        console.log(res)
        this.loading = false;
        this.articleArray = res.articles;
      });
  }
}

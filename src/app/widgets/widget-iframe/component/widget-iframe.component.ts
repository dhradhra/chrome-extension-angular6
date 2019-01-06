import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {WidgetIframeSettings} from '../widget-iframe-settings';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {WidgetBaseIconComponent} from '../../../shared/base-structures/widget-base-icon.component';

@Component({
    selector: 'app-widget-iframe',
    templateUrl: './widget-iframe.component.html',
    styleUrls: ['./widget-iframe.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetIframeComponent extends WidgetBaseIconComponent implements OnInit {

    @Input() settings: WidgetIframeSettings;

    url: SafeResourceUrl;

    constructor(
        private sanitizer: DomSanitizer,
    ) {
        super();
    }

    ngOnInit() {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.settings.url);
    }

}

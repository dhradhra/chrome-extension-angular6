import {Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {WidgetType} from '../../../shared/base-structures/widget-type';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-widget-full',
    template: '<ng-content></ng-content>',
})
export class WidgetFullComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}

@Component({
    selector: 'app-widget-icon',
    template: '<div class="app-widget-icon-wrapper"><ng-content></ng-content></div>',
    styles: [
        `.app-widget-icon-wrapper, .app-widget-icon-wrapper > * {
            width: 100%;
            height: 100%;
        }`,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class WidgetIconComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}

@Component({
    selector: 'app-widget-settings',
    template: '<ng-content></ng-content>',
})
export class WidgetSettingsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}

@Component({
    selector: 'app-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class WidgetComponent implements OnInit {

    @Input() frozen = false;
    @Input() hide: Observable<any>;
    @Input() opened: () => any;
    @Input() type: WidgetType;

    @ViewChild('full') fullTpl: TemplateRef<any>;
    private matDialogRef: MatDialogRef<any, any>;
    protected _ignoreHideMenu = false;

    constructor(
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        if (this.type === WidgetType.icon && !this.frozen) {
            if (this.hide) {
                // TODO check if it's necessary to remove subscriber on destroy
                this.hide.subscribe(() => {
                    if (this._ignoreHideMenu) {
                        this._ignoreHideMenu = false;
                        return;
                    } else {
                        if (this.matDialogRef) {
                            this.matDialogRef.close();
                            this.matDialogRef = null;
                        }
                    }
                });
            }
        }
    }

    public iconClick(): void {
        if (!this.frozen) {
            if (!this.matDialogRef) {
                this.opened();
                this.matDialogRef = this.dialog.open(this.fullTpl, {
                    hasBackdrop: false,
                    panelClass: 'app-widget-modal-overlay',
                    data: {
                        widgets: []
                    },
                    position: {
                        left: '70px',
                        top: '70px',
                    }
                });
            } else {
                this.matDialogRef.close();
                this.matDialogRef = null;
            }
        }
    }

}

import { Component, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

import {UserService} from '../../shared/user/user.service';

@Component({
    selector: 'app-startup',
    templateUrl: 'startup.component.html',
    styleUrls: ['startup.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StartupComponent {
    @Output() usernameChange = new EventEmitter<void>();
    public username: string;

    constructor(private userService: UserService) { }

    public saveUsername(): void {
        this.userService.set(this.username).then(() => this.usernameChange.emit());
    }
}

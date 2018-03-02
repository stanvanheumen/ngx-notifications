import {trigger, animate, style, transition, query, stagger, keyframes} from '@angular/animations';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {Notification} from '../notifications.interface';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'ngx-notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss'],
    animations: [trigger('listAnimation', [
        transition('* => *', [
            query(':enter', style({opacity: 0}), {optional: true}),
            query(':enter', stagger('500ms', [
                animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
                    style({opacity: 0, transform: 'translateX(50%)', offset: 0}),
                    style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
                ]))
            ]), {optional: true}),
            query(':leave', stagger('500ms', [
                animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
                    style({height: '*', opacity: 1, transform: 'translateX(0)', offset: 0}),
                    style({height: '*', opacity: 0, transform: 'translateX(-25%)', offset: 0.9}),
                    style({height: 0, opacity: 0, transform: 'translateX(-25%)', offset: 1.0})
                ]))
            ]), {optional: true})
        ])
    ])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxNotificationsListComponent implements OnInit {

    notifications$: Observable<Notification[]>;

    trackById = (index: number, item: Notification) => {
        return item.id;
    };

    constructor(private notifications: NotificationsService) {
    }

    ngOnInit() {
        this.notifications$ = this.notifications.items;
    }

    onNotificationDestroy(notification: Notification) {
        this.notifications.delete(notification);
    }

}

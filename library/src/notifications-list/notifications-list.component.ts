import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {NotificationsService} from '../notifications.service';
import {Notification} from '../notifications.interface';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'ngx-notifications-list',
    templateUrl: './notifications-list.component.html',
    styleUrls: ['./notifications-list.component.scss'],
    animations: [
        trigger('notificationListAnimation', [
            transition('* => *', [
                query(':enter', style({opacity: 0}), {optional: true}),

                query(':enter', stagger('500ms', [
                    animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
                        style({height: 0, opacity: 0, transform: 'translateX({{fromX}})', offset: 0}),
                        style({height: '*', opacity: 0, transform: 'translateX({{fromX}})', offset: 0.75}),
                        style({height: '*', opacity: 1, transform: 'translateX({{toX}})', offset: 1.0})
                    ]))
                ]), {optional: true}),

                query(':leave', stagger('500ms', [
                    animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
                        style({height: '*', opacity: 1, transform: 'translateX({{toX}})', offset: 0}),
                        style({height: '*', opacity: 0, transform: 'translateX({{fromX}})', offset: 0.9}),
                        style({height: 0, opacity: 0, transform: 'translateX({{fromX}})', offset: 1.0})
                    ]))
                ]), {optional: true})
            ], {params: {fromX: '50%', toX: '0'}})
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxNotificationsListComponent implements OnInit {

    @Input() align: string = null;
    @Input() maxWidth = '420px';
    @Input() iconClass = 'material-icons';

    notifications$: Observable<Notification[]>;

    trackById = (index: number, item: Notification) => {
        return item.id;
    };

    @HostBinding('style.justify-content')
    get xAlignment() {
        const align = this.alignment;
        const xDirection = align.x;
        if (xDirection !== 'left' && xDirection !== 'right') {
            throw new Error(`The [x] can only be 'left' || 'right'.`);
        }
        return xDirection === 'left' ? 'flex-start' : 'flex-end';
    }

    @HostBinding('style.align-items')
    get yAlignment() {
        const align = this.alignment;
        const yDirection = align.y;
        if (yDirection !== 'top' && yDirection !== 'bottom') {
            throw new Error(`The [y] can only be 'top' || 'bottom'.`);
        }
        return yDirection === 'top' ? 'flex-start' : 'flex-end';
    }

    get params() {
        return {
            fromX: this.alignment.x === 'left' ? '-50%' : '50%',
            toX: '0'
        };
    }

    get alignment() {
        if (!this.align) {
            return {x: 'right', y: 'top'};
        }

        const directions = this.align.split(' ');

        if (directions.length !== 2) {
            throw new Error('The align variables must have an [y x] format.');
        }

        return {
            x: directions[1].trim(),
            y: directions[0].trim()
        };
    }

    constructor(private sanitizer: DomSanitizer,
                private notifications: NotificationsService) {
    }

    ngOnInit() {
        this.notifications$ = this.notifications.items;
    }

    onNotificationDestroy(notification: Notification) {
        this.notifications.delete(notification);
    }

}

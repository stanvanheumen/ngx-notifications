import {Notification, NotificationOptions, NotificationType} from './notifications.interface';
import {Translation} from '@stanvanheumen/ngx-translations';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable, Optional} from '@angular/core';

@Injectable()
export class NotificationsService {

    private readonly defaultTitles = {
        [NotificationType.Success]: 'Action was successful',
        [NotificationType.Error]: 'Action did fail',
        [NotificationType.Warning]: 'Warning',
        [NotificationType.Info]: 'Information'
    };

    private readonly defaultIcons = {
        [NotificationType.Success]: 'check_circle',
        [NotificationType.Error]: 'error_outline',
        [NotificationType.Warning]: 'error_outline',
        [NotificationType.Info]: 'info_outline'
    };

    private readonly defaultTimeout: number = 4000;
    private readonly defaultClosable: boolean = true;

    private list$ = new BehaviorSubject<Notification[]>([]);

    constructor(@Optional() private options: NotificationOptions) {
        if (!options) {
            throw new Error('No NotificationOptions were received.');
        }
        this.defaultTimeout = options.timeout === undefined ? this.defaultTimeout : options.timeout;
        this.defaultClosable = options.closable === undefined ? this.defaultClosable : options.closable;
        this.defaultTitles = Object.assign(this.defaultTitles, options.titles || {});
        this.defaultIcons = Object.assign(this.defaultIcons, options.icons || {});
    }

    get items() {
        return this.list$;
    }

    success(text: string | Translation, timeout = this.defaultTimeout) {
        this.create({text, timeout, type: NotificationType.Success});
    }

    error(text: string | Translation, timeout = this.defaultTimeout) {
        this.create({text, timeout, type: NotificationType.Error});
    }

    warn(text: string | Translation, timeout = this.defaultTimeout) {
        this.create({text, timeout, type: NotificationType.Warning});
    }

    info(text: string | Translation, timeout = this.defaultTimeout) {
        this.create({text, timeout, type: NotificationType.Info});
    }

    create(notification: Notification) {
        // Compose a new notification item.
        const item = this.compose(notification);

        // Add the notification to the list.
        this.push(item);
    }

    transform(callback: (notifications: Notification[]) => Notification[]) {
        const oldNotifications = this.list$.getValue();
        const newNotifications = callback(oldNotifications);
        this.list$.next(newNotifications);
    }

    delete(notification: Notification) {
        return this.pull(notification);
    }

    private push(notification: Notification) {
        // Get the current list.
        const list = this.list$.getValue();

        // Add the notification to the list.
        list.push(notification);

        // Push a new list.
        this.list$.next(list);
    }

    private pull(notification: Notification) {
        // Get the current list.
        const list = this.list$.getValue();

        // Remove the notifications with matching id's.
        list.forEach((item, index) => {
            if (item.id === notification.id) {
                list.splice(index, 1);
            }
        });

        // Push a new list.
        this.list$.next(list);
    }

    private compose(notification: Notification) {
        // Attach a random id to the notification.
        notification.id = Math.random().toString(36).substr(2, 10);

        // Set the default to true if none is set.
        notification.closable = notification.closable !== undefined ? notification.closable : this.defaultClosable;

        // Set a default title if none is set.
        notification.title = notification.title || this.defaultTitles[notification.type];

        // Set a default icon if none is set.
        notification.icon = notification.icon || this.defaultIcons[notification.type];

        // Set a default timeout if none is set.
        notification.timeout = notification.timeout !== undefined ? notification.timeout : this.defaultTimeout;

        // Return the composed notification.
        return notification;
    }

}

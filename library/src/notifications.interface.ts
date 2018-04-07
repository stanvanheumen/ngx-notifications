import {Translation} from '@stanvanheumen/ngx-translations';

export interface Notification {

    /**
     * The identifier of the notification.
     */
    id?: string;

    /**
     * An optional title for the notification (if not set, a default will be picked).
     */
    title?: string | Translation;

    /**
     * The text for the notification.
     */
    text: string | Translation;

    /**
     * The type of the notification.
     */
    type: NotificationType;

    /**
     * An optional amount of milliseconds before the notification should disappear (if not set, a default will be picked).
     */
    timeout?: number;

    /**
     * If the notification should be closable; Default is true.
     */
    closable?: boolean;

    /**
     * An optional icon for the notification (if not set, a default will be picked).
     */
    icon?: string;

}

export const enum NotificationType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}

export class NotificationOptions {
    timeout?: number;

    closable?: boolean;

    titles?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };

    icons?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
}

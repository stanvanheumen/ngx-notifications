import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxTranslationsModule} from '@stanvanheumen/ngx-translations';

import {NgxNotificationsListComponent} from './notifications-list/notifications-list.component';
import {NgxNotificationsItemComponent} from './notifications-item/notifications-item.component';

import {NotificationsService} from './notifications.service';
import {NotificationOptions} from './notifications.interface';

@NgModule({
    imports: [CommonModule, NgxTranslationsModule],
    declarations: [NgxNotificationsListComponent, NgxNotificationsItemComponent],
    exports: [NgxNotificationsListComponent]
})
export class NgxNotificationsModule {

    static forRoot(options: NotificationOptions = {}) {
        return {
            ngModule: NgxNotificationsModule,
            providers: [
                NotificationsService,
                {provide: NotificationOptions, useValue: options}
            ]
        };
    }

}

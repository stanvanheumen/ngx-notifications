import {Translation, TranslationsService} from '@stanvanheumen/ngx-translations';
import {NotificationsService} from '../../library/src/notifications.service';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class AppComponent implements OnInit {

    languages: Translation[];
    currentLanguage: string;

    constructor(private translate: TranslationsService,
                private notifications: NotificationsService) {
    }

    ngOnInit() {
        this.currentLanguage = this.translate.getLanguage();
        this.languages = this.translate.getDictionary();
    }

    onLanguageChange(value) {
        this.translate.use(value);
    }

    createSuccess() {
        this.notifications.success({token: 'My ${type} message.', data: {type: 'Cool'}});
    }

    createError() {
        this.notifications.error('My awesome message.');
    }

    createWarning() {
        this.notifications.warn('My awesome message.');
    }

    createInfo() {
        this.notifications.info('My awesome message.');
    }

}

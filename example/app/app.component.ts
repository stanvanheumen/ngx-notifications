import {Translation, TranslationsService} from '@stanvanheumen/ngx-translations';
import {NotificationsService} from '../../library/src/notifications.service';
import {NotificationType} from '../../library/src/notifications.interface';
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
    currentAlignment = 'top right';

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
        // Creates a success message as a non-closable notification.
        this.notifications.create({
            text: {token: 'My ${type} message.', data: {type: 'Cool'}},
            type: NotificationType.Success,
            closable: false,

        });
    }

    createError() {
        this.notifications.error(`
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci aut blanditiis commodi 
            consequuntur doloremque doloribus ex exercitationem fuga fugiat illo iste laborum, magnam nesciunt 
            praesentium sit totam veritatis voluptatem!
        `);
    }

    createWarning() {
        this.notifications.warn('My awesome message.');
    }

    createInfo() {
        this.notifications.info('My awesome message.');
    }

}

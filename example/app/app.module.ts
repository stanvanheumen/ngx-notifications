import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxTranslationsModule} from '@stanvanheumen/ngx-translations';
import {NgxNotificationsModule} from '../../library/src/notifications.module';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        NgxNotificationsModule.forRoot(),
        NgxTranslationsModule.forRoot({
            production: false,
            dictionary: [
                {
                    languages: ['nl-NL', 'nl'],
                    name: 'Dutch (Dutch)',
                    data: {
                        'Dutch (Dutch)': 'Nederlands (Nederlands)',
                        'English (English)': 'Engels (Engels)',
                        'Action did fail': 'Actie is mislukt',
                        'Action was successful': 'Actie was succesvol',
                        'Warning': 'Waarschuwing',
                        'Information': 'Informatie',
                        'My awesome message.': 'Mijn geweldige bericht',
                        'My ${type} message.': 'Mijn ${type|keep,uppercase} bericht.'
                    }
                }
            ]
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

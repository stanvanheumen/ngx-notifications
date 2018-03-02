# `ngx-notifications`
A simple library that allows you to notify your users in your Angular 5+ app.

- Use <kbd>command</kbd> + <kbd>F</kbd> or <kbd>ctrl</kbd> + <kbd>F</kbd> to search for a keyword.
- Contributions welcome, please see [contribution guide](.github/CONTRIBUTING.md).

## Features

- :camel: **Easy implementation**
- :mouse: **Lazy loading compatible**
- :sheep: **Angular Universal compatible**
- :bird: **Ahead-Of-Time compilation compatible**
- :monkey: **Automatic support for multiple languages**

## Demo

[Click here to play with the example](https://stackblitz.com/github/stanvanheumen/ngx-notifications)

## Installation

To use ngx-notifications in your project install it via `npm` or `yarn`:

```bash
# To get the latest stable version in dependencies

$ npm install @stanvanheumen/ngx-notifications --save

# or

$ yarn add @stanvanheumen/ngx-notifications
```

## Setup

To get the correct fonts and icons you should add these two link-tags to the `head` section of your `index.html` (these are not included for performance).

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
```

Import the `NgxNotificationsModule` in your AppModule and call the `forRoot()` method to receive a singleton of the `NotificationsService`.

```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxNotificationsModule} from '@stanvanheumen/ngx-notifications';
import {NgxTranslationsModule} from '@stanvanheumen/ngx-translations';

@NgModule({
    imports: [
        BrowserAnimationsModule, // or NoopAnimationsModule.
        NgxNotificationsModule.forRoot(),
        NgxTranslationsModule.forRoot(...) // Optional.
    ]
})
export class AppModule {}
```

## Example

Add the `<ngx-notifications-list></ngx-notifications-list>` to your `AppComponent`. This will be the place where the 
notifications will be shown.

```typescript
import {NotificationsService} from '@stanvanheumen/ngx-notifications';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <ngx-notifications-list></ngx-notifications-list>
    `
})
export class AppComponent implements OnInit {

    constructor(private notifications: NotificationsService) {
    }
    
    ngOnInit() {
        this.notifications.success('Something went really good!');
        this.notifications.error('Something went really bad!');
        this.notifications.warn('I want to warn you about something!');
        this.notifications.info('Just some relevant information.');
    }

}
```

## Options

### Notification

| Property          | Type                           | Required          | Description                                                                      |
| ----------------- | ------------------------------ | ----------------- | -------------------------------------------------------------------------------- |
| title             | string                         | false             | The title of the notification. (it's default is based on the type)               |
| text              | string                         | true              | The text of the notification.                                                    |
| type              | NotificationType               | true              | The type of the notification.                                                    |
| timeout           | number                         | false             | The time (in ms) that the notification will stay on the screen (default 4000ms). |
| icon              | string                         | false             | The icon of the notification. (it's default is based on the type)                |

### Notification types

| Enum              |
| ----------------- |
| Success           |
| Error             |
| Warning           |
| Info              |
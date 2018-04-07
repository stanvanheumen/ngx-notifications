import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, NgZone, OnDestroy, OnInit,
    Output
} from '@angular/core';
import {Notification, NotificationType} from '../notifications.interface';

@Component({
    selector: 'ngx-notifications-item',
    templateUrl: './notifications-item.component.html',
    styleUrls: ['./notifications-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})
export class NgxNotificationsItemComponent implements OnInit, OnDestroy {

    // Input.
    @Input() notification: Notification;
    @Input() iconClass = 'material-icons';

    // Output.
    @Output() onDestroy = new EventEmitter<Notification>();

    // Data.
    private progress = 0;
    private count = 0;

    // Helper variables.
    private steps: number;
    private speed: number;
    private timer: number;
    private startTime: number;
    private difference: number;

    @HostBinding('class') get getClass() {
        return <NotificationType>this.notification.type;
    }

    constructor(private zone: NgZone,
                private changeDetection: ChangeDetectorRef) {
    }

    get progressWidth() {
        return Math.min(this.progress, 100) + '%';
    }

    ngOnInit() {
        // Check if the notification timeout is not 0 and the platform is a browser.
        if (this.notification.timeout <= 0 || setTimeout === undefined) {
            this.notification.closable = true;
            return;
        }

        // Start the timeout.
        this.startTimeout();
    }

    ngOnDestroy() {
        // Check if clearTimeout exists.
        if (this.notification.timeout <= 0 || clearTimeout === undefined) {
            return;
        }

        // Clear the timeout.
        clearTimeout(this.timer);
    }

    private startTimeout() {
        // Calculate the steps of the timeout.
        this.steps = this.notification.timeout / 10;

        // Calculate the speed of the timeout.
        this.speed = this.notification.timeout / this.steps;

        // Get the start time.
        this.startTime = new Date().getTime();

        // Set a new timer outside of Angular.
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
    }

    private instance = () => {
        // Calculate the difference.
        this.difference = (new Date().getTime() - this.startTime) - (this.count * this.speed);

        // Add up the count.
        if (this.count++ === this.steps) {
            this.onDestroy.emit(this.notification);
        }

        // Add the steps to the progress.
        this.progress += 100 / this.steps;

        // Set a new timer.
        this.timer = setTimeout(this.instance, (this.speed - this.difference));

        // Run a new change detection cycle.
        this.zone.run(() => this.changeDetection.detectChanges());
    };

}

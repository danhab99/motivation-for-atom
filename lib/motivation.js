'use babel';

// import MotivationView from './motivation-view';
import {CompositeDisposable} from 'atom';

export default {

    config: {
        messages: {
            title: 'Messages',
            type: 'array',
            default: [
                'Brilliant! Just brilliant!', 'You can do this!', 'I belive in you!'
            ],
            items: {
                type: 'string'
            }
        },
        delay: {
            title: 'Normal Delay (in minutes)',
            type: 'integer',
            default: 10,
            minimum: 1
        },
        deviation: {
            title: 'Random offset (± in minutes)',
            type: 'integer',
            default: 3,
            minimum: 1
        },
        duration: {
            title: 'Notification duration (in seconds)',
            type: 'integer',
            minimum: 0,
            default: 30
        },
        notification_type: {
            title: 'Notification type',
            type: 'string',
            default: 'info',
            enum: ['success', 'info', 'warning', 'error', 'fatal error']
        }
    },

    interval: -1,

    options: {
        message: [],
        delay: 0,
        deviation: 0,
        type: "",
        duration: 0
    },

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        console.log("Motivation activated");

        atom.config.observe('motivation.messages', (newVal) => {
            this.options.message = newVal;
            console.log("updated messages", this.options.message);
        });
        atom.config.observe('motivation.delay', (newVal) => {
            this.options.delay = newVal * 60000;
            console.log("updated delay", this.options.delay);
        }); // * 60000;
        atom.config.observe('motivation.deviation', (newVal) => {
            this.options.deviation = newVal * 60000;
            console.log("updated deviation", this.options.deviation);
        }); // * 60000;
        atom.config.observe('motivation.notification_type', (newVal) => {
            this.options.type = newVal;
            console.log("updated notification_type", this.options.type);
        });;
        atom.config.observe('motivation.duration', (newVal) => {
            this.options.duration = newVal * 1000;
            console.log("updated duration", this.options.duration);
        }); // * 1000;

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'motivation:toggle': () => this.toggle(),
            'motivation:give': () => this.give()
        }));

        console.log("motivation", state);

        if (state.enabled) {
            this.toggle();
        }
    },

    deactivate() {
        clearInterval(this.interval);
    },

    serialize() {
        return {
            'enabled': this.interval > 0
        }
    },

    give() {
        const m = this.options.message[Math.floor(Math.random() * this.options.message.length)],
            n = {
                dismissable: true
            };

        console.log("Adding notification", m);

        switch (this.options.type) {
            case 'success':
                atom.notifications.addSuccess(m, n);
                break;
            case 'info':
                atom.notifications.addInfo(m, n);
                break;
            case 'warning':
                atom.notifications.addWarning(m, n);
                break;
            case 'error':
                atom.notifications.addWarning(m, n);
                break;
            case 'fatal error':
                atom.notifications.addFatalError(m, n);
                break;
        }

        setTimeout(() => {
            console.log('Clearing');
            atom.notifications.getNotifications().map(x => x.dismiss());
        }, this.options.duration);
    },

    toggle() {
        console.log('Motivation was toggled!');

        if (this.interval > 0) {
            clearTimeout(this.interval);
            console.log("Disable");
            return;
        }

        const loop = () => {
            var ttnext = Math.floor(Math.random() * (this.options.delay + this.options.deviation)) + (this.options.delay - this.options.deviation);
            console.log('Next one in ' + ttnext, this.interval);
            this.interval = setTimeout(loop, ttnext);

            this.give();
        };
        loop();
    }

};

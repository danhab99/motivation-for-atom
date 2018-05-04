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

    interval: undefined,

    options: {},

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        console.log("Motivation activated");

        atom.config.observe('motivation.messages', function (newVal) {
            this.options.message = newVal;
        });
        atom.config.observe('motivation.delay', function (newVal) {
            this.options.delay = newVal * 60000;
        });// * 60000;
        atom.config.observe('motivation.deviation', function (newVal) {
            this.options.deviation = newVal * 60000;
        });// * 60000;
        atom.config.observe('motivation.notification_type', function (newVal) {
            this.options.type = newVal;
        });;
        atom.config.observe('motivation.duration', function (newVal) {
            this.options.duration = newVal * 1000;
        });// * 1000;

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'motivation:toggle': () => this.toggle()
        }));
    },

    deactivate() {},

    serialize() {},

    toggle() {
        console.log('Motivation was toggled!');

        if (this.interval !== undefined) {
            clearInterval(this.interval);
            return;
        }

        const loop = function() {
            const m = this.options.messages[Math.floor(Math.random() * this.options.messages.length)],
                n = {
                    dismissable: true
                };

            switch (type) {
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

            setTimeout(function() {
                atom.notifications.clear();
            }, this.options.duration);

            this.interval = setInterval(loop, Math.floor(Math.random() * (this.options.delay + this.options.deviation)) + (this.options.delay - this.options.deviation));
        };
        loop();
    }

};

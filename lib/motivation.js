'use babel';

// import MotivationView from './motivation-view';
import {CompositeDisposable} from 'atom';

export default {

    config: {
        messages: {
            title: 'Messages',
            type: 'array',
            default: ['Brilliant! Just brilliant!', 'You can do this!', 'I belive in you!'],
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
        notification_type: {
            title: 'Notification type',
            type: 'string',
            default: 'info',
            enum: ['success', 'info', 'warning', 'error', 'fatal error']
        }
    },

    activate(state) {
        this.subscriptions = new CompositeDisposable();
        console.log("Motivation activated");

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

        const messages = atom.config.get('motivation.Messages');
        const stdDelay = atom.config.get('motivation.delay');
        const stdError = atom.config.get('motivation.deviation');
        const type = atom.config.get('motivation.notification_type');

        const loop = function() {
            const m = messages[Math.floor(Math.random() * messages.length)],
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
            this.interval = setInterval(loop, Math.floor(Math.random() * (stdDelay + stdError)) + (stdDelay - stdError));
        };
        loop();
    }

};

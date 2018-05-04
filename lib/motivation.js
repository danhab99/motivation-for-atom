'use babel';

// import MotivationView from './motivation-view';
import {CompositeDisposable} from 'atom';

export default {

    config = {
        Messages: {
            type: 'array',
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
    }

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'motivation:toggle': () => this.toggle()
        }));
    },

    deactivate() {},

    serialize() {},

    toggle() {
        console.log('Motivation was toggled!');

    }

};

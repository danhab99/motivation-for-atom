'use babel';

import MotivationView from './motivation-view';
import {CompositeDisposable} from 'atom';

export default {

    activate(state) {
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'motivation:toggle': () => this.toggle()
        }));
    },

    deactivate() {

    },

    serialize() {

    },

    toggle() {
        console.log('Motivation was toggled!');
    }

};

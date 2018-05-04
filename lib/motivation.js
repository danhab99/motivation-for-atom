'use babel';

// import MotivationView from './motivation-view';
import {CompositeDisposable} from 'atom';
const ConfigSchema = require("./configuration.js");

export default {

    config: ConfigSchema.config,

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

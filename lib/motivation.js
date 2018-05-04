'use babel';

import MotivationView from './motivation-view';
import { CompositeDisposable } from 'atom';

export default {

  motivationView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.motivationView = new MotivationView(state.motivationViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.motivationView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'motivation:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.motivationView.destroy();
  },

  serialize() {
    return {
      motivationViewState: this.motivationView.serialize()
    };
  },

  toggle() {
    console.log('Motivation was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

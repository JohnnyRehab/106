// Entry point for panels migrated to the new dependency-free
// architecture. Waits for the existing RequireJS/Backbone app to finish
// its own startup (see the 'juno106:ready' dispatch in js/main.js),
// then wraps its Backbone model in a Store and renders each migrated
// panel into the same region element the old Marionette-based system
// used to occupy.
//
// As more panels move to js/es/*, add them here. Once every panel is
// migrated, this file (plus store.js and js/es/*) replaces main.js,
// and RequireJS/Backbone/Marionette/jQuery/Handlebars can be removed.
import { createStore } from './store.js';
import { createHpfView } from './es/hpf.js';

window.addEventListener('juno106:ready', function(e) {
    var store = createStore(e.detail.synth);

    var hpfContainer = document.querySelector('.js-hpf-region');
    if(hpfContainer) {
        createHpfView(hpfContainer, store);
    }
}, { once: true });

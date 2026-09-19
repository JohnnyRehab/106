define([
    'backbone',
    'hbs!tmpl/item/headerItemView-tmpl'
    ],
    
    function(Backbone, Template) {
        return Marionette.ItemView.extend({
            
            className: 'header',
            
            template: Template,
            
            ui: {
                init: '.js-init',
                share: '.js-share-patch',
                name: '.js-patch-name',
                editIcon: '.js-edit-icon',
                nameInput: '.js-edit-patch-name',
                exportSeq: '.js-export-sequence',
                importSeq: '.js-import-sequence',
                importFile: '.js-import-sequence-file'
            },
            
            events: {
                'click @ui.init': 'triggerReset',
                'click @ui.share': 'triggerSharePatch',
                'click @ui.name': 'handleEditName',
                'click @ui.editIcon': 'handleEditName',
                'blur @ui.nameInput': 'handleEditComplete',
                'keyup @ui.nameInput': 'handleKeyup',
                'click @ui.exportSeq': 'triggerExportSequence',
                'click @ui.importSeq': 'triggerImportSequenceClick',
                'change @ui.importFile': 'triggerImportSequence'
            },
            
            initialize: function() {
                this.patchName = 'PATCH NAME';
                Backbone.Wreqr.radio.channel('global').reqres.setHandler('patchName', function() {
                    return this.patchName;
                }.bind(this));
            },
            
            serializeData: function() {
                return {
                    patchName: this.patchName
                };
            },
            
            triggerReset: function() {
                this.trigger('reset');
            },
            
            triggerSharePatch: function() {
                this.trigger('share');
            },
            
            // Step sequencer: EXPORT downloads the current sequence as a
            // JSON file. The view has no knowledge of sequencer internals;
            // it just relays the user's action.
            triggerExportSequence: function() {
                this.trigger('export');
            },
            
            // IMPORT is a two-step interaction: clicking the visible link
            // opens the hidden native file picker, and choosing a file
            // fires the actual 'import' event with the selected File.
            triggerImportSequenceClick: function() {
                this.ui.importFile.val('');
                this.ui.importFile.click();
            },
            
            triggerImportSequence: function(e) {
                var file = e.target.files[0];
                
                if(file) {
                    this.trigger('import', file);
                }
            },
            
            handleEditName: function() {
                this.ui.name.hide();
                this.ui.nameInput.show();
                this.ui.nameInput.val(this.patchName);
                this.ui.nameInput.focus();
                this.ui.nameInput.select();
            },

            handleKeyup: function(e) {
                if(e.which === 13) {
                    this.handleEditComplete();
                }
            },
            
            handleEditComplete: function() {
                this.patchName = this.ui.nameInput.val();
                this.ui.nameInput.hide();
                this.render();
            },
            
            resetName: function() {
                this.patchName = 'PATCH NAME';
                this.render();
            },
            
            setName: function(name) {
                this.patchName = name;
                this.render();
            }
        });
    });
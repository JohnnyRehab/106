define([
    'backbone',
    'hbs!tmpl/item/rngItemView-tmpl',
    'views/item/moduleBaseItemView'
    ],

    function(Backbone, Template, ModuleBaseItemView) {
        return ModuleBaseItemView.extend({

            className: 'rng control',

            template: Template,

            onShow: function() {
                this.styleParent('three');
                this.bindFaders();
                this.bindSwitches();
                this.setupSwitchPositions();
            }

        });
    });

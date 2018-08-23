/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('EcommerceTest.Application', {
    extend: 'Ext.app.Application',  
    name: 'EcommerceTest',
    requires : [
                'EcommerceTest.view.main.Main'
    ],
    stores: [
        // TODO: add global / shared stores here
    ],
    autoScroll: true,
    launch: function () {
    	 var me = this;
    	 var obj = null;
    }
});

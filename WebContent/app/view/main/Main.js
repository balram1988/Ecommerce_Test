/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EcommerceTest.view.main.Main', {
	extend : 'Ext.container.Viewport',
	requires : [ 'EcommerceTest.view.main.MainController',
			'EcommerceTest.view.main.MainModel',
			'EcommerceTest.view.main.product.ViewProduct',
			'EcommerceTest.view.main.product.Tiles' ],
	initComponent : function() {
		Ext.apply(this, {
			items : this.buildItems()
		});
		this.callParent(arguments);
	},
	xtype : 'app-main',
	controller : 'main',
	viewModel : {
		type : 'main'
	},
	xtype : 'app-main',
	style : {
		'background-color' : 'white'
	},
	controller : 'main',
	viewModel : {
		type : 'main'
	},
	layout : {
		type : 'border'
	},
	buildItems : function() {
		obj = null;
		var me = this;
		Ext.Ajax.request({
			url : '/EcommerceTest/rest/utitlityservice/getproducts',
			method : 'GET',
			async : false,
			success : function(response, opts) {
				obj = Ext.decode(response.responseText);
			},

			failure : function(response, opts) {
				console.log('server-side failure with status code '
						+ response.status);
			}
		});
		return [ {
			xtype : 'container',
			region : 'north',
			items : [{
				xtype : 'component',
				tpl : new Ext.XTemplate(
						'<div style="cursor:pointer;font-size: 18px;font-variant-caps: small-caps;font-style: oblique;font-variant: petite-caps;font-size :20px;color:#339D15" event="home">{appName}</div>',
						'<div style="text-align:right;color:#3399cc;cursor:pointer;">Cart<font style="color: #af1a31;font-weight:bold">(<font id="cart-id">0</font>)</font> &nbsp| &nbsp{loggedInUser}</div>'
						),
				data : {
					appName : 'EcommerceTest',
					loggedInUser : 'Hi John'
					},
					listeners : {
						afterrender : function(cmp){
							cmp.getEl().on('click',function(e){
						        el    = Ext.get(e.getTarget()),
						        event = el.getAttribute('event');
						        if(event == "home"){
						        	me.onClickHome();
						        }
							});
						} 
					}
			}],
			cls :'heading-wrapper',
			height : 50
		},{
			xtype : 'container',
			region : 'center',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			scrollable :true,
			activeItem : 0,
			height : 500,
			padding : '0px 90px 0px 130px',
			items : [{
				height : 30,
				xtype : 'component',
				itemId : 'categorytype',
				tpl : new Ext.XTemplate(
						'<div style="cursor:pointer;font-size: 18px;margin-top:15px;padding:0px 0px 0px 50px;text-align:left;color:#3399cc">Category/{category}</div>'
						),
				data : {
					category : obj.id
					}
			},{
				xtype : 'container',
				itemId : 'main-container',
				margin : '20px 0 0 0',
				layout : {
					type : 'card'
				},
				items : [ {
					xtype : 'tiles',
					hidden : false
				}, {
					xtype : 'viewproduct',
					hidden : false
				} ]
			}]
		},{
			xtype : 'component',
			tpl : new Ext.XTemplate(
					'<div style="font-size :15px;text-align:center;margin-top:5px">{copyright} | {contact} | {support} | {improve}</div>'
					),
			data : {
				support : 'Support',
				contact : 'Contact US',
				improve : 'Improve',
				copyright : 'Copyright@ EcommerceTest 2018'
			},	
			region : 'south',
			cls : 'footer-wrapper',
			height : 30
		},{
			xtype : 'container',
			region : 'east',
			width : 0
		},{
			xtype : 'container',
			region : 'west',
			width : 0
		} ];
	},
	onClickHome : function () {
		var me = this;
		me.down('#main-container').getLayout().setActiveItem(0);
		me.down('#categorytype').update({category:obj.id});
	}
});

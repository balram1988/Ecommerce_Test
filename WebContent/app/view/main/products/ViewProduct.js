Ext.define('EcommerceTest.view.main.product.ViewProduct', {
    extend: 'Ext.container.Container',
    xtype : 'viewproduct',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    padding:'0 50px',
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems()
        });
        this.callParent(arguments);
    },
    buildItems : function(){
    	var me = this;
    	 var store = Ext.create('Ext.data.Store', {
    	    fields : [{name: 'meta'},{name: 'alt'},{name: 'rel'},{name: 'width'},
     	             {name: 'href'},{name: 'height'}],
    	    data: []
    	});
    	return	[{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        flex :1,
        items: [{
            xtype: 'component',
            itemId: 'mainItemImage',
            tpl: new Ext.XTemplate('<div style="cursor:zoom-in;margin-top:2px;border : 1px solid;max-height:500px;max-width:500px;" class="img-zoom-container">',
                '<img src="{href}" height="500" width="500" id="myimage" />',
                '<div id="myresult" class="img-zoom-result"></div>',
                '</div>'
            ),
            data: {
                src: 'http://www.sencha.com/img/20110215-feat-drawing.png'
            },
            listeners : {
            	render : function (){
            		debugger;
            	    imageZoom("myimage", "myresult"); 
            	},
            	focusenter : function(){
            		debugger;
            	     imageZoom("myimage", "myresult"); 
            	}
            }
        },{
            xtype: 'dataview',
            store: store,
            itemId : 'thumbnails',
            margin : '10 0 0 0',
            tpl: new Ext.XTemplate(
            	    '<tpl for=".">',
            	    '<div style="cursor:pointer;margin:5px 5px;max-height:85px;max-width:85px" class="thumb-wrap inline-block">',
            	    '<img src="{href}" height="85px" width="85px" />',
            	    '</div>',
            	    '</tpl>'
            ),
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images available',
            margin: '10 0 0 0',
            listeners: {
                'itemclick': function (view, record, item, idx, event, opts) {
                    view.up('container').down('#mainItemImage').update(record.data);
                }
            }
        }]
    }, {
        name: 'container',
        margin: '0 0 0 50px',
        type : {
        	type : 'vbox',
        	align : 'stretch'
        },
        flex :1,
        items: [{
            xtype: 'displayfield',
            name : 'name',
            cls : 'product-name',
            value: ''
        }, {
            xtype: 'label',
            html: 'Sustainably Sourced',
            margin : '40px 0 0 0'
        },{
        	xtype : 'component',
        	itemId : 'viewProdPrice',
        	margin : '20px 0 0 0',
        	tpl: new Ext.XTemplate(
            	    '<div style="margin:5px 5px;" class="thumb-wrap inline-block">',
            	    '<span style="text-decoration: line-through;font-weight: 500;font-size: 18px;margin: 0 0 5px;">{regPrice}</span><span class="product-price" style="font-size :19px !important">&nbsp Special {specialPrice}</span>',
            	    '</div>'),
           data : {
        	   regPrice : 0,
        	   specialPrice :0
           } 	    
        },{
	        xtype: 'numberfield',
	        anchor: '100%',
	        fieldLabel :'QTY',
	        labelAlign : 'top',
	        labelSeparator : '',
	        name: 'selctedItem',
	        value: 1,
	        width :60,
	        maxValue: 99,
	        minValue: 0
	    },{
            xtype: 'label',
            html: '<div style="border-top : 2px solid #e5e5e5"></div>',
        },{
            xtype: 'label',
            html: '<div style="margin :15px 0 10px 0">DELIVERY INFORMATION</div>',
        },{
        	xtype : 'container',
        	layout : 'hbox',
        	items : [
        	  {
              	xtype : 'textfield',
              	name  : 'zipcode',
              	value : '',
      	        fieldLabel :'Enter Zip Code',
      	        labelAlign : 'left',
      	        labelSeparator : ''
        	  },{
                  xtype : 'button',
                  text : 'Check',
                  height : 25,
                  margin : '0 0 0 10px',
                  width: 80,
                  handler : me.onAddToCart,
        	  }       
        	]
        },
        {
            xtype : 'button',
            text : 'Add to Cart',
            height : 40,
            margin : '40px 0 0 0',
            handler : me.onAddToCart,
            width : '90%'
        },{
        	xtype : 'component',
        	html : '<div style="font-size:15px;margin:30px 0px 20px 0px;font-weight : bold;">Overview</div>',
        },{
        	xtype : 'component',
        	html : '<div class="content-block flex"><div class="row">'+
        +'<p>Our Portside Sofa gets its rustic look by wire brushing the'
        +'solid wood frame and adding a weathered finish. We included' 
        +'yarn-dyed cushions and a back ledge (perfect for holding drinks!)'
        +'to make it the ultimate outdoor lounging spot.</p>'
        +'<ul><li>75"w x 37.5"d x 30"h.</li>'
        +'<li>Your purchase of this FSC-certified product helps support forests'
        +'and ecosystems worldwide.'
        +'<a target="_blank" href="https://www.westelm.com/pages/about-west-elm/our-commitments/sustainable/">Learn more.</a></li>'
        +'<li>Solid wood with wire-brushed surface in a Weathered Gray finish.</li>'
        +'<li>Yarn-dyed weather-resistant cushions in Gray (included).</li>'
        +'<li>Includes base cushions + back cushions.</li>'
        +'<li>Back of frame has built-in ledge to hold drinks, etc.</li>'
        +'<li>Outdoor cover available (sold separately).</li>'
        +'<li>Frame made in Indonesia; cushions made in China.</li></ul></div></div>'
        }]
    }];
    },
    updateDetail : function(data){
    	var me = this;
    	if(data){
    	  me.down('#mainItemImage').update({href:data.hero.href});
    	  me.down('#viewProdPrice').update({regPrice : data.priceRange.regular.high,specialPrice :data.priceRange.selling.high} );
    	  me.down('#thumbnails').getStore().loadData(data.images.slice(0,5));
    	  me.down('displayfield[name=name]').setValue(data.name);
    	  
    	  setTimeout(function(){  me.up('#main-container').getEl().unmask(); }, 1000);
    	}
    },
    onAddToCart : function(cmp){
    	var me = this;
    	var getVal = cmp.up('container').down('numberfield').getValue();
    	var zipcode = me.up('viewproduct').down('textfield[name=zipcode]').getValue();
    	if(getVal==0){
    		Ext.Msg.alert('Alert','Select atleast one item');
    	} else if(Ext.isEmpty(zipcode)){
    		Ext.Msg.alert('Alert','Enter zip code and ceck that it is available for the given location');
    	}else{
    		var cmp = document.getElementById('cart-id');
    		if(cmp){
    			cmp.innerHTML=parseInt(cmp.innerHTML)+getVal;
    		}
    	}
    }
});
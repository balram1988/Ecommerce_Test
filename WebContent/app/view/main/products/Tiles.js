Ext.define('EcommerceTest.view.main.product.Tiles', {
    extend: 'Ext.container.Container',
    xtype : 'tiles',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        Ext.apply(this, {
            items: this.buildItems()
        });
        this.callParent(arguments);
    },
    buildItems : function(){
    	var me = this;
        var allGroups = obj.groups;
    	var store = Ext.create('Ext.data.Store', {
    		pageSize: 10,
    	    fields: [{
    	        name: 'id'
    	    }, {
    	        name: 'name'
    	    },{
    	    	name : "priceRange"
    	    },{
    	    	name : "thumbnail"
    	    },{
    	        name: 'link'
    	    },{
    	    	name : "hero"
    	    },{
    	    	name : "images"
    	    },{
    	        name: 'swatches'
    	    },{
    	    	name : "messages"
    	    },{
    	    	name : "reviews"
    	    },{
    	    	name : 'flags'
    	    }] ,
    	    data: obj.groups.slice(0,10)
    	});
        store.on({
            scope  : me,
            load   : me.onLoadTileStore
        });
        
      return [{
              xtype: 'dataview',
              store: store,
              tpl: new Ext.XTemplate(
            		  '{[this.setSpacing()]}',
            		    '<tpl for=".">',
            		    '<div style="{[this.getSpacing(xindex)]};cursor: pointer" class="product-tile-wrapper thumb-wrap inline-block">',
            		    '<img src="{thumbnail.href}" height="191px" width="300px" />',
            		    '<span class="quicklook-link" >Quicklook</span>',
            		    '<span style ="padding: 3px 3px" class="product-name">{[Ext.util.Format.ellipsis(values.name, 45)]}</span>',
            		    '<span class="product-price" style="padding-left: 5px;" >{[this.getOff(values.priceRange)]}</span>',
            		    '<span class="product-orig-price" style="margin-top: 5px;">Regular Price &nbsp<font style="text-decoration: line-through;"> {priceRange.regular.high}</font></span>',
            		    '<span class="product-price" style="padding-left: 5px;font-size:11px !important" >Special Price &nbsp{priceRange.selling.high}</span>',
            		   '</div>',
            		    '</tpl>',{
            			  getOff  : function(priceRange){
            				  if(priceRange){
            				   return "Special &nbsp" + Math.floor(((priceRange.regular.high-priceRange.selling.high)/priceRange.regular.high)*100) + "% off";
            				  }
            				  return "";
            			  },
            			  getSpacing : function(index){
                              var o = this.spacing,
                                  t = 'margin-right:' + o.rightMargin + 'px;';
                              if (o.columns === 1 || index % o.columns !== 0){
                                  if (o.leftMargin > 0){
                                      t += ' margin-left:' + o.leftMargin + 'px;';
                                  }
                                  return t;
                              }
                          },
                          setSpacing : function(){
                              var avlWidth   = me.up('app-main').getWidth(),
                                  tileWidth  = parseInt(Ext.util.CSS.getRule('.product-tile-wrapper').style.width.replace(/[^0-9]/g,'')),
                                  cols       = Math.floor((avlWidth/tileWidth)),
                                  minSpacing = (cols > 1) ? (cols-1) * 40 : 40,
                                  remain     = (avlWidth%tileWidth);
                                  if (remain < minSpacing){
                                      if (cols > 1){
                                          cols --;
                                      }
                                      remain = (avlWidth - (cols * tileWidth));
                                  }
                                  if (cols > 1){
                                      Ext.apply(this.spacing,{
                                          rightMargin :40,
                                          leftMargin  : 0,
                                          columns     : cols
                                      });
                                  } else {
                                      Ext.apply(this.spacing,{
                                          rightMargin : 40,
                                          leftMargin  : (remain / (cols)) / 2,
                                          columns     : cols
                                      });
                                  }
                          },
                          spacing : {
                              columns     : 0,
                              leftMargin  : 0,
                              rightMargin : 0
                          } 
            		  }
              ),
              itemSelector: 'div.thumb-wrap',
              emptyText: 'No images available',
              listeners: {
            	  scope : me,
                  'itemclick': function (view, record, item, idx, event, opts) {
                	  view.up('#main-container').getEl().mask('Loading...');
                	  view.up('#main-container').down('viewproduct').updateDetail(record.data);
                      view.up('#main-container').getLayout().setActiveItem(1);
                      view.up('app-main').down('#categorytype').update({category:obj.id+'/'+record.data.name});
                  },
                  resize : me.onLoadTileStore,
                  itemupdate   : me.onLoadTileStore
              }
      },{
    	  xtype : 'button',
    	  text : 'Show More',
    	  width :70,
    	  margin : '10px 0px',
    	  hidden: true,
      }];
    },
    
    onLoadTileStore : function(){
        var me = this;
/*        var store = me.down('dataview').getStore();
        if(store) {
                var btn = me.down('button');
                if(btn){
                  btn[(store.getTotalCount() === store.getCount()) ? 'hide' : 'show']();
                }
        }
                var totalCount = store.getTotalCount(),
        pageSize = store.pageSize,
        currentPage = store.currentPage;*/
        me.onTileViewReady();
        me.down('dataview').refresh();

    },
    
    onTileViewReady : function(){
        var me=this;
         var avlWidth   = me.up('app-main').getWidth(),
         avlWidth =avlWidth-280,
         tileWidth  = parseInt(Ext.util.CSS.getRule('.product-tile-wrapper').style.width.replace(/[^0-9]/g,'')),
         cols       = Math.floor((avlWidth/tileWidth)),
         minSpacing = (cols > 1) ? (cols-1) * 40 : 40,
         remain     = (avlWidth%tileWidth);
         if(remain==minSpacing){
         	return true;
         }   	   
         if (remain < minSpacing){
             if (cols > 1){
                 cols --;
             }
             remain = (avlWidth - (cols * tileWidth));
         }
         remain=(remain-(cols-1)*40);
         remain=remain/2;
         var main=Ext.ComponentQuery.query('tiles')[0];
         main.setMargin('0 '+remain+' 0 '+remain);
         Ext.util.CSS.updateRule('.product-tile-wrapper','cursor','default');
    }
});
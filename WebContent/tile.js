Ext.define('AC.view.network.partner.data.Tiles', {
    extend        : 'Ext.view.View',
    alias         : 'widget.partnerdatatiles',
    overflowX     : 'hidden',
    overflowY     : 'hidden',
    store         : Ext.create('AC.store.Partner',{storeId : 'partnerTileStore'}),
    initComponent : function(){
        var me = this;
        Ext.apply(me,{
            tpl          : me.buildTpl(),
            emptyText    :'<span class="tile-empty-text">'+Literal.noDataToDispaly+'</span>',
            minHeight    : window.innerHeight-245,
            itemSelector : 'div.partner-tile-wrapper'
        });
        me.callParent(arguments);

        me.on({
            itemclick : me.onTileClick
        });

        me.store.on({
            scope  : me,
            load   : me.onLoadTileStore
        });

        me.on({
            scope  : me,
            resize : me.onLoadTileStore,
            itemupdate   : me.onLoadTileStore
        });
    },
    buildTpl : function(){
        var me      = this,
            codeStr = Ext.getStore('CodeLookups'),
            helper = AC.util.Helper;
        return Ext.create('Ext.XTemplate',
            '{[this.setSpacing()]}',
            '<tpl for=".">',
                '<div style="{[this.getSpacing(xindex)]}" class="partner-tile-wrapper">',
                '<div class="logo-img">',
                '<div class="logo">',
                '<div class="image" ><img src="{[this.getPartnerImage(values)]}"/></div>',
                '</div>',
                '<div class="tile-text-info">',
                '<span  class="tile-text"><span data-qtip="{name:htmlEncode}">{name:htmlEncode}</span></span>',
                '</div>',
                '</div>',
                '<div class="network">',
                '<span class="network-text" data-qtip="{[this.getNetworkName(values,true)]}">{[this.getNetworkName(values)]}</span>',
                '</div>',
                '<div class="tile-action">',
                '{[this.getStatus(values)]}',
                '<span data-qtip="' + Literal.more + '" class="action-more-circle ai-more-circle" event="more"></span>',
                '</div>',
                '</div>',
            '</tpl>',{
                getPartnerImage : function(v){
                	var partnerId = v.id,
                	imageId = v.imageIdentifier;
                	if(imageId){
                		return HelperUtils.getCompanyImagesPath(partnerId, imageId);
                	}else{
                		return 'resources/images/defaultCompany.png';
                	}
                },
                isHub:function(){
                  return !RuntimeUtils.getLoggedInCompany().spokeCompany
                },
                getNetworkName:function(v,isToolipText){
                	var networkName=v.networkNames;
                	networkName= !Ext.isEmpty(networkName)? Ext.util.Format.htmlEncode(networkName) : Literal.notAvailable;
                	if(isToolipText){
                		return networkName;
                	}
                	else{
                	return '<b>'+Literal.networkss+'</b>'+':&nbsp'+Ext.util.Format.htmlEncode(networkName);
                	}
                },
                getStatus:function(v){
                	var event="",htmltText="",status="",circlePadding="",switchBorder="";
                 if(v.status==200){
                	 event="pause";
                	 circlePadding = '16px';
                	 status ='on';
                	 htmltText='<span class="active">'+Literal.active+'</span>';
                 }else{
                	 event="start";
                	 status ='off';
                	 circlePadding = '0px';
                	 htmltText='<span class="inactive">'+Literal.inactive +'</span>';
                	 switchBorder = 'style="border:1px solid #bcbcbc;"';
                 }
          	     htmltText= '<span  class="status-text">'+htmltText+'</span>';
          	   var html = '<span  class="text-style-switch">';
          	    html +='<div  style="left:0px !important;" event="'+event+'" class="onoffswitch">';
          		html +='<label event="'+event+'"'+switchBorder+'  class="onoffswitch-label">';
          		html +='<span event="'+event+'" class="onoffswitch-inner-'+status+'"></span>';
          		html +='<span event="'+event+'" style="left:'+circlePadding+';" class="onoffswitch-switch"></span>';
          		html +='</label>';
          		html+='</div>';
          		return html+htmltText+'</span>';
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
                    var avlWidth   = me.up('container').getWidth(),
                        tileWidth  = parseInt(Ext.util.CSS.getRule('.partner-tile-wrapper').style.width.replace(/[^0-9]/g,'')),
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
        );
    },

    onLoadTileStore : function(){
        var me = this;
        var store = me.getStore();
        if(store) {
                var btn = Ext.ComponentQuery.query('partnerwrapper #showmore')[0];
                if(btn){
                btn[(store.getTotalCount() === store.getCount()) ? 'hide' : 'show']();
                }
        }
        me.onTileViewReady();
        me.refresh();
    },

    onTileClick : function(view,rec,element,index,e){
        var me    = this,
        el    = Ext.get(e.getTarget()),
        event = el.getAttribute('event');
    if (event){
    	if(event=="more"){
    		  me.fireEvent(event,rec,el);	
    	}else{
      me.fireEvent(event,me,rec,el);
    	}
        e.stopEvent();
    } else{
       me.fireEvent('view',rec);
	}
},
onTileViewReady:function(){
    var me=this;
     var avlWidth   = me.up('main').getWidth(),
     avlWidth =avlWidth-280,
     tileWidth  = parseInt(Ext.util.CSS.getRule('.partner-tile-wrapper').style.width.replace(/[^0-9]/g,'')),
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
     var main=Ext.ComponentQuery.query('networkwrapper')[0];
     main.setMargin('0 '+remain+' 0 '+remain);
      Ext.Function.defer(function(){
        $(".network-text").dotdotdot();
	        },500);
      if(Runtime.getIsSpokeCompany()){
    	  Ext.util.CSS.updateRule('.partner-tile-wrapper','cursor','default');
          Ext.util.CSS.updateRule('.onoffswitch-label','cursor','default');
      }
}

});
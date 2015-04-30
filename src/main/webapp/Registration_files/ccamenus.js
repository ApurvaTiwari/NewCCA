/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
Ext.require(['*']);
Ext.namespace('cca');

// TODO: The "Users" menu containing buttons is completely screwed: ButtonGroup needs work.

/*
Ext.onReady(function(){
    Ext.QuickTips.init();


    var tb = Ext.create('Ext.toolbar.Toolbar');
    tb.suspendLayout = true;
    tb.render('toolbar');

    tb.addClass('toolbarbg');	
    tb.add({
            text:'Home',
            //menu: menu  // assign menu by instance
        },'-',        
        {
           text:'My Profile',
           style: { 
           	color:'white'
           },
	   menu: {        // <-- submenu by nested config object
	       items: [
		   {
		       text: 'View My Profile',
		       group: 'theme',
		       checkHandler: onItemCheck,
		       iconCls: 'view'
		   }, {
		       text: 'View My Service Package',
		       group: 'theme',
		       checkHandler: onItemCheck,
		       iconCls: 'user'
		   }, {
		       text: 'Edit My Profile',
		       group: 'theme',
		       checkHandler: onItemCheck,
		       iconCls: 'edit'
		   }, {
		       text: 'Change My Password',
		       group: 'theme',
		       checkHandler: onItemCheck,
		       iconCls: 'user'
		   }, {
		       text: 'Request a Service Package',
		       group: 'theme',
		       checkHandler: onItemCheck,
		       iconCls: 'user'
		   }, {
		       text: 'Edit Two Factor Authentication Configuration',
		       group: 'theme',
		       checkHandler: onItemCheck,
		       iconCls: 'user'
		   }
	       ]
           }
        });

    tb.suspendLayout = false;
    tb.doLayout();


    function onItemCheck(item, checked){
        Ext.example.msg('Item Check', 'You {1} the "{0}" menu item.', item.text, checked ? 'checked' : 'unchecked');
    }

});

*/



cca.MainToolbar = function()
{
  var toolbar;
  var menunumber=1;
  
  function addMenu(menuid,menutext, menuitem, contextPath)
  {
    var menu, menuItemId, menuItemName, submenu, icon;
        
    menu = new Ext.menu.Menu({id: menunumber});
            
    if (menuitem != undefined) {
    	

	    for (var i = 0 ; i < menuitem.length-1 ; i++)
	    {
	
	      menuItemName = menuitem[i].name;     
	      menuItemId = menuitem[i].id;
	      icon = menuitem[i].icon;
	      	      
	      submenu = menuitem[i].submenu;
	      	      
	      if (submenu != undefined) {
	    	  
	    	  menu.add(
		    	      {
		    	        id:      menuItemId,
		    	        text:    menuItemName,
		    	        handler: onMenuClick,
		    	        iconCls:    icon,
		    	        menu: addSubMenu(submenu)              
		    	      });
	
	      } else {
		      menu.add(
		    	      {
		    	        id:      menuItemId,
		    	        text:    menuItemName,
		    	        handler: onMenuClick,
		    	        iconCls:    icon              
		    	      });
	
	      }	     
	      
	    }
	    
	    toolbar.add({
            text: menutext,
            id: menuid,
            cls: 'active',
            handler: onMenuClick,
            menu: menu
        });
    } else { // No menu
        toolbar.add({
            text: menutext,
            id: menuid,
            cls: 'active',
            handler: onMenuClick
        });
    }

  };


  function addSubMenu(submenu)
  {
	  
    var menu,icon,subMenuItemName,subMenuItemId;
    
    subMenuItemName = submenu[0].name;
    
    menu = new Ext.menu.Menu({id: subMenuItemName});
     
    for (var i = 0 ; i < submenu.length-1 ; i++)
    {
    	
	subMenuItemName = submenu[i].name;     
	subMenuItemId = submenu[i].id;
	icon = submenu[i].icon;
    	
	 menu.add(
	 {
	   id:      subMenuItemId,
	   text:    subMenuItemName,
	   handler: onMenuClick,
	   iconCls:    icon      
	 });
	 
    }
    
    return menu;
  };
  
  

  pub =
  {

    init : function(toolbarId, contextPath, activeComponentLabels,firstName)
    {
      //Ext.BLANK_IMAGE_URL = contextPath + '/images/s.gif';

      var menuid,menutext, menuitems;

      toolbar          = new Ext.Toolbar(toolbarId);
      toolbar.addClass('toolbarbg');
      toolbar.render('toolbar');
      
    for (var i=0; i< activeComponentLabels.menu.length-1;i++) 
      {
        
    	  menuid = activeComponentLabels.menu[i].id;    	  
    	  menutext = activeComponentLabels.menu[i].name;
    	  menuitems = activeComponentLabels.menu[i].menuitem;
    	
	      ++menunumber;
    	  
    	  if (menuitems != undefined) {
    	  	    		  
	    	addMenu(menuid,menutext, menuitems, contextPath);
	    	  
      	  } else {
      		  addMenu(menuid,menutext, menuitems, contextPath);
      	  }

    		  toolbar.add('-');    	  
      }
    }


    
	};

  return pub;

}();



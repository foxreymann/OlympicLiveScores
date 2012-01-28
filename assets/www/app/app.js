document.addEventListener("deviceready", function () {

    Ext.Loader.setConfig({ enabled: true });

    Ext.require([    
        'Ext.XTemplate',
        'Ext.Panel',
        'Ext.Button',
        'Ext.List'
    ]);

    /*Ext.setup({
        viewport: {
            autoMaximize: false
        },
        onReady: function() {
            console.log("onReady:");


            var app = 
    */
            // Main application entry point
            Ext.application({
                phoneStartupScreen: 'images/sencha_logo.png',
                name: 'HelloWorld',
                autoCreateViewport: false,
                // the controller will take care of creating the view        
                controllers: ['Home'],
                // You could delete this, here only to illustrate
                // the sequence of events		
                initialize: function () {
                    console.log('app initialize');
                    this.callParent();
                },	
                launch: function() {              
                    console.log('app launch');
                    var carousel = Ext.create('Ext.Carousel', {
                        fullscreen: true,
                        // clean instantiation using the widget.alias's defined
                        // in each view
                        items: [
                            { xtype: 'home' },
                            { xtype: 'simplelist' }                
                        ]
                    });
                }
            });

      /*  }
    });*/

    Ext.define('HelloWorld.view.SimpleList', {
        extend: 'Ext.Panel',	
        alias: 'widget.simplelist',
        layout: 'vbox',
        config : {
            items: [ 	
            { xtype: 'list', 
                layout: 'fit', //fullscreen: true, 
                height: '200',
                store: 'Stations',
                itemTpl: '{id} :: {name}'
                }
            ]		
        }, 
        initialize: function() {
            console.log('initialize simplelist view');	    
            this.callParent();
        }
    });

    Ext.define('HelloWorld.model.Station', {
        extend: 'Ext.data.Model',
        fields: ['id', 'name'],
        proxy: {
            type: 'ajax',
            url: 'data/stations.json',
            reader: {
                type: 'json',
                root: 'results' 
            }
        }
    });

    Ext.define('HelloWorld.view.Home', {
        extend: 'Ext.Panel',
        alias: 'widget.home',
        layout: 'vbox',
        title: "Home View",
        config: {
            items: [
                    { 
                        xtype: 'button', 					
                        text: 'Say Hello (on the console)' 
                    },
                    { 
                        xtype: 'button',
                        id: 'firstButton',
                        text: 'Say Hello again' 
                    },
                    { 
                        xtype: 'input', 
                        id : 'bottomInput',
                        value: 'Component Query "Ref" example' 
                    },
                    {
                        html: [
                        '<h2>Make sure you have the console visible when you run this example. </h2>',
                        'This example creates a carousel with 2 views ',
                        '(slide right for the 2nd card). <br/>',
                        'The first card has a couple of buttons that show how ',
                        'the Controller is wired up to events on the View. ',
                        'The first button shows how to wire an event ',
                        'in the controller to multiple items on the page. <br/>',
                        'The 2nd button shows how to bind to just one item using the id ',
                        'and also how to reference another view instance using ',
                        'a component query and automatically generated getter. <br/>',					
                        'The 2nd card loads data from a store using Ajax so you\'ll ',
                        'need to host it on a web server to avoid an XHR exception.'].join("")
                    }
            ]
        },
        initialize: function() {
            console.log('initialize home view');
            this.callParent();
        }
    });

    Ext.define('HelloWorld.controller.Home', {
        extend: 'Ext.app.Controller',	
        views: ['Home', 'SimpleList'],
        stores: ['Stations'],
        // These "refs" will generate "getters" for each of the view component instances
        // e.g. getBottomField and getStationList
        refs: [{
                selector: 'carousel > panel > #bottomInput',
                ref: 'bottomField'
                },
                {
                selector: 'carousel > list', 
                ref: 'stationList'
                }
        ],
        init: function() {
            console.log('Init home controller');
            // Start listening for events on views
            this.control({
                // example of listening to *all* button taps
                'button': { 'tap': function () {
                            console.log('Every button says Hello world');
                        } 
                    },
                // Example of listening by an explicit id
                '#firstButton': { 'tap': function () {
                            console.log('Only the button with id=firstButton says Hello');
                            alert(this.getBottomField().getValue());
                        } 
                    }			
            });
        },

        onLaunch: function() {
            console.log('onLaunch home controller');
            // The "getter" here was generated by specifying the 
            // stores array (above)
            var stationsStore = this.getStationsStore();  
            
            stationsStore.load({
                callback: this.onStationsLoad,
                scope: this
            });
        },
        
        onStationsLoad: function() {
            console.log('onStationsLoad home controller');
            // get a reference to the view component
            var stationsList = this.getStationList();
            // do something
        },
        
        onStationSelect: function(selModel, selection) {
            // Fire an application wide event
            this.application.fireEvent('stationstart', selection[0]);
        },
        
    });

    Ext.define('HelloWorld.store.Stations', {
        extend: 'Ext.data.Store',
        requires: 'HelloWorld.model.Station',
        model: 'HelloWorld.model.Station',
        autoLoad: true
    });

 }, false);

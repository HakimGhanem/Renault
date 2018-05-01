/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * TreeTable module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'promise',
    'ojs/ojtable', 'ojs/ojrowexpander', 'ojs/ojflattenedtreetabledatasource', 'ojs/ojjsontreedatasource'],
        function (oj, ko, $) {
            /**
             * The view model for the main content view template
             */
            function TreeTableContentViewModel() {
                var self = this;

                var newJson = [];

                //var file  = jQuery.getJSON(file);
                self.datasource = ko.observable();
                console.log("Start");

                $.getJSON("https://api.myjson.com/bins/sdayv",
                        function (data)
                        {
                            var treeData = [];

                            createSubLines(data, treeData);

                            //treeData.push({attr:"test"});
                            /*
                             treeData.push({attr: data[0]});
                             
                             var sousLigne = -1;
                             
                             for(var i = 1; i < data.length; i++){
                             sousLigne = -1;
                             for(var j = 0; j < treeData.length; j++){
                             if(treeData[j]["attr"]["idLieuOrigine"] === data[i]["idLieuOrigine"] && treeData[j]["attr"]["articleReference"] === data[i]["articleReference"]){
                             sousLigne = j;
                             break;
                             }
                             }
                             if(sousLigne < 0)
                             treeData.push({attr: data[i]});
                             else{
                             if(treeData[sousLigne].children)
                             treeData[sousLigne].children.push({attr: data[i]});
                             else
                             treeData[sousLigne].children = [{attr: data[i]}];
                             }                      
                             }
                             
                             console.log(JSON.stringify(treeData, null, 4));
                             //console.log(JSON.stringify(treeData, null, 4));
                             //console.log(data);
                             console.log("ok");
                             //console.log(data[0]["id"]);
                             
                             */
                            console.log(sumChildren(treeData[0], "nbPieces"));
                            sumTab(treeData, "nbPieces");
                            sumTab(treeData, "nbEmballages");
                            
                            self.datasource(new oj.FlattenedTreeTableDataSource(new oj.FlattenedTreeDataSource(new oj.JsonTreeDataSource(treeData))));
                        }
                );


                /*
                 $.getJSON("https://api.myjson.com/bins/1ayexj", 
                 function(data) 
                 {
                 
                 
                 
                 console.log("ok");
                 
                 
                 
                 self.datasource(new oj.FlattenedTreeTableDataSource(new oj.FlattenedTreeDataSource(new oj.JsonTreeDataSource(data))));  
                 }
                 );
                 */
                //self.datasource = new oj.FlattenedTreeTableDataSource(new oj.FlattenedTreeDataSource(new oj.JsonTreeDataSource(newJson), options));
                //ko.applyBindings( self.datasource, document.getElementById('table'));

            }
            function createSubLines(data, treeData) {

                treeData.push({attr: data[0]});
                treeData[treeData.length - 1].children = [{attr: $.extend({}, data[0])}];
                //treeData[treeData.length - 1].children = [{attr:  data[0]}];
                treeData[treeData.length - 1].children[0].attr.id = 999999;
                var sousLigne = -1;

                for (var i = 1; i < data.length; i++) {
                    sousLigne = -1;
                    for (var j = 0; j < treeData.length; j++) {
                        if (treeData[j]["attr"]["idLieuOrigine"] === data[i]["idLieuOrigine"] 
                                && treeData[j]["attr"]["articleReference"] === data[i]["articleReference"]
                                    /*&& treeData[j]["attr"]["idLieuDestination"] === data[i]["idLieuDestination"]*/) {
                            sousLigne = j;
                            break;
                        }
                    }
                    if (sousLigne < 0){
                        treeData.push({attr: data[i]});
                        treeData[treeData.length - 1].children = [{attr: $.extend({}, data[i])}];
                        treeData[treeData.length - 1].children[0].attr.id = 999999;
                        //treeData[treeData.length - 1].children = [{attr: data[i]}];
                    }
                    else {
                        if (treeData[sousLigne].children)
                            treeData[sousLigne].children.push({attr: data[i]});
                        else
                            treeData[sousLigne].children = [{attr: data[i]}];
                    }
                }
            }


            function sumChildren(principalLine, column) {
                
                //var children = dataChildren.children;
                var sum = 0;
                for (var i = 0; i < principalLine.children.length; i++) {
                    sum += principalLine.children[i]["attr"][column];
                }
                 
                return sum;
            }
            
            function sumTab(treeData, column){
                
                for(var i = 0; i < treeData.length; i++){
                    var sum = sumChildren(treeData[i], column);
                    treeData[i]["attr"][column] = sum;
                }
                
            }

            return TreeTableContentViewModel;
        });

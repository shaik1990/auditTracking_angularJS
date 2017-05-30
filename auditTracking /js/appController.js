/**
 * Created by naseershaik on 5/25/17.
 */
var app = angular.module("auditApp",['ngReactGrid']);

app.controller("myController",['$scope', '$timeout', 'ngReactGridCheckbox',function ($scope, $timeout, ngReactGridCheckbox) {
    $scope.showDashboard = true;
    $scope.showCore = false;
    $scope.showShared = false;
    $scope.showMHP = false;
    $scope.showColo = false;
    $scope.showBackbone = false;
    $scope.showColumnGroups = false;
    $scope.showButtons = false;
    $scope.menuClick = function(menuName){
        $scope.showDashboard = false;
        $scope.showCore = false;
        $scope.showShared = false;
        $scope.showMHP = false;
        $scope.showColo = false;
        $scope.showBackbone = false;
        $scope.showColumnGroups = true;
        $scope.showButtons = true;
        $scope.menuFocus(menuName);

        switch(menuName){
            case "Core":
                $scope.showCore = true;
                break;
            case "Shared":
                $scope.showShared = true;
                break;
            case "MHP":
                $scope.showMHP = true;
                break;
            case "Colo":
                $scope.showColo = true;
                break;
            case "Backbone":
                $scope.showBackbone = true;
                break;
        }
    };

    $scope.menuFocus = function(menuName){
        var elements = document.getElementsByClassName("menuItems");
        for(var i = 0; i < elements.length; i++){
            var element = angular.element(elements[i]);
            element.removeClass("active");
            if(element[0].innerText == menuName){
                element.addClass("active");
            }
        }
    };

    $scope.groupAF = [];
    $scope.groupGL = [];
    $scope.groupMS = [];
    $scope.groupTZ = [];
    $scope.groupStatus = [];
    $scope.showAfDropDown = false;
    $scope.showGlDropDown = false;
    $scope.showMsDropDown = false;
    $scope.showTzDropDown = false;
    $scope.showStatusDropDown = false;

    $scope.groupMenuClick = function(menuName){
        switch(menuName){
            case "A-F":
                $scope.showAfDropDown = true;
                break;
            case "G-L":
                $scope.showGlDropDown = true;
                break;
            case "M-S":
                $scope.showMsDropDown = true;
                break;
            case "T-Z":
                $scope.showTzDropDown = true;
                break;
            case "Status":
                $scope.showStatusDropDown = true;
                break;
        }
    };

    $scope.doneClick = function(){
        $scope.showAfDropDown = false;
        $scope.showGlDropDown = false;
        $scope.showMsDropDown = false;
        $scope.showTzDropDown = false;
        $scope.showStatusDropDown = false;
        $scope.reloadGrids();
    };

    $scope.coreColumnDefinitions = [];
    $scope.sharedColumnDefinitions = [];
    $scope.mhpColumnDefinitions = [];
    $scope.coloColumnDefinitions = [];
    $scope.backboneColumnDefinitions = [];

    $scope.coreSelections = [];
    $scope.sharedSelections = [];
    $scope.mhpSelections = [];
    $scope.coloSelections = [];
    $scope.backboneSelections = [];

    $scope.deleteRowsClick = function(){
        var params = [];
        if($scope.coreSelections.length === 0 && $scope.sharedSelections.length === 0
            && $scope.mhpSelections.length === 0 && $scope.coloSelections.length === 0
            && $scope.backboneSelections.length === 0){
            return;
        }
        for(var i = 0; i < $scope.coreSelections.length; i++){
            $scope.coreData.splice($scope.coreData.indexOf($scope.coreSelections[i]),1)
            params.push({"host_id" : $scope.coreSelections[i].host_id})
        }
        for(var j = 0; j < $scope.sharedSelections.length; j++){
            $scope.sharedData.splice($scope.sharedData.indexOf($scope.sharedSelections[j]),1)
            params.push({"host_id" : $scope.sharedSelections[j].host_id})
        }
        for(var k = 0; k < $scope.mhpSelections.length; k++){
            $scope.mhpData.splice($scope.mhpData.indexOf($scope.mhpSelections[k]),1)
            params.push({"host_id" : $scope.mhpSelections[k].host_id})
        }
        for(var l = 0; l < $scope.coloSelections.length; l++){
            $scope.coloData.splice($scope.coloData.indexOf($scope.coloSelections[l]),1)
            params.push({"host_id" : $scope.coloSelections[l].host_id})
        }
        for(var m = 0; m < $scope.backboneSelections.length; m++){
            $scope.backboneData.splice($scope.backboneData.indexOf($scope.backboneSelections[m]),1)
            params.push({"host_id" : $scope.backboneSelections[m].host_id})
        }

        params = JSON.stringify(params);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://127.0.0.1:8000/auditdatadelete/", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Rows deleted successfully. You will now be redirected to Dashboard");
                angular.element(document.getElementById("cancelButton"))[0].click();
            }
        };
        xhttp.send(params);

        $scope.coreSelections = [];
        $scope.sharedSelections = [];
        $scope.mhpSelections = [];
        $scope.coloSelections = [];
        $scope.backboneSelections = [];
    };

    $scope.saveClick = function(){
        var scope = $scope;
        var params = [];
        for(var i = 0; i < $scope.coreData.length; i++){
            params.push($scope.coreData[i]);
        }
        for(var j = 0; j < $scope.sharedData.length; j++){
            params.push($scope.sharedData[j]);
        }
        for(var k = 0; k < $scope.mhpData.length; k++){
            params.push($scope.mhpData[k]);
        }
        for(var l = 0; l < $scope.coloData.length; l++){
            params.push($scope.coloData[l]);
        }
        for(var m = 0; m < $scope.backboneData.length; m++){
            params.push($scope.backboneData[m]);
        }

        params = JSON.stringify(params);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://127.0.0.1:8000/auditdataupdate/", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var abc = xhttp.responseText;
                alert(abc);
            }
        };
        xhttp.send(params);
    };

    $scope.cancelClick = function(){
        $scope.hostCol = ["host_name"];
        $scope.dropDownCols = ["Spanning_Tree","Nat","Service","Config_Sync","Snmp","Logging_Local","Control_Plane","Gre","Logging_Remote",
            "Monitoring","Virtual_Server","CMS","Monitor","Service_Group","Ntp","Ip_Host","Accounting_Authorization","Healthcheck",
            "Interfaces","Vlan","Config_Validation","Access_List","Ssh","Server_Port","Config_Validation_Review","Remediation","Prefix_List",
            "As_Path_Set","Server_Vip_Group","Aaa","Default_Gateway","Tacacs","Template_Creation","Bgp","Route_Policy",
            "Match_List","Username","ip_address","product_id","Static_Routes","Line_Con","Ospf","Banner","Community","Real_Server",
            "Global_Server_Config","Route_Map","brocade"];
        $scope.otherCols = ["Process_Not_Started","Complete","Process_Complete","In_Progress_MALT",
            "Not_Started","In_Progress_NAV","In_Progress","Not_Started_","Completed","Process_In_Progress"];
        $scope.showDashboard = true;
        $scope.showCore = false;
        $scope.showShared = false;
        $scope.showMHP = false;
        $scope.showColo = false;
        $scope.showBackbone = false;
        $scope.showColumnGroups = false;
        $scope.showButtons = false;
        $scope.reloadColumnSelections();
        $scope.loadGrids();
        $scope.menuFocus();
    };

    $scope.reloadColumnSelections = function(){

        $scope.groupAF = [
            {
                key: "Aaa",
                value: true
            },
            {
                key: "Access_List",
                value: true
            },
            {
                key: "Accounting_Authorization",
                value: true
            },
            {
                key: "As_Path_Set",
                value: true
            },
            {
                key: "Banner",
                value: true
            },
            {
                key: "Bgp",
                value: true
            },
            {
                key: "brocade",
                value: true
            },
            {
                key: "Community",
                value: true
            },
            {
                key: "Config_Sync",
                value: true
            },
            {
                key: "Control_Plane",
                value: true
            },
            {
                key: "Config_Validation",
                value: true
            },
            {
                key: "Config_validation_review",
                value: true
            },
            {
                key: "CMS",
                value: true
            },
            {
                key: "Default_Gateway",
                value: true
            }
        ];

        $scope.groupGL = [
            {
                key: "Global_Server_Config",
                value: true
            },
            {
                key: "Gre",
                value: true
            },
            {
                key: "Healthcheck",
                value: true
            },
            {
                key: "Interfaces",
                value: true
            },
            {
                key: "ip_address",
                value: true
            },
            {
                key: "Ip_Host",
                value: true
            },
            {
                key: "Logging_Local",
                value: true
            },
            {
                key: "Logging_Remote",
                value: true
            },
            {
                key: "Line_Con",
                value: true
            }
        ];

        $scope.groupMS = [
            {
                key: "Match_List",
                value: true
            },
            {
                key: "Monitoring",
                value: true
            },
            {
                key: "Monitor",
                value: true
            },
            {
                key: "Nat",
                value: true
            },
            {
                key: "Ntp",
                value: true
            },
            {
                key: "Ospf",
                value: true
            },
            {
                key: "Prefix_List",
                value: true
            },
            {
                key: "product_id",
                value: true
            },
            {
                key: "Remediation",
                value: true
            },
            {
                key: "Real_Server",
                value: true
            },
            {
                key: "Route_Map",
                value: true
            },
            {
                key: "Route_Policy",
                value: true
            },
            {
                key: "Static_Routes",
                value: true
            },
            {
                key: "Snmp",
                value: true
            },
            {
                key: "Ssh",
                value: true
            },
            {
                key: "Spanning_Tree",
                value: true
            },
            {
                key: "Service",
                value: true
            },
            {
                key: "Service_Group",
                value: true
            },
            {
                key: "Server_Vip_Group",
                value: true
            },
            {
                key: "Server_Port",
                value: true
            }
        ];

        $scope.groupTZ = [
            {
                key: "Tacacs",
                value: true
            },
            {
                key: "Template_Creation",
                value: true
            },
            {
                key: "Username",
                value: true
            },
            {
                key: "Virtual_Server",
                value: true
            },
            {
                key: "Vlan",
                value: true
            }
        ];

        $scope.groupStatus = [
            {
                key: "Process_Not_Started",
                value: true
            },
            {
                key: "Process_Complete",
                value: true
            },
            {
                key: "In_Progress_MALT",
                value: true
            },
            {
                key: "Not_Started",
                value: true
            },
            {
                key: "Complete",
                value: true
            },
            {
                key: "In_Progress_NAV",
                value: true
            },
            {
                key: "In_Progress",
                value: true
            },
            {
                key: "Not_Started_",
                value: true
            },
            {
                key: "Completed",
                value: true
            },
            {
                key: "Process_In_Progress",
                value: true
            }
        ];
    };

    $scope.reloadGrids = function(){
        for(var i = 0; i < $scope.groupAF.length; i++){
            if($scope.groupAF[i].value == false){
                if($scope.hostCol.indexOf($scope.groupAF[i].key) > -1){
                    $scope.hostCol.splice($scope.hostCol.indexOf($scope.groupAF[i].key),1);
                } else if($scope.dropDownCols.indexOf($scope.groupAF[i].key) > -1){
                    $scope.dropDownCols.splice($scope.dropDownCols.indexOf($scope.groupAF[i].key),1);
                } else if($scope.otherCols.indexOf($scope.groupAF[i].key) > -1){
                    $scope.otherCols.splice($scope.otherCols.indexOf($scope.groupAF[i].key),1);
                }
            }
        }

        for(var j = 0; j < $scope.groupGL.length; j++){
            if($scope.groupGL[j].value == false){
                if($scope.hostCol.indexOf($scope.groupGL[j].key) > -1){
                    $scope.hostCol.splice($scope.hostCol.indexOf($scope.groupGL[j].key),1);
                } else if($scope.dropDownCols.indexOf($scope.groupGL[j].key) > -1){
                    $scope.dropDownCols.splice($scope.dropDownCols.indexOf($scope.groupGL[j].key),1);
                } else if($scope.otherCols.indexOf($scope.groupGL[j].key) > -1){
                    $scope.otherCols.splice($scope.otherCols.indexOf($scope.groupGL[j].key),1);
                }
            }
        }

        for(var k = 0; k < $scope.groupMS.length; k++){
            if($scope.groupMS[k].value == false){
                if($scope.hostCol.indexOf($scope.groupMS[k].key) > -1){
                    $scope.hostCol.splice($scope.hostCol.indexOf($scope.groupMS[k].key),1);
                } else if($scope.dropDownCols.indexOf($scope.groupMS[k].key) > -1){
                    $scope.dropDownCols.splice($scope.dropDownCols.indexOf($scope.groupMS[k].key),1);
                } else if($scope.otherCols.indexOf($scope.groupMS[k].key) > -1){
                    $scope.otherCols.splice($scope.otherCols.indexOf($scope.groupMS[k].key),1);
                }
            }
        }

        for(var l = 0; l < $scope.groupTZ.length; l++){
            if($scope.groupTZ[l].value == false){
                if($scope.hostCol.indexOf($scope.groupTZ[l].key) > -1){
                    $scope.hostCol.splice($scope.hostCol.indexOf($scope.groupTZ[l].key),1);
                } else if($scope.dropDownCols.indexOf($scope.groupTZ[l].key) > -1){
                    $scope.dropDownCols.splice($scope.dropDownCols.indexOf($scope.groupTZ[l].key),1);
                } else if($scope.otherCols.indexOf($scope.groupTZ[l].key) > -1){
                    $scope.otherCols.splice($scope.otherCols.indexOf($scope.groupTZ[l].key),1);
                }
            }
        }

        for(var m = 0; m < $scope.groupStatus.length; m++){
            if($scope.groupStatus[m].value == false){
                if($scope.hostCol.indexOf($scope.groupStatus[m].key) > -1){
                    $scope.hostCol.splice($scope.hostCol.indexOf($scope.groupStatus[m].key),1);
                } else if($scope.dropDownCols.indexOf($scope.groupStatus[m].key) > -1){
                    $scope.dropDownCols.splice($scope.dropDownCols.indexOf($scope.groupStatus[m].key),1);
                } else if($scope.otherCols.indexOf($scope.groupStatus[m].key) > -1){
                    $scope.otherCols.splice($scope.otherCols.indexOf($scope.groupStatus[m].key),1);
                }
            }
        }

        $scope.coreColumnDefinitions = $scope.buildColDefs("Core");
        $scope.sharedColumnDefinitions = $scope.buildColDefs("Shared");
        $scope.mhpColumnDefinitions = $scope.buildColDefs("MHP");
        $scope.coloColumnDefinitions = $scope.buildColDefs("Colo");
        $scope.backboneColumnDefinitions = $scope.buildColDefs("Backbone");
        $scope.initializeGrids();
    };

    $scope.coreData = [];
    $scope.sharedData = [];
    $scope.mhpData = [];
    $scope.coloData = [];
    $scope.backboneData = [];

    $scope.loadCoreData = function(){
        var scope = $scope;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scope.coreData = JSON.parse(xhttp.responseText);
                scope.coreGrid.data = scope.coreData;
            }
        };
        //xhttp.open("GET", "./SampleData/CoreData.txt", true);
        xhttp.open("GET", "http://127.0.0.1:8000/auditdataget/?product_id=1", true);
        xhttp.send();
    };

    $scope.loadSharedData = function(){
        var scope = $scope;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scope.sharedData = JSON.parse(xhttp.responseText);
                scope.sharedGrid.data = scope.sharedData;
            }
        };
        //xhttp.open("GET", "./SampleData/SharedData.txt", true);
        xhttp.open("GET", "http://127.0.0.1:8000/auditdataget/?product_id=2", true);
        xhttp.send();
    };

    $scope.loadMhpData = function(){
        var scope = $scope;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scope.mhpData = JSON.parse(xhttp.responseText);
                scope.mhpGrid.data = scope.mhpData;
            }
        };
        // xhttp.open("GET", "./SampleData/MHPData.txt", true);
        xhttp.open("GET", "http://127.0.0.1:8000/auditdataget/?product_id=3", true);
        xhttp.send();
    };

    $scope.loadColoData = function(){
        var scope = $scope;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scope.coloData = JSON.parse(xhttp.responseText);
                scope.coloGrid.data = scope.coloData;
            }
        };
        // xhttp.open("GET", "./SampleData/ColoData.txt", true);
        xhttp.open("GET", "http://127.0.0.1:8000/auditdataget/?product_id=4", true);
        xhttp.send();
    };

    $scope.loadBackboneData = function(){
        var scope = $scope;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scope.backboneData = JSON.parse(xhttp.responseText);
                scope.backboneGrid.data = scope.backboneData;
            }
        };
        // xhttp.open("GET", "./SampleData/BackboneData.txt", true);
        xhttp.open("GET", "http://127.0.0.1:8000/auditdataget/?product_id=5", true);
        xhttp.send();
    };

    $scope.hostCol = ["host_name"];
    $scope.dropDownCols = ["Spanning_Tree","Nat","Service","Config_Sync","Snmp","Logging_Local","Control_Plane","Gre","Logging_Remote",
        "Monitoring","Virtual_Server","CMS","Monitor","Service_Group","Ntp","Ip_Host","Accounting_Authorization","Healthcheck",
        "Interfaces","Vlan","Config_Validation","Access_List","Ssh","Server_Port","Config_Validation_Review","Remediation","Prefix_List",
        "As_Path_Set","Server_Vip_Group","Aaa","Default_Gateway","Tacacs","Template_Creation","Bgp","Route_Policy",
        "Match_List","Username","ip_address","product_id","Static_Routes","Line_Con","Ospf","Banner","Community","Real_Server",
        "Global_Server_Config","Route_Map","brocade"];
    $scope.otherCols = ["Process_Not_Started","Complete","Process_Complete","In_Progress_MALT",
        "Not_Started","In_Progress_NAV","In_Progress","Not_Started_","Completed","Process_In_Progress"];

    $scope.buildColDefs = function(){
        var colDefs = [];

        var dropDownOptions = [
            {
                key : "Not Started",
                value : "1"
            },
            {
                key : "In Progress",
                value : "2"
            },
            {
                key : "In Progress - Nav",
                value : "3"
            },
            {
                key : "Completed",
                value : "4"
            },
            {
                key : "Not Applicable",
                value : "5"
            }
        ];

        colDefs.push(new ngReactGridCheckbox($scope.coreSelections));
        colDefs.push({
            field: "host_name",
            columnFilter: false,
            displayName: "host name"
        });

        for(var i = 0; i < $scope.dropDownCols.length; i++){
            var field = $scope.dropDownCols[i];
            var displayName = $scope.dropDownCols[i].split("_").join(" ");
            colDefs.push({
                field: field,
                columnFilter: false,
                displayName: displayName,
                render: function(row) {
                    var fieldName = this.field;
                    var options = dropDownOptions.map(function(option) {
                        return (
                            React.createElement("option", {value: option.value}, option.key)
                            )
                    });

                    return (
                        React.createElement("select", {className: "ngReactGridSelectField", defaultValue:row[fieldName], value: row[fieldName], onChange:function(event){
                            var element = event.target;
                            row[fieldName] = element.value;
                            $timeout(function(){
                                element.value = row[fieldName];
                            },200);
                        }},options)
                        )
                }
            })
        }

        for(var j = 0; j < $scope.otherCols.length; j++){
            colDefs.push({
                field: $scope.otherCols[j],
                columnFilter: false,
                displayName: $scope.otherCols[j].split("_").join("")
            });
        }

        return colDefs;
    };

    $scope.initializeCoreGrid= function(){
        $scope.coreGrid = {
            data: $scope.coreData,
            columnDefs: $scope.coreColumnDefinitions,
            height: 445,
            totalCount: 0,
            pageSize: 25,
            pageSizes: [25, 50, 100, 250],
            horizontalScroll: false,
            totalPages: 0,
            currentPage: 1
        };
    };

    $scope.initializeSharedGrid = function(){
        $scope.sharedGrid = {
            data: $scope.sharedData,
            columnDefs: $scope.sharedColumnDefinitions,
            height: 445,
            totalCount: 0,
            pageSize: 25,
            pageSizes: [25, 50, 100, 250],
            horizontalScroll: false,
            totalPages: 0,
            currentPage: 1
        };
    };

    $scope.initializeMhpGrid = function(){
        $scope.mhpGrid = {
            data: $scope.mhpData,
            columnDefs: $scope.mhpColumnDefinitions,
            height: 445,
            totalCount: 0,
            pageSize: 25,
            pageSizes: [25, 50, 100, 250],
            horizontalScroll: false,
            totalPages: 0,
            currentPage: 1
        };
    };

    $scope.initializeColoGrid = function(){
        $scope.coloGrid = {
            data: $scope.coloData,
            columnDefs: $scope.coloColumnDefinitions,
            height: 445,
            totalCount: 0,
            pageSize: 25,
            pageSizes: [25, 50, 100, 250],
            horizontalScroll: false,
            totalPages: 0,
            currentPage: 1
        };
    };

    $scope.initializeBackboneGrid = function(){
        $scope.backboneGrid = {
            data: $scope.backboneData,
            columnDefs: $scope.backboneColumnDefinitions,
            height: 445,
            totalCount: 0,
            pageSize: 25,
            pageSizes: [25, 50, 100, 250],
            horizontalScroll: false,
            totalPages: 0,
            currentPage: 1
        };
    };

    $scope.initializeGrids = function(){
        $scope.coreColumnDefinitions = $scope.buildColDefs("Core");
        $scope.sharedColumnDefinitions = $scope.buildColDefs("Shared");
        $scope.mhpColumnDefinitions = $scope.buildColDefs("MHP");
        $scope.coloColumnDefinitions = $scope.buildColDefs("Colo");
        $scope.backboneColumnDefinitions = $scope.buildColDefs("Backbone");
        $scope.initializeCoreGrid();
        $scope.initializeSharedGrid();
        $scope.initializeColoGrid();
        $scope.initializeMhpGrid();
        $scope.initializeBackboneGrid();
    };

    $scope.loadGridsData = function(){
        $scope.loadCoreData();
        $scope.loadSharedData();
        $scope.loadColoData();
        $scope.loadMhpData();
        $scope.loadBackboneData();
    };

    $scope.loadGrids = function(){
        $scope.reloadColumnSelections();
        $scope.initializeGrids();
        $scope.loadGridsData();
    };

    $scope.loadGrids();
}]);
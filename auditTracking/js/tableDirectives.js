/**
 * Created by naseershaik on 5/25/17.
 */
app.directive('coreDirective',['$compile',
    function ($compile) {
        return {
            restrict: 'A',
            scope: {
                attributes: '@'
            },
            link: function (scope, elm, attr) {
                function paintTable(){
                    scope.coreData = scope.$parent.coreData;

                    var columns = ["Spanning_Tree","Process_Not_Started","site_name","Nat","Service",
                        "Config_Sync","Snmp","Logging_Local","Control_Plane","Gre","Logging_Remote",
                        "host_id","Monitoring","Virtual_Server","CMS","Monitor","Service_Group",
                        "Ntp","Ip_Host","Complete","Accounting_Authorization","Healthcheck",
                        "Interfaces","Vlan","Config_Validation","Access_List","Process_Complete",
                        "Ssh","Server_Port","Config_Validation_Review","Remediation","Prefix_List",
                        "As_Path_Set","Server_Vip_Group","In_Progress_MALT","Aaa","Default_Gateway",
                        "Tacacs","Not_Started","Template_Creation","Bgp","Route_Policy",
                        "In_Progress_NAV","Match_List","device_type_name","In_Progress","Username",
                        "ip_address","Not_Started_","Completed","product_id","Static_Routes","Line_Con",
                        "Ospf","Banner","Community","Process_In_Progress","Real_Server",
                        "Global_Server_Config","host_name","Route_Map","vendor_name","brocade",
                        "model_name"];
                    var template = "";

                    template += '<table id="coreTable" class="myTable">';
                    template += '<tr>';
                    template += '<td class="gridColumnHeader"> Hostname </td>';
                    for(var j = 0; j < columns.length; j++){
                        if(columns[j] !== "host_name") {
                            template += '<td class="gridColumnHeader">' + columns[j] + '</td>';
                        }
                    }
                    template += '</tr>';
                    template += '<tr ng-repeat="x in coreData">';
                    template += '<td class="gridCell">{{ x.host_name }}</td>';
                    for(var i = 0; i < columns.length; i++){
                        if(columns[i] !== "host_name"){
                            template += '<td class="gridCell">';
                            var columnName = columns[i];
                            template += '<select ng-model="x['+ columns[i].toString() +']">' +
                                '<option value="Not Started">Not Started</option>' +
                                '<option value="In Progress">In Progress</option>' +
                                '<option value="In Progress - NAV">In Progress - NAV </option>' +
                                '<option value="Completed">Completed</option>' +
                                '<option value="Not Applicable">Not Applicable</option>' +
                                '</select>';
                            template += '</td>';
                        }
                    }
                    template += '</tr>';
                    template += '</table>';
                    var content = $compile(template)(scope);
                    elm[0].appendChild(content[0]);
                }
                paintTable();
                scope.$on('repaintCoreTable', function(){
                    elm[0].innerHTML = '';
                    paintTable();
                })
            }
        };
    }]);

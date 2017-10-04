
function generateSidebar(){
        var sidebarString2='';
        var sidebarString=''+
                '</br>';
                if (getTreeValue != 'none'){ //if a tree is enterered in the get request variable
                        sidebarString+='<a href="./" style="text-decoration: none;">'+
                        '<h1 style="margin-left:5%;">&#9166; Back</h1></a>';
                        for (id in nameToIds[getTreeValue]){
                                for (tree in data){
                                        if (data[tree]['id'] == nameToIds[getTreeValue][id]){
                                                //console.log(idToMarker[data[tree]["id"]]);
                                                sidebarString2+='<tr><td>'+
                                                  data[tree]['id']+ //this is the line i got confused with triggering the marker's click event or somehing. do ti whem sober
                                                      '. </td><td><label onclick="google.maps.event.trigger('+idToMarker[data[tree]["id"]]+', \"click\")"><span><i>('+
                                                          data[tree]["lat"]+', '+data[tree]["lon"]+
                                                       ')</i></span></label></td>'+
                                                  '';
                                                sidebarNameTitle=data[tree]["name"];
                                                sidebarNameTax=data[tree]["tax"];
                                        }
                                }                                
                        }
                        sidebarString+='<table style="width:100%;margin:0.25em;"><tr><td colspan="3"><h1 >'+sidebarNameTitle+'<h1><h3><i>'+sidebarNameTax+' ('+nameToIds[getTreeValue].length+')</</i></h3></td></tr></b></b>';
                        sidebarString+=sidebarString2;
                        sidebarString+='</table>';
                }else{ //main map with everything loaded
                    sidebarString+='</br>'+
                    '<button onclick="toggleAllMarkers()">Toggle All</button>'+
                    '<button onclick="allMarkersOn()">Turn all on</button>'+
                    '<button onclick="allMarkersOff()">Turn all off</button><ol>';

                    for (var i = 0; i < uniqueList.length; i++){ //Finds all unique tree species
                          sidebarString+=''+
                          '<li>'+
                              '<label>'+
                                  '<input type="checkbox" '+
                                    'checked '+ 
                                    'id=\"'+uniqueList[i]["name"]+'\" '+
                                    'onchange="toggleSpeciesMarker(\''+uniqueList[i]["name"]+'\')">'+
                                    uniqueList[i]['name']+
                               '</label>'+
                          '</li>';
                     }
                }
                
        sidebarString+='</ol>';

        document.getElementById("sidebar").innerHTML = sidebarString;
}
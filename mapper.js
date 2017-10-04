var map;
var idToMarker = {};
var nameToIds = {};
var addTreeMarker;

function initMap() {
        var infowindow = new google.maps.InfoWindow;
        map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 19,
	  mapTypeId: 'satellite'
        });
	//good view of KU is at 40.513348, -75.777088
        
        //Right click opens a form to add a tree
	google.maps.event.addListener(map, 'rightclick', function(event) {
                addTreeMarker = new google.maps.Marker({
                        position: event.latLng, 
                        map: map
                        });
		        // content of infowindow
			var contentString = '<div id="content">'+
                        '<center><b><p>Add tree?</p>'+
                        
                        '<form id="addTree" method="post" action="addTree.php">'+
                        '<div class="select-editable">'+
                                
                                '<select onchange="this.nextElementSibling.value=this.value" style="width: 100%;text-color:white;" >'+
                                        '<option value=""></option>';
                                        for (var i = 0; i < uniqueList.length; i++){ //Finds all unique tree species
                                                contentString+='<option value="'+uniqueList[i]['name']+'">'+uniqueList[i]['name']+'</option>';
                                        }
                                contentString+='</select>'+
                                '<input type="text" name="format" value=""/>'+

                                
                        '</div>'+
                        'lat: <input type="text" name="lat" value="'+event.latLng.lat()+'" size="15">'+
                        ' lng: <input type="text" name="lng" value="'+event.latLng.lng()+'" size="15"></br>'+
                        '<input type="submit" style="margin-top:5px;">'
                        '</form>'+
                        '</b></center></div>';
                        infowindow.setContent(contentString);
			infowindow.open(map,addTreeMarker);
                        //addTreeMarker.setMap(null);
        });

        //adding markers to tree from data
	for (var i = 0; i < data.length; i++) {
                //mappping each name to an array of ids
                if (data[i]['name'] in nameToIds)
                        nameToIds[data[i]['name']].push(data[i]['id']);
                else{
                        nameToIds[data[i]['name']] = [data[i]['id']];
                        //console.log(data[i]['name']); //prints names of new trees
                }
                //place a marker for each tree
                marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i]['lat'], data[i]['lon']),
			map: map });
                //adds click event from the marker to the tree's infowindow
                google.maps.event.addListener(marker, 'click', (function(marker,i,infowindow) {
		     return function() {
		        // content of infowindow
			var contentString = '<div id="content"><small>'+data[i]['id']+'</small>'+
			'<h2> '+data[i]['name'];
                                if(getTreeValue != 'none'){
/*                                         contentString +=' <a href="./'+
                                        '">&#9166;</a>'; */
                                }else{
                                        contentString +=' <small><a href="./?tree='+data[i]['name']+
                                        '" style="text-decoration:none;">&#128269;</a></small>';
                                }
                        
                        contentString +=''+
                        '</h2><p><i>'+ data[i]['tax']+'</i></p></div>'+
                        '<p><i>('+ data[i]['lat']+', '+data[i]['lon']+')</i></p>'+
                        '<center>'+
                        '<form id="removeTree" method="post" action="delTree.php">'+
                        '<input type="hidden" name="idDelete" value="'+data[i]['id']+'">'+
                        '<input type="submit" style="margin-top:5px;" value="DELETE">'+
                        '</center>';
                        infowindow.setContent(contentString);
			infowindow.open(map, marker);
		     }
		})(marker, i,infowindow));
                
              //maps the marker to its database id, default is to show
              idToMarker[data[i]['id']] = marker;  
	}
        map.setCenter(marker.getPosition());
        
        if(getTreeValue != 'none'){
                getTree(getTreeValue);
        }else{
                //postTree("Eastern Redbud");
        }
        //generates sidebar. (requires data maps)
        generateSidebar();
      }
      
/*  toggleSpeciesMarker(speciesName)
   toggles visibility of marker for speciesName
        speciesName - string : common name of tree 
*/
function toggleSpeciesMarker(speciesName){
        //console.log(speciesName);
        for (id in nameToIds[speciesName])
                idToMarker[nameToIds[speciesName][id]].setVisible(
                    !(idToMarker[nameToIds[speciesName][id]].getVisible()));
}

/*  speciesMarkerOff(speciesName)
   makes a markers for a species INVISIBLE
        speciesName - string : common name of tree 
*/
function speciesMarkerOff(speciesName){
        for (id in nameToIds[speciesName])
                idToMarker[nameToIds[speciesName][id]].setVisible(false);
}

/*  speciesMarkerOn(speciesName)
   makes a markers for a species VISIBLE
        speciesName - string : common name of tree 
*/
function speciesMarkerOn(speciesName){
        for (id in nameToIds[speciesName])
                idToMarker[nameToIds[speciesName][id]].setVisible(true);
}   
//toggles marker visibility and checkbox based on unique tree names
function toggleAllMarkers(){
        if (getTreeValue=='none'){
                for (tree in uniqueList){
                       toggleSpeciesMarker(uniqueList[tree]['name']);
                       document.getElementById(uniqueList[tree]['name']).checked = 
                            !(document.getElementById(uniqueList[tree]['name']).checked);
                }
        }else{
                //console.log("species menu");
                for (tree in uniqueList){
                       toggleSpeciesMarker(uniqueList[tree]['name']);
                }
        }
}

// results in only tree being visible on the map
//  tree - string : common name of tree
/*  */

//toggles marker visibility and checkbox based on unique tree names
function allMarkersOff(){
        for (tree in uniqueList){
               speciesMarkerOff(uniqueList[tree]['name']);
               document.getElementById(uniqueList[tree]['name']).checked = false;
        }
}

function allMarkersOn(){
        for (tree in uniqueList){
               speciesMarkerOn(uniqueList[tree]['name']);
               document.getElementById(uniqueList[tree]['name']).checked = true;
        }
}

function getTree(tree){
        //console.log(tree);
        toggleSpeciesMarker(tree);
        toggleAllMarkers();
        //document.getElementById(tree).checked = true;
}
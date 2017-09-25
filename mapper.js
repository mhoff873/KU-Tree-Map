//only 1 object for marker boxes so that when you click on a new one, the old one deletes	
var map; //map object
//var trees = []; //array of tree markers


var addTreeMarker;
function initMap() {
        var infowindow = new google.maps.InfoWindow;
        map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 19,
	  //center: new google.maps.LatLng(40.513348, -75.777088), //closest location
	  mapTypeId: 'satellite'
        });
	//good view of KU is at 40.513348, -75.777088
	google.maps.event.addListener(map, 'rightclick', function(event) {
                addTreeMarker = new google.maps.Marker({
                        position: event.latLng, 
                        map: map
                        });
		        // content of infowindow
			var contentString = '<div id="content">'+
                        '<b><center>'+event.latLng+'</b>'+
                        '</br><p>Add tree?</p>'+
                        
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
                        '<input type="hidden" name="lat" value="'+event.latLng.lat()+'">'+
                        '<input type="hidden" name="lng" value="'+event.latLng.lng()+'">'+
                        '<input type="submit" style="margin-top:5px;">'
                        '</form>'+
                        '</center></div>';
                        infowindow.setContent(contentString);
			infowindow.open(map,addTreeMarker);
                        //addTreeMarker.setMap(null);
        });
        
	for (var i = 0; i < data.length; i++) {
                //place a marker for each tree
                marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i]['lat'], data[i]['lon']),
			map: map });
                //trees.push(marker); //pushes the marker onto a stack  
                
                //adds click event from the marker to the infowindow
                google.maps.event.addListener(marker, 'click', (function(marker,i,infowindow) {
		     return function() {
		        // content of infowindow
			var contentString = '<div id="content"><small>'+i+'</small>'+
			'<h2> '+data[i]['name']+'</h2></p><i>'+ data[i]['tax']+'</i></p></div>'+
                        '<center>'+
                        '<form id="removeTree" method="post" action="delTree.php">'+
                        '<input type="hidden" name="idDelete" value="'+data[i]['id']+'">'+
                        '<input type="submit" style="margin-top:5px;" value="DELETE">'+
                       // '</form>'+
                       //// '<form id="editTree" method="post" action="editTree.php">'+
                       // '<input type="hidden" name="editId" value="'+data[i]['id']+'">'+
                       // '<input type="submit" style="margin-top:5px;" value="EDIT">'+
                       // '</form>'+
                        '</center>';
                        infowindow.setContent(contentString);
			infowindow.open(map, marker);
		     }
		})(marker, i,infowindow));
                
	}
        map.setCenter(marker.getPosition());
      }
      








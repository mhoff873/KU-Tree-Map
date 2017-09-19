var map; //map object

//map initialization function
//sets up map view
//marks the tree locatiosn
function initMap() {
      	var infowindow = new google.maps.InfoWindow;
        map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 15,
	  center: new google.maps.LatLng(40.513348, -75.777088), //should be set to client's closest location
	  mapTypeId: google.maps.MapTypeId.ROADMAP
        });
	//good view of KU is at 40.513348, -75.777088
	
	//only 1 object for marker boxes so that when you click on a new one, the old one deletes
	var marker;
        //loop through all the trees
	for (var i = 0; i < data.length; i++) {
                //place a marker for each tree
                marker = new google.maps.Marker({
			position: new google.maps.LatLng(data[i]['lat'], data[i]['lon']),
			map: map });
                //adds click event from the marker to the infowindow
                google.maps.event.addListener(marker, 'click', (function(marker,i,infowindow) {
		     return function() {
		        // content of infowindow
			var contentString = '<div id="content">'+
			'<h2>'+data[i]['name']+'</h2></p><i>'+ data[i]['tax']+'</i></p></div>';
                        infowindow.setContent(contentString);
			infowindow.open(map, marker);
		     }
		})(marker, i,infowindow));
	}

      }

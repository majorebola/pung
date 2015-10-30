var map;
var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.05, lng: 7.65},
		zoom: 14
	});

	var markers = [];
	for(var i=0; i<100; i++) {
		var lat = 45.03 + (Math.random()/100);
		var lng = 7.63 + (Math.random()/100);
		var marker = new google.maps.Marker({
			position: {
				lat: lat,
				lng: lng
			},
 			title: "marker " + i,
 			map: map
		});
		marker.addListener('click', function(marker) {
			clickedMarker(marker)
		});
		markers[i] = marker;

	}


	var path = new google.maps.MVCArray();

	var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
	var service = new google.maps.DirectionsService();
	
	var poly = new google.maps.Polyline  ({
		strokeColor: '#4986E7',
		strokeWeight: 3,
		map: map
	});

/* 
	//  ROUTE DRAWER
	var nest = function(index) {
		console.log("Nested: ", index);
			if(index + 1 <markers.length) {
				var src = markers[index].position;
				var des = markers[index+1].position;
				setTimeout(function() {
					service.route({
						origin: src,
						destination: des,
						travelMode: google.maps.DirectionsTravelMode.WALKING
					}, function(result, status) {
						console.log(status);
						if (status == google.maps.DirectionsStatus.OK) {
							for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
								path.push(result.routes[0].overview_path[i]);
							}
						}
						nest(index+1);
					});
				}, 100);
		}
	};
	nest(0);
	poly.setPath(path);
*/


	var mcOptions = {gridSize: 50, maxZoom: 15};
	var mc = new MarkerClusterer(map, markers, mcOptions);
};

var clickedMarker = function(marker) {
	console.log("clickedMarker");
	console.log(marker);
}
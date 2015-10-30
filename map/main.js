'use strict'
const GENERATOR_TIMER = 1000;
var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.05, lng: 7.65},
		zoom: 14
	});

	// demo
	fillMarkers();

	begin();	
};

var begin = function() {
	console.log('The experiment just begun');

	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsService = new google.maps.DirectionsService;
	path = new google.maps.MVCArray();
	secondPath = new google.maps.MVCArray();
	poly = new google.maps.Polyline({
		strokeColor: '#43DE43',
		strokeWeight: 3,
		map: map
	});
	index = 1;
	interval = window.setInterval(function() {
		routeGenerator(index)
	}, GENERATOR_TIMER);
	var timing = ((data.length-1)*GENERATOR_TIMER)/100;
	var progressBar = document.getElementById('progress-bar');
	intervalProgressBar = window.setInterval(function() {
		updateProgressBar(progressBar);
	}, timing)
};

var intervalProgressBar;
var percentageBar = 0;
var updateProgressBar = function(progressBar) {
	percentageBar++;
	progressBar.style.width = percentageBar + "%";
	if(percentageBar>=100) {
		window.clearInterval(intervalProgressBar);
	}
};

var routeGenerator = function() {
	if(index < data.length) {
		var src = data[index-1].position;
		var des = data[index].position;

		directionsService.route({
			origin: src,
			destination: des,
			travelMode: google.maps.DirectionsTravelMode.WALKING
		}, function(result, status) {
			console.log(index + " | " + status);
			if (status == google.maps.DirectionsStatus.OK) {
				for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
					path.push(result.routes[0].overview_path[i]);
				}
			}
		});/*
		poly.setPath(path);
		poly.setMap(map);
*/
		index++;
	} else {
		window.clearInterval(interval);
		document.getElementById('overlay').style.display = 'none';
		secondIndex = 0;
		secondInterval = window.setInterval(function() {
			showRoute();
		}, 50);
	}
};
var showRoute = function() {
	if(secondIndex < path.j.length) {
		console.log(secondIndex);
		secondPath.push(path.j[secondIndex]);
		poly.setPath(secondPath);
		poly.setMap(map);
		map.setCenter({'lat': path.j[secondIndex].lat(), 'lng': path.j[secondIndex].lng()});
		secondIndex++;
	} else {
		window.clearInterval(secondInterval);
	}
}

// services, renderer, map, line
var map = {};
var directionsDisplay;
var directionsService;
var path;
var poly;
var interval;
var index;
var secondInterval;
var secondPath;
var secondIndex;

var fillMarkers = function() {
	for(var i=0; i<10; i++) {
		var lat = 45.03 + (Math.random()/10);
		var lng = 7.63 + (Math.random()/10);
		data[i] = {
			'name': i,
			'position': {
				'lat': lat,
				'lng': lng
			}
		}
	}

}

var data = [];

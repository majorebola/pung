'use strict';
const GENERATOR_TIMER = 1000;
var initMap = function() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 45.05, lng: 7.65},
		zoom: 11
	});
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
	var progressText = document.getElementById('progress-text');
	intervalProgressBar = window.setInterval(function() {
		updateProgressBar(progressBar, progressText);
	}, timing)
};

var intervalProgressBar;
var percentageBar = 0;
var destinationInProgress;
var updateProgressBar = function(progressBar, progressText) {
	percentageBar++;
	progressBar.style.width = percentageBar + "%";
	progressText.innerHTML = "Loading points for " + destinationInProgress;
	if(percentageBar>=100) {
		window.clearInterval(intervalProgressBar);
	}
};

var routeGenerator = function() {
	if(index < data.length) {
		var src = data[index-1].position;
		var des = data[index].position;
		destinationInProgress = data[index].name;

		directionsService.route({
			origin: src,
			destination: des,
			travelMode: google.maps.DirectionsTravelMode.DRIVING
		}, function(result, status) {
			console.log(index + " | " + status);
			if (status == google.maps.DirectionsStatus.OK) {
				for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
					path.push(result.routes[0].overview_path[i]);
				}
			}
		});

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
};

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

var data = [
	{
		name: 'Home',
		position: {
			lat: 45.063545,
			lng: 7.525935
		}
	},
	{
		name: 'Vienna',
		position: {
			lat: 48.214481,
			lng: 16.384437
		}
	},
	{
		name: 'Bratislava',
		position: {
			lat: 48.144734,
			lng: 17.107126
		}
	},
	{
		name: 'Wroklaw',
		position: {
			lat: 51.158320,
			lng: 17.042323
		}
	},
	{
		name: 'Varsavia',
		position: {
			lat: 52.265320,
			lng: 21.011520
		}
	},
	{
		name: 'Minsk',
		position: {
			lat: 53.935306,
			lng: 27.547690
		}
	},
	{
		name: 'Mosca',
		position: {
			lat: 55.789778,
			lng: 37.634651
		}
	},
	{
		name: 'Nizni Nogvorod',
		position: {
			lat: 56.296497,
			lng: 43.935995
		}
	},
	{
		name: 'Kazan',
		position: {
			lat: 55.822860,
			lng: 49.080882
		}
	},
	{
		name: 'Ufa',
		position: {
			lat: 54.738829,
			lng: 55.982417
		}
	},
	{
		name: 'Troick',
		position: {
			lat: 54.072683,
			lng: 61.561204
		}
	},
	{
		name: 'Auliekol',
		position: {
			lat: 52.327873,
			lng: 64.141125
		}
	},
	{
		name: 'Astana',
		position: {
			lat: 51.157760,
			lng: 71.460197
		}
	},
	{
		name: 'Biskek',
		position: {
			lat: 42.977227,
			lng: 74.413813
		}
	},
	{
		name: 'Shoughnon',
		position: {
			lat: 37.521558,
			lng: 71.672448
		}
	},
	{
		name: 'Dushanbe',
		position: {
			lat: 38.569677,
			lng: 68.824024
		}
	},
	{
		name: 'Samarcanda',
		position: {
			lat: 39.661543,
			lng: 66.968919
		}
	},
	{
		name: 'Assgabat',
		position: {
			lat: 37.981627,
			lng: 58.353477
		}
	},
	{
		name: 'Tehran',
		position: {
			lat: 35.787646,
			lng: 51.279906
		}
	},
	{
		name: 'Ankara',
		position: {
			lat: 40.009000,
			lng: 32.883241
		}
	},
	{
		name: 'Istanbul',
		position: {
			lat: 41.0054958,
			lng: 28.8720967
		}
	},
	{
		name: 'Home Again',
		position: {
			lat: 45.063545,
			lng: 7.525935
		}
	}
];

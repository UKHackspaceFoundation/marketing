var data = [];
var map, infowindow;
var mapReady = false;
var markerLayer;

function statusCode(a) {
	return (a.status == 'Suspended' || a.status == 'Defunct') ? 1 : 0;
}

function initMap() {

	map = L.map( 'map', {
		zoomControl: false,
		scrollWheelZoom: false
	} ).setView( [ 55.25, -4.5 ], 8 );

	L.tileLayer(
		'https://api.mapbox.com/styles/v1/unknowndomain/cjsfbqilz04kw1fs0vm7q8hw2/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidW5rbm93bmRvbWFpbiIsImEiOiJOMUxIcm1RIn0.801sde-cFjqY2gtBTHm-zA', {
			tileSize: 256,
			zoomOffset: 0
		}).addTo(map);

	mapReady = true;
}

function initMarkers() {
	if (!mapReady) {
		setTimeout(initMarkers, 100);
		return;
	}

	var i;
	var s = 1.25;

	var icon = L.icon({
		iconUrl: '/img/marker.png',
		shadowUrl: '/img/shadow.png',
		iconSize: [26*s, 28*s],
		iconAnchor: [13*s, 25*s],
		shadowSize: [26*s, 28*s],
		shadowAnchor: [13*s, 25*s]
	});
	var markers = [];

	for (i = 0; i < data.length; i++) {
		if (statusCode(data[i]) == 0) {
			var m = L.marker([data[i].lat, data[i].lng], {
				icon: icon,
				title: data[i].name
			});
			markers.push(m);
		}
	}

	markerLayer = L.layerGroup(markers).addTo(map);
}

// fetch data
$.getJSON("./spaces.json", function(json) {
	data = json.spaces;
	initMarkers();
});

// init map
initMap();

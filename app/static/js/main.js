// var layer = L.mapbox.tileLayer('examples.map-i86nkdio');
L.mapbox.accessToken = 'pk.eyJ1IjoiZ2FyYnJheSIsImEiOiJZR19jdjhvIn0.0FrDsXALakLd_kzSDXsGBg';
// Create a map in the div #map
var map = L.mapbox.map('map', 'garbray.ke8hclf1'),
    listings = document.getElementById('listings'),
    locations = L.mapbox.featureLayer().addTo(map);

locations.loadURL('/static/js/places.js'); // load in your own GeoJSON file here

function setActive(el) {
  var siblings = listings.getElementsByTagName('div');
  for (var i = 0; i < siblings.length; i++) {
    siblings[i].className = siblings[i].className
      .replace(/active/, '').replace(/\s\s*$/, '');
  }

  el.className += ' active';
}

locations.on('ready', function() {
  locations.eachLayer(function(locale) {

    // Shorten locale.feature.properties to just `prop` so we're not
    // writing this long form over and over again.
    var prop = locale.feature.properties;

    // Each marker on the map.
    var popup = '<h3>Bryan Places</h3><div>' + prop.address;

    var listing = listings.appendChild(document.createElement('div'));
        listing.className = 'item';

    var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';

    link.innerHTML = prop.address;
    if (prop.crossStreet) {
      link.innerHTML += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
      popup += '<br /><small class="quiet">' + prop.crossStreet + '</small>';
    }

    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += ' &middot; ' + prop.phoneFormatted;
    }

    link.onclick = function() {
      setActive(listing);

      // When a menu item is clicked, animate the map to center
      // its associated locale and open its popup.
      map.setView(locale.getLatLng(), 16);
      locale.openPopup();
      return false;
    };

    // Marker interaction
    locale.on('click', function(e) {
        // 1. center the map on the selected marker.
        map.panTo(locale.getLatLng());

        // 2. Set active the markers associated listing.
        setActive(listing);
    });

    popup += '</div>';
    locale.bindPopup(popup);
  });
});

// custom icons
// locations.on('layeradd', function(e) {
//   var marker = e.layer;
//   marker.setIcon(L.icon({
//     iconUrl: 'custom icons', // load your own custom marker image here
//     iconSize: [56, 56],
//     iconAnchor: [28, 28],
//     popupAnchor: [0, -34]
//   }));
// });
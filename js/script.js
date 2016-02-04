// Masking the required fields
$('[name=birth_date]').mask('00.00.0000');
$('[name=phone]').mask('+38 000 000 00 00');

(function() {
  var form = document.forms['dod_form'];
  var selectWhere = form['where'];
  var customFieldContainer = document.getElementById('customFieldContainer');
  var submit = document.getElementById('send_form');
  var successMsg = document.getElementById('successMsg');

  // Toggling the custom input field
  selectWhere.addEventListener('change', function() {
    if (where.options['myVariant'].selected) {
      customFieldContainer.classList.remove('hidden');
    } else {
      customFieldContainer.classList.add('hidden');
    }
  });

  // Sending via xhr
  if (!('FormData' in window)) {
    return;
  }

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    if (form.checkValidity() == true && !submit.classList.contains('disabled')) {
      var data = new FormData(form);
      var xhr = new XMLHttpRequest();

      xhr.open('POST', '/forms/dod');

      xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        form.classList.add('hidden');
        }
      });

      xhr.send(data);
      successMsg.classList.remove('hidden');
    }
  });
})();

// Google map
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.452, lng: 30.516},
    disableDefaultUI: true,
    zoom: 12,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var icons = {
    goloseevo: '../img/icons/single/map/Goloseevo.png',
    lukyanovka: '../img/icons/single/map/Lukyanovka.png',
    obolon: '../img/icons/single/map/Obolon.png',
    osokorki: '../img/icons/single/map/Osokorki.png',
    pechersk: '../img/icons/single/map/Pechersk.png'
  }

  /* Map Icons */
  var goloseevo = new google.maps.Marker({
    position: {lat: 50.392, lng: 30.465},
    map: map,
    icon: icons.goloseevo
  });

  var lukyanovka = new google.maps.Marker({
    position: {lat: 50.456, lng: 30.479},
    map: map,
    icon: icons.lukyanovka
  });

  var obolon = new google.maps.Marker({
    position: {lat: 50.499, lng: 30.475},
    map: map,
    icon: icons.obolon
  });

  var osokorki = new google.maps.Marker({
    position: {lat: 50.407, lng: 30.590},
    map: map,
    icon: icons.osokorki
  });

  var pechersk = new google.maps.Marker({
    position: {lat: 50.422, lng: 30.530},
    map: map,
    icon: icons.pechersk
  });

  /* Map Styles */
  var styles = [
  {
    stylers: [
      { hue: "#cbe4f3" },
      { saturation: 15 },
      { lightness: 10 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "transit.station",
    stylers: [
      { visibility: "off" },
    ]
  },{
    featureType: "poi",
    stylers: [
      { visibility: "off" },
    ]
  },{
    featureType: "water",
    stylers: [
      { hue: "#9fb8c7" },
      { saturation: -75 },
      { lightness: -25 },
      { gamma: 1.51 }
    ]
  }
  ];

  map.setOptions({styles: styles});
}

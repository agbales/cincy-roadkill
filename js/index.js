var animalTally = {};
var map;

function initMap() {
  var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#1E824C'},
          {visibility: 'simplified'},
          {gamma: 0.2},
          {weight: .3},
          {saturation: '10'},
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        stylers: [{color: '#446CB3'}]
      }
    ], {
      name: 'Flat Color'
  });

  var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.116, lng: -84.512},
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
    },
    zoom: 14
  });

  map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);

  $.getJSON("https://data.cincinnati-oh.gov/resource/wdw5-d4i2.json", function(json) {  
    $.each(json, function(key, data) {

      var latLng = new google.maps.LatLng(data.latitude, data.longitude);

      // Search description for common animals
      var animal = data.description.toLowerCase().match(/deer\s|squirell\s|cat\s|kitty\s|dog\s|doggy\s|bird\s|duck\s|raccoon\s/g);
      var ico = './icons/footprint-01.png';

      // Time
      var time = data.requested_datetime;
      var year = time.substr(0,4);
      var month = time.substr(5,2);
      var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      if (month.charAt(0) == '0') {
        month = month.substr(1);
      }
      month = m[month];
      var day = time.substr(8,2);
      var hour = time.substr(12,4);

      if (animal !== null) {
        switch(animal[0].slice(0,-1)) {
          case "deer":
            animalTally.deer = animalTally.deer || 0;
            animalTally.deer++;
            ico = './icons/deer-01.png';
            break;
          case "squirell":
            animalTally.squirell = animalTally.squirell || 0;
            animalTally.squirell++;
            ico = './icons/squirell-01.png';
            break;
          case "kitty":
          case "cat":
            animalTally.cat = animalTally.cat || 0;
            animalTally.cat++;
            ico = './icons/cat-01.png';
            break;
          case "dog":
          case "doggy":
            animalTally.dog = animalTally.dog || 0;
            animalTally.dog++;
            ico = './icons/dog-01.png';
            break;
          case "bird":
            animalTally.bird = animalTally.bird || 0;
            animalTally.bird++;
            ico = './icons/bird-01.png';
            break;
          case "duck":
            animalTally.duck = animalTally.duck || 0;
            animalTally.duck++;
            ico = './icons/duck-01.png';
            break;
          case "raccoon":
            animalTally.raccoon = animalTally.raccoon || 0;
            animalTally.raccoon++;
            ico = './icons/raccoon-01.png';
            break;
          default:
            animalTally.general = animalTally.general || 0;
            animalTally.general++;
            ico = './icons/footprint-01.png';
        }
      } else {
            animalTally.general = animalTally.general || 0;
            animalTally.general++;
      }

      var marker = new google.maps.Marker({
        position: latLng,
        icon: ico,
        map: map
      });

      var infoWindow = new google.maps.InfoWindow({
        content: data.description + '<p>' + month + ' ' + day + ', ' + year + ' @ ' + hour + '</p>'
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
      });

    });
  });
}

function animalIconHover(animal) {
  var a = animal.charAt(0).toUpperCase() + animal.substr(1);
  var stat = document.getElementById('animal-stat');
  stat.style.visibility = 'visible';
  stat.style.color = '#f5f5f5'
  stat.style.transform = 'translate(0px, -60px)'
  stat.innerHTML = a + ': ' + animalTally[animal];
}

function hideStatBar() {
  var stat = document.getElementById('animal-stat');
  stat.style.visibility = 'hidden';
  stat.style.transform = 'translate(0px, 0px)'
  stat.style.color = '#1a1a1a'
  stat.innerHTML = '';
}
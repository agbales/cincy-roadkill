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
      var animal = data.description.toLowerCase().match(/deer|squirell|cat|kitty|dog|doggy|bird|duck|bees|hive|raccoon/g);
      var ico = './icons/footprint-01.png';
      
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
        switch(animal[0]) {
          case "deer":
            ico = './icons/deer-01.png';
            break;
          case "squirell":
            ico = './icons/squirell-01.png';
            break;
          case "kitty":
          case "cat":
            ico = './icons/cat-01.png';
            break;
          case "dog":
          case "doggy":
            ico = './icons/dog-01.png';
            break;
          case "bird":
            ico = './icons/bird.png';
            break;
          case "duck":
            ico = './icons/duck-01.png';
            break;
          case "bees":
          case "hive":
            ico = './icons/hive.png';
            break;
          case "raccoon":
            ico = './icons/raccoon-01.png';
            break;
          default:
              ico = './icons/footprint-01.png';
        }
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
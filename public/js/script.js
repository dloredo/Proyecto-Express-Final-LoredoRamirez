function iniciarMap(){
    var coord = {lat:19.2491861 ,lng: -103.6973778};
    var map = new google.maps.Map(document.getElementById('mapa_api'),{
      zoom: 20,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}
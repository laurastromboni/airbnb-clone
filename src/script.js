<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAKChe2j9C1j-Bz2lzlNEx5TRnHEhyHRhQ&libraries=places"></script>

// /* <script src="/socket.io/socket.io.js"></script>
// <script>var socket = io()</script> */

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('IronGenerator JS imported successfully!');
//   }, false);
  
//     // Lie le champs adresse en champs autocomplete afin que l'API puisse afficher les propositions d'adresses
//     function initializeAutocomplete(id) {
//       var element = document.getElementById(id);
//       if (element) {
//        var autocomplete = new google.maps.places.Autocomplete(element, { types: ['geocode'] });
//        google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
//       }
//     }
  
//     var defaultBounds = new google.maps.LatLngBounds(
//       new google.maps.LatLng(48.856614, 2.3522219000000177),
//       new google.maps.LatLng(51.5073509, -0.12775829999998223));
    
//     var input = document.getElementById('searchTextField');
//     var options = {
//       bounds: defaultBounds,
//     };
    
//     autocomplete = new google.maps.places.Autocomplete(input, options);
   
//     // Injecte les données dans les champs du formulaire lorsqu'une adresse est sélectionnée
//     function onPlaceChanged() {
//       var place = this.getPlace();
   
//       for (var i in place.address_components) {
//         var component = place.address_components[i];
//         for (var j in component.types) {  
//           var type_element = document.getElementById(component.types[j]);
//           if (type_element) {
//             type_element.value = component.long_name;
//           }
//         }
//       }
//     }
   
//     // Initialisation du champs autocomplete
//     google.maps.event.addDomListener(window, 'load', function() {
//       initializeAutocomplete('user_input_autocomplete_address');
//     });
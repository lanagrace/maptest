document.addEventListener('DOMContentLoaded', ()=>{
    var map = L.map('map').setView([50.37566179067675, -4.139420986175538], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2tvanVhOWU3MGFiazJ3cWt2YjV5am53OSJ9.99cYacURj_XngBppBaIhmw'
        }).addTo(map);

        getPins();

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);

        var addLocModal = document.querySelector('#addLocModal');
        var instance = M.Modal.getInstance(addLocModal);


        map.on('click', clickedMap);

        var latField = document.querySelector('#lat');
        var lngField = document.querySelector('#lng');
        var w3wField = document.querySelector('#w3w');

        function clickedMap(event){
            instance.open();

            latField.value = event.latlng.lat;
            lngField.value = event.latlng.lng;
            
            fetch(`https://api.what3words.com/v3/convert-to-3wa?coordinates=${event.latlng.lat}%2C${event.latlng.lng}&key=5ORH9E8Z`)
            .then((response) => {
                return response.json();
            })
            .then((myJson)=>{
                w3wField.value = myJson.words;
            })

            console.log(event.latlng)
        }

        function getPins(){
            fetch('/getLocations')
            .then(res => res.json())
            .then((data) => {
                let dataFeed = data.map((pin) => {
                    var marker = L.marker([pin.lat, pin.lng]).addTo(map);
                    marker.bindPopup(`
                    <h3>${pin.name}</h3>
                    <p>What 3 words Ref: ${pin.w3w}</p>
                    <p>${pin.note}</p>
                    `)
                })
            })
        }
});


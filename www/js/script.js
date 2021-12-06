document.addEventListener('DOMContentLoaded', ()=>{
    var map = L.map('map').setView([50.3179372480405, -4.159926715660778], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 24,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoibHBlcmljaWMiLCJhIjoiY2t3dXdhdm9nMXI4djJvcnQ0dGcxZWdlOCJ9.V1dldbw1cZwjui6JErxfZw'
        }).addTo(map);

        var marker = L.marker([50.371985264622715, -4.149493215372787]).addTo(map);
        var marker = L.marker([50.377114394676646, -4.141468046000228]).addTo(map);
        var marker = L.marker([50.375017920446965, -4.139468194625807]).addTo(map);
        var marker = L.marker([50.37182103385094, -4.174512861063705]).addTo(map);
        var marker = L.marker([50.38424608636065, -4.105247505940497]).addTo(map);
        var marker = L.marker([50.36294088192618, -4.09566879272461]).addTo(map);
        var marker = L.marker([50.38766103029909, -4.1665306070353845]).addTo(map);
        var marker = L.marker([50.36272186653412, -4.1612777626141915]).addTo(map);
        var marker = L.marker([50.412018243343766, -4.119907381245867]).addTo(map);
        var marker = L.marker([50.40219370493006, -4.138000484090299]).addTo(map);



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


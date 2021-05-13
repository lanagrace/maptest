var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Locations = require('./models/Locations')

var port = 3000;
var dbURL = 'mongodb://localhost:27017/maptest';

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(express.static('www'));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.post('/addLocation', (req,res) => {
    //const lat = req.body.lat;
    const {lng, lat, w3w, name, note} = req.body;
    var location = new Locations({
        lng,
        lat, 
        w3w,
        name,
        note
    }) 
    location.save();
    res.redirect('/');
});

app.get('/getLocations', (req,res) =>{
    Locations.find({}, (err, docs) =>{
    if (err) throw err;
    res.send(docs);
    });
});

mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log(err.message);
});

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`)
} );
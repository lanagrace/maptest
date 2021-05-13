const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var LocationsSchema = new Schema({
    lat: String,
    lng: String,
    w3w: String,
    name: String,
    note: String,
    
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = Locations = mongoose.model('Locations', LocationsSchema);
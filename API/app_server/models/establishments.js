
var mongoose = require( 'mongoose' );

var establishmentSchema = new mongoose.Schema({
    name: String,
    desc: String,
    tags: [String],
    priceRange: Number,
    coords: {type: [Number], index: '2dsphere'},
    image: {type: String, default: null}
});

mongoose.model('Establishment', establishmentSchema);

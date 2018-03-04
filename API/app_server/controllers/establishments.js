/*var mongoose = require('mongoose');
var Establishment = mongoose.model('Establishment')
*/
var sendJsonResponse = function(res,status,content) {
    res.status(status);
    res.json(content);
}
module.exports.getAll = function(req,res) {
}

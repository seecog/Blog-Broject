var mongoose = require('mongoose');
var categorieSchema = new mongoose.Schema({
	name : {
		type : String,
		trim : true,
		required : true
	},
	label : {
		type : String,
		required : true
	}
})

module.exports = mongoose.model("Categorie",categorieSchema);
var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
	title : {
		type : String,
		trim : true,
		required : true
	},
	cost : {
		type : Number,
		required : true
	},
	category : {
		type : String,
		trim : true,
		required : true
	},
	url : {
		type : String,
		trim : true,
		required : true
	}
})

module.exports = mongoose.model("Product",productSchema);
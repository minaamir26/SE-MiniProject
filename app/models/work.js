var mongoose = require('mongoose');

var workSchema = mongoose.Schema({
	title:String,
	URL:String,
	image:String,
	isURL:Boolean
})

var work = mongoose.model('work' , workSchema);

module.exports = work;
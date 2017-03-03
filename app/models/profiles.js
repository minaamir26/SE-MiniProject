var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gucid:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    },
    works:[{title:String , URL:String , image:String , isURL:Boolean} ],
    image: String
})

var profile = mongoose.model('profiles', projectSchema);

module.exports = profile;


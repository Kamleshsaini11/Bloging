const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    descreption :{
        type : String,
        minlength : 10
    },
    markdown :{
        type : String
    },
    cretedAt :{
        type : Date,
        required : true,
        default : Date.now
    }
})

const articledb = mongoose.model('articledb',articleSchema)

module.exports = articledb
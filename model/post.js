const mongoose = require('mongoose')
//title,description,link,date,image
const Table = mongoose.Schema({
    title : {
        type : String,
        require: true
    },
    description :  {
        type : String,
        require: true
    },
    link :  {
        type : String,
        require: true
    },
    image:  {
        type : String,
        require: true
    },
    date :  {
        type : Date,
        require: true
    },
})

module.exports = mongoose.model('Posts' ,Table);
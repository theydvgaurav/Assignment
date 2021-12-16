const mongoose = require('mongoose')

const reporttemplate = new mongoose.Schema({
    cmdtyName: {
        type: String,
        required: true
    },
    cmdtyID: {
        type: String,
        required: true
    },
    marketID: {
        type: String,
        required: true
    },
    marketName: {
        type: String,
        required: true
    },
    users: [{
        type: String,
        required: true
    }],
    timestamp :{
        type : Date,
        required : true
    },
    priceUnit: {
        type: String,
        required: true
    },
    minPrice: {
        type: Number,
        required: true
    },
    maxPrice: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('reports', reporttemplate)
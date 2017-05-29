'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Feed = require('./feed')
const Schema = mongoose.Schema;
mongoose.plugin(uniqueValidator);

mongoose.Promise = require('bluebird');

const reference = new Schema({ 
    name:{type:String},
    sourceUrl: {type:String,unique:true}, 
    detail: String,
    imageUrl: String,
    createdAt: Date,
    type: String,
    headline: String,
    feedReference: {type:Schema.Types.ObjectId,ref: Feed},
    externalLinks: String
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Reference',reference);
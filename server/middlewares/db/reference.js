'use strict'

const Reference = require('../../models/reference');
const Promise = require('bluebird');

exports.saveReference = function (reference,done){
  var newReference = new Reference(reference);
   return new Promise(function(resolve, reject){
     // save the user
    newReference.save().then(function(data){
        resolve(data)},
        function(error){
            reject(error)
    });
  });
}

// exports.getAllFeeds = function(){
//   return new Promise(function(resolve,reject){
//     Feed.find().then(function(data){
//       resolve(data)
//     },
//       function(error){
//         reject(error)
//       });
//   });
// }

// exports.getUserByEmail = function(email){
//   return new Promise(function(resolve,reject){
//     User.findOne({email:email}).then(function(data){
//       resolve(data)
//     },
//       function(error){
//         reject(error)
//       });
//   });
// }

// exports.getFeedByUser = function(id){
//   return new Promise(function(resolve,reject){
//     User.find({creator:id}).then(function(data){
//       resolve(data);
//     },
//       function(error){
//         reject(error)
//       });
//   });
// }

'use strict'

const Feed = require('../models/feed');
const Promise = require('bluebird');

exports.saveFeed = function (feed,done){
  var newFeed = new Feed(feed);
   return new Promise(function(resolve, reject){
     // save the user
    newFeed.save().then(function(data){
        resolve(data)},
        function(error){
            reject(error)
    });
  });
}

exports.getAllFeeds = function(){
  return new Promise(function(resolve,reject){
    Feed.find().then(function(data){
      resolve(data)
    },
      function(error){
        reject(error)
      });
  });
}

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

exports.getFeedByUser = function(id){
  return new Promise(function(resolve,reject){
    User.find({creator:id}).then(function(data){
      resolve(data);
    },
      function(error){
        reject(error)
      });
  });
}

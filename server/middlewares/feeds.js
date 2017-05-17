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

exports.getFeedById = function(id){

  return new Promise(function(resolve,reject){
    Feed.findOne({_id:id}).then(function(data){
      resolve(data)
    },
      function(error){
        reject(error)
      });
  });
}

exports.getSingleFeedByUserId = function(feedId,userId){
  return new Promise((resolve,reject) => {
    Feed.findOne({_id:feedId,creator:userId}).then((data) => {
      resolve(data);
    },
    (err) => {
      reject(err);
    })
  })
}
exports.getFeedByUser = function(id){
  return new Promise(function(resolve,reject){
    Feed.find({creator:id}).then(function(data){
      resolve(data);
    },
      function(error){
        reject(error)
      });
  });
}

exports.updateFeed = function(existedFeed,alert){
  var editedFeed = new Feed({name:alert.name, 
    optionalKeywords: alert.optionalKeywords,
    requiredKeywords: alert.requiredKeywords,
    excludedKeywords: alert.excludedKeywords,
    creator:existedFeed.creator,
    _id:existedFeed._id
  });
  return new Promise((resolve,reject) => {
      Feed.findByIdAndUpdate({_id:existedFeed._id},editedFeed).then((data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
      })
  })
}

exports.deleteFeedById = function(id){
  return new Promise((resolve,reject) => {
    Feed.remove({_id:id}).then((data) => {
      resolve(data);
    },
    (err) => {
      reject(err);
    })
  })
}

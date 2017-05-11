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
// .skip((dataLimit-1)*10).limit(10)
exports.getAllReference = function(dataLimit,id){
  return new Promise(function(resolve,reject){
    Reference.find({feedReference:id}).sort({"createdAt":-1}).then(function(data){
      // console.log("Limit:"+data.length);
      resolve(data)
    },
      function(error){
        reject(error)
      });
  });
}

exports.deleteReferenceById = function(id){
  return new Promise((resolve,reject) => {
    Reference.remove({_id:id}).then((data) =>{
      resolve(data);
    },
    (err) => {
      reject(err);
    })
  })
}

exports.deleteReferenceByFeedId = function(id){
  return new Promise((resolve,reject) => {
    Reference.remove({feedReference:id}).then((data) => {
      resolve(data);
  },
  (err) => {
    reject(err);
  })
  })
}

exports.isNewsExist = function(news){
  return new Promise((resolve,reject) => {
    Reference.find({sourceUrl:news.sourceUrl}).then((data) => {
      let exist = data && data.length > 0 ? true : false;
      resolve(exist);
    },
    (err) => {
      reject(err);
    })
  })
}

const USER = require('../middlewares/users');
var SCRAPPER = require('./newsScrapper');
const EXP = require('../middlewares/expression');
const ALERTS = require('../middlewares/feeds');
const async = require("async");
const PURPOSE = "latestUpdates";

exports.liveNews = function(){
  getUsers().then((users) => {
            async.each(users, function(user,callback){
                getAlerts(user._id).then((alerts) => {
                  async.each(alerts,function (alert,callback1){
                    let exp = EXP.getExpression(alert);
                    Promise.all([  
                      SCRAPPER.getTwitterNews(exp,alert._id,PURPOSE),
                      SCRAPPER.getGoogleNews(exp,alert._id,PURPOSE)
                    ])
                    .then((data) => {console.log(data);})
                    .catch((err) => console.log(err))
                  },function(err){
                    console.log("alert completed.");
                    //callback();
                  })
                }).catch((err)=>{
                    console.log("user error:"+err);
                })
            } ,function(err){
              console.log("OuterLoopFinished");
              console.log('Process Finished');
            });
  },
  (err) => {
    console.log("Error in outer news:"+err);
  });
  
}

function getUsers(){
  return new Promise((resolve,reject) => {
    let users;
    USER.getAllUsers().then((data) => {
      users = (data && data.length > 0) ? data : null;
      if(users == null){
        reject();
      }
      else{
        resolve(users);
      }
    },
    (err) => {
      console.log("Error in getUsers:"+err);
      reject(err);
    });
  })
}

function getAlerts(id){
  return new Promise((resolve,reject)=>{
    ALERTS.getFeedByUser(id).then((data) => {
      resolve(data);
    },
    (err) => {
      console.log("Error in getAlerts:"+err);
    })
  })
}
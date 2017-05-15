var request = require('request');
var cheerio = require('cheerio');
var reference = require('../middlewares/db/reference');
const async = require("async");
const Promise = require('bluebird')

function getRealTime(time){
    const seconds = 60;
    var dt = new Date();
    var smh = parseInt(time[0]);
    try{
        if(time[1] == "hours" || time[1] == "hour"){
            return new Date();
        }
        else if(time[1] == "seconds" || time[1] == "second"){
            var currentSec = dt.getSeconds();
            var nd = smh<currentSec ? dt.setSeconds(currentSec-smh):dt.setSeconds(seconds-(smh-currentSec)).setMinutes(dt.getMinutes-1);
            return new Date(nd);
        }
        else if(time[1] == "minutes" || time[1] == "minute"){
            var currentMin=dt.getMinutes();
            // console.log("news "+time[1]+" minute ago");
            if(parseInt(time[0]) < currentMin){
                // var cdate = new Date().setMinutes(min-parseInt(time[1]));
                // console.log("new:"+new Date(dt.setMinutes(currentMin-parseInt(time[1]))));
                return new Date(dt.setMinutes(currentMin-parseInt(time[0])));
            }
            else{
                // console.log("today:"+time[2]);
                dt.setMinutes(seconds - (parseInt(time[0]) - currentMin));
                dt.setHours(dt.getHours()-1);
                return new Date(dt);
            }
        }
        else {
            var time = new Date(time);
            return time;
        }
    }catch(err){
        console.log("Error:"+err);
    }
    

}

exports.getGoogleNews = function (searchKeyword,id,purpose){
    return new Promise(function(resolve,reject){
            var keyword = searchKeyword;
            var news = [];
            request('https://www.google.co.in/search?q='+keyword+'&tbm=nws&tbs=qdr:h&lr=lang_en', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                console.log("*****************************");
                var mainDiv = $('div.g');
                console.log("Total News:"+mainDiv.length);
                for(var i=0;i<mainDiv.length;i++){
                    var time = $(mainDiv).eq(i).find('.slp').text().split('-')[1].trim().split(" ");
                    var ct = getRealTime(time);
                    // console.log("google date:"+ct+" scrapper date:"+time[1]);
                    var singleNews = {"name":$(mainDiv).eq(i).find('a').text().trim(),
                            "imageUrl":$(mainDiv).eq(i).find('img').attr('src'),
                            "sourceUrl":$(mainDiv).eq(i).find('a').attr('href').split('=')[1].split('&')[0],
                            "headline":$(mainDiv).eq(i).find('.slp').text().split('-')[0],
                            "detail":$(mainDiv).eq(i).find('.st').text(),
                            "createdAt":ct,
                            "type": "news",
                            "feedReference":id
                            };
                    news.push(singleNews);
                }
                if(news && news.length > 0){
                    async.each(news,function (n,callback1){
                        saveLatest(n,purpose).then((data) => {
                            console.log("google news saved");
                        })
                    },function(err){
                        reject();
                    })
                }
                else{
                    console.log("No news.");
                }
            }
            else{
                console.log("my error: "+error);
                reject(error);
            }
        }); 
    });
}

exports.getTwitterNews = function (searchWord,id,purpose){
    return new Promise(function(resolve,reject){
        // var keyword = "narendra modi + india";
        var keyword = searchWord;
        var news = [];
        // console.log("expression:"+searchWord);
        request('https://twitter.com/search?f=tweets&vertical=news&q='+keyword+'&l=en&src=typd', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                var tweeterNews = [];
                var mainDiv = $('ol.stream-items').children();
                console.log("Tweets:"+$(mainDiv).length);
                for(let i=0;i<$(mainDiv).length;i++){
                    var time = mainDiv.eq(i).find('span.js-short-timestamp').attr("data-time-ms");
                    var ct = getRealTime(parseInt(time));
                    try{
                        var singleTweet = {
                                "name":mainDiv.eq(i).find('a.js-action-profile').text().trim().split("@")[0],
                                "imageUrl":mainDiv.eq(i).find('img.js-action-profile-avatar').attr('src').trim(),
                                "sourceUrl":"https://twitter.com"+mainDiv.eq(i).find('a.js-permalink').attr('href').trim(),
                                "headline": "@"+mainDiv.eq(i).find('a.js-action-profile').text().trim().split("@")[1],
                                "detail": mainDiv.eq(i).find('p.tweet-text').text().trim(),
                                "createdAt":ct,
                                "type": "twitter",
                                "feedReference":id
                            };
                    }
                    catch(err) {
                        console.log("Error:"+err);
                    }
                    tweeterNews.push(singleTweet);  
                } 
                if(tweeterNews && tweeterNews.length > 0){
                    async.each(tweeterNews,function (tweet,callback1){
                        saveLatest(tweet,purpose).then((data) => {
                            console.log("tweet saved");
                        })
                    },function(err){
                        reject();
                    }) 
                }
                else{
                    console.log("no tweets");
                    resolve();
                }
            }
            else{
                console.log("my error: "+error);
                reject(error);
            }
        });
    }); 
}
var latestUpdates = [];
function saveLatest(news,purpose){
    return new Promise((resolve,reject) => {
        reference.isNewsExist(news).then((res) => {
            if(res !== true){
                if(purpose === "firstTime"){
                    reference.saveReference(news).then((data) => {
                    resolve();
                    }).catch((err) => {
                        console.log("Error in saving news:"+err);
                        reject();
                    })
                }
                else{
                    console.log("saving in latest");
                    latestUpdates.push(news);
                }
            }
            else{
                console.log("not saved.");
            }
        })
    })
}

exports.getLatestUpdates = function(alertId){
    return new Promise((resolve,reject) => {
        console.log("latest updates length:"+latestUpdates.length);
        var latest = latestUpdates.filter((reference) => {
            return reference.feedReference == alertId;
        });
        console.log("After matching:"+latest.length);
        setTimeout(removeAndSaveReference,2000,latest);
        resolve(latest);
    })
}

function removeAndSaveReference(latestReference){
    if(latestReference.length > 0){
        async.each(latestReference,(ref) => {
            let index = latestUpdates.indexOf(ref);
            if(index > -1){
                latestUpdates.splice(index,1);
            }  
            reference.saveReference(ref).then((data) => {
            },
            (err) => {
                console.log("saving latest- Error:"+err);
            })
        },
        (err) => {
            console.log("Error:"+err);
        })
    }
}
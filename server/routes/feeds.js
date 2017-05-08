'use strict';
const express = require('express');

const router = express.Router();
const User = require('../middlewares/users');
const Feed = require('../middlewares/feeds');
const authController = require('../middlewares/auth/auth');
const exp = require('../middlewares/expression');
const news = require('../feature/newsscrapper');

router.get('/', (req,res) => {
    let userId;
    if(req.decoded && req.decoded.sub){
        userId = req.decoded.sub;
        Feed.getAllFeeds(userId).then((data) => {
            res.send(data);
        },
        (err) => {
            res.send({"success":false,"message":"something wrong.","error":err});
        });
    }
    else{
        res.send({"success":false,"message":"Not authorize."});
    }
    
});

router.post('/',(req,res) => {
    let body = req.body;
    let optionalKeywords = body.optionalKeywords;
    let requiredKeywords = body.requiredKeywords;

    if(req.decoded && req.decoded.sub){
        body.creator = req.decoded.sub;
    }
    else{
        res.send({"success":false,"message":"Not authorize."});
    }

    if(body && ((optionalKeywords && optionalKeywords.length > 0) || (requiredKeywords && requiredKeywords.length > 0))){
        Feed.saveFeed(body).then((data) => {
            let v = exp.getExpression(data);
            news.getGoogleNews(v,data._id).then((data) => {
                // res.send(data);
            },
            (err) => {
                console.log("Error:"+err);
                // res.send(err);
            });
            res.send({"success":true,"message":"feed saved."})
        },
        (err) => {
            console.log("error:"+err);
            res.send({"success":false,"message":"not saved","error":err});
        });
    }
    else{
        res.send({"success":false,"messge":"Please enter one keyword min in optional or required."});
    }
    
});

module.exports = router;
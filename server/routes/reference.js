'use strict';
const express = require('express');

const router = express.Router();
const User = require('../middlewares/users');
const Feed = require('../middlewares/feeds');
const news = require('../feature/newsscrapper');
const exp = require('../middlewares/expression');

router.get('/:feedId',(req,res) => {
    Feed.getFeedById(req.params.feedId).then((data) => {
        let v = exp.getExpression(data);
        console.log("v:"+v);
        news.getGoogleNews(v,data._id).then((data) => {
            res.send(data);
        },
        (err) => {
            res.send(err);
        });
        // res.send("data:"+v);
    },
    (err) => {
        console.log("Error:"+err);
        res.send(err);
    })
    
})

module.exports = router;
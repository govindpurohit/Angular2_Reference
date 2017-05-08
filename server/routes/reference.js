'use strict';
const express = require('express');

const router = express.Router();
const User = require('../middlewares/users');
const Feed = require('../middlewares/feeds');
const news = require('../feature/newsscrapper');
const exp = require('../middlewares/expression');
const ref = require('../middlewares/db/reference');

router.get('/:feedId',(req,res) => {
    Feed.getFeedById(req.params.feedId).then((data) => {
        let v = exp.getExpression(data);
        console.log("get Id:"+req.params.feedId);
        // news.getGoogleNews(v,req.params.feedId).then((data) => {
        //     res.send(data);
        // },
        // (err) => {
        //     res.send(err);
        // });
        ref.getAllReference(1,req.params.feedId).then((data) => {
            res.send(data);
        },
        (err) => {
            console.log("Error:"+err);
            res.send(err);
        })
        // res.send("data:"+v);
    },
    (err) => {
        console.log("Error:"+err);
        res.send(err);
    })
    
})

module.exports = router;
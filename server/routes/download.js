'use strict';
const express = require('express');
const path = require('path');

const router = express.Router();
const ref = require('../middlewares/db/reference');
const fileOperation = require('../middlewares/fileOperation');

router.get('/:id',(req,res) => {
  if(req.params.id == undefined){
    res.send({"success":false,"message":"Not valid address."});
  }
  ref.getAllLinks(req.params.id).then((data) => {
    if(data && !data.length > 0){
        data = [{"externalLinks":"No Links"}];
    }
    fileOperation.writeDownloadableFile(data).then((data) => {
        res.download(path.join(__dirname, '../download/output.csv').toString());
    });
  })
})

module.exports = router;
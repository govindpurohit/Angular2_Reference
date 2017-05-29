'use strict';
const express = require('express');
const path = require('path');

const router = express.Router();
const ref = require('../middlewares/db/reference');
const fileOperation = require('../middlewares/fileOperation');

router.get('/',(req,res) => {
  ref.getAllLinks().then((data) => {
    fileOperation.writeDownloadableFile(data).then((data) => {
      res.download(path.join(__dirname, '../download/output.csv').toString());
    });
  })
})

module.exports = router;
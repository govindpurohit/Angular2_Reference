const fs = require("fs");
const json2csv = require('json2csv');
const path = require('path');

exports.writeDownloadableFile = (data) => {
    return new Promise((resolve,reject) => {
        var fields = ['externalLinks'];
        var csv = json2csv({ data: data, fields: fields, quotes: ''});
        fs.writeFile(path.join(__dirname, '../download/output.csv'), csv, function(err) {
            if (err) {
                reject(err);
                throw err;
            }
            console.log('file saved');
            resolve();
        });
    })
}
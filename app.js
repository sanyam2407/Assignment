var express = require("express");
var path = require("path");
var fs = require("fs");
var resumable = require('./resumable-node.js')(__dirname + "/uploads");
var app = express();
var multipart = require('connect-multiparty');
app.use(express.static(path.join(__dirname, '/public')));
app.use(multipart());

// Handle uploads through Resumable.js
app.post('/upload', function (req, res) {
  resumable.post(req, function (status, filename, original_filename, identifier) {
    console.log(status)
    //when all chunks are uploded then status equals to "done" otherwise "partly_done"
    if (status === 'done') {
      //when all chunks uploaded, then createWriteStream to /uploads folder with filename
      var stream = fs.createWriteStream('./uploads/' + filename);

      //stitches the file chunks back together to create the original file. 
      resumable.write(identifier, stream);
      stream.on('data', function (data) { });
      stream.on('end', function () { });

      //delete chunks after original file is re-created. 
      resumable.clean(identifier);
    }
    res.status(200).send(status);
  });
});

// Handle status checks on chunks through Resumable.js
app.get('/upload', function (req, res) {
  resumable.get(req, function (status, filename, original_filename, identifier) {
    console.log('GET', status);
    res.send((status == 'found' ? 200 : 404), status);
  });
});

app.get('/download/:identifier', function (req, res) {
  resumable.write(req.params.identifier, res);
});

app.get('/resumable.js', function (req, res) {
  var fs = require('fs');
  res.setHeader("content-type", "application/javascript");
  //don't forget to copy resumable.js to the same location as app.js or 
  //change the following so that readStream be able to file where resumable.js is
  fs.createReadStream("./resumable.js").pipe(res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
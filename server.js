const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');


app.use(express.static('public'));
app.use(cors());
//
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


app.get('/src/data/*', (req, res) => {
  // extract the file name from the request URL
  const fileName = path.basename(req.url);

  // read the file from the file system
  fs.readFile(`src/data/${fileName}`, 'utf8', (err, data) => {
    if (err) {
      res.send(err)
      // handle the error
    } else {
      // set the content type and send the response
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

app.get('/files', (req, res) => {
  // read the contents of the directory
  fs.readdir('/files', (err, files) => {
    if (err) {
      // handle the error
    } else {
      // send the list of files as the response
      res.send(files);
    }
  });
});

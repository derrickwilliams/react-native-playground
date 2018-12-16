var sys = require('sys'),
    http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

const readdir = require('recursive-readdir');
const imageDataUri = require('image-data-uri');

const getAlbumHierarchy = (cb) => {
    const dataDir = path.join(process.cwd(), 'sample-photos');
    return new Promise((resolve, reject) => {
        readdir(dataDir, (err, data) => {
            resolve(data);
        })
    });
}

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(process.cwd(), uri);

  if (uri === '/gallery-data') {
    getAlbumHierarchy().then(d => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(d));
    });
    return;
  }

//   if (/^\/sample-photo/.test(uri)) {
//     imageDataUri.encodeFromFile(`./${uri}`).then(d => {
//         response.writeHead(200, { 'Content-Type': 'application/json' });
//         response.end(JSON.stringify(d));
//     });
//     return;
//   }

  fs.exists(filename, function(exists) {
    if (!exists) {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found\n');
      return;
    }

    fs.readFile(filename, 'binary', function(err, file) {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(err + '\n');
        return;
      }

      response.writeHead(200);
      response.write(file, 'binary');
      response.end();
    });
  });
}).listen(7878);

sys.puts('Server running at http://localhost:7878/');

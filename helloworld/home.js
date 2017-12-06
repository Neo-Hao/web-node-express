var http = require('http'),
	fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
	if (!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err, data) {
		if (err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('500 - Internal error');
		} else {
			res.writeHead(responseCode, {'Content-Type': contentType});
			res.end(data);
		}
	});
}

http.createServer(function(req, res) {
	// normalize url by removing querystring, optional
	// trailing slash, and making it lowercase
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path) {
		case '':
			serveStaticFile(res, '/home.html', 'text/html');
			break;
		case '/about':
			serveStaticFile(res, '/about.html', 'text/html');
			break;
		case '/img/log.jpg':
			serveStaticFile(res, '/img/logo.jpg', 'image/jpg');
			break;
		default:
			serveStaticFile(res, '/404.html', 'text/html', 404);
			break;
	}
}).listen(3000);

// http.createServer(function(req, res) {
// 	// normalize url by removing querystring, optional
// 	// trailing slash, and making it lowercase
// 	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
// 	switch(path) {
// 		case '':
// 			res.writeHead(200, {'Content-Type': 'text/plain'});
// 			res.end('Homepage');
// 			break;
// 		case '/about':
// 			res.writeHead(200, {'Content-Type': 'text/plain'});
// 			res.end('About');
// 			break;
// 		default:
// 			res.writeHead(200, {'Content-Type': 'text/plain'});
// 			res.end('Not Found');
// 			break;
// 	}
// }).listen(3000);


console.log('Server started on locoalhost:3000; press Ctrl-C to terminate...');
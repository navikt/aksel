var chokidar = require('chokidar');
var fs = require('fs');

var watcher = chokidar.watch('packages/node_modules/**/*.js', {
	ignored: /(^|[\/\\])\../,
	persistent: true
});

var log = console.log.bind(console);

log("*** Bakgrunnsjobb som kopierer javascript filer fra src/*.js til lib/*.js ***");

watcher.on('change', path => {
	var matches = path.match(/(.*)[\\\/]src[\\\/](.*)/);
	if (matches && matches.length > 2) {
		var src = path;
		var dest = matches[ 1 ] + "/lib/" + matches[ 2 ];
		log(`Kopierer ${src} til => ${dest}`);
		fs.createReadStream(src).pipe(fs.createWriteStream(dest));
	}
});

var chokidar = require('chokidar');
var fs = require('fs');

var watcher = chokidar.watch('packages/node_modules/**/*.js', {
	ignored: /(^|[\/\\])\../,
	persistent: true
});

var log = console.log.bind(console);

log(" ");
log("Starter bakgrunnsjobb som kopierer javascript filer fra src/*.js til lib/*.js...");
log(" ");

watcher.on('change', path => {
	var matches = path.match(/^(.*[\\\/]src)?(?:$|(.+?)(?:(\.[^.]*$)|$))/);
	if (matches && matches.length > 2) {
		var srcPath = matches[ 1 ];
		var basename = matches[ 2 ];
		var extension = matches[ 3 ];
		if (srcPath && srcPath.length > 0 && extension === '.js') {
			if (fs.existsSync(srcPath + basename + ".tsx") || fs.existsSync(srcPath + basename + ".ts")) {
				var src = srcPath + basename + extension;
				var destPath = srcPath.replace(/src$/, "lib");
				var dest = destPath + basename + extension;
				log(`==> Kopierer ${src} => ${dest}`);
				fs.createReadStream(src).pipe(fs.createWriteStream(dest));
			}
		}
	}

});


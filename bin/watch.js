const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

const location = path.join(__dirname, '../src');
const destination = path.join(location, '../example/react-native-markdown-renderer');

const watcher = chokidar.watch(location + '/**/*');
watcher.on('change', dir => {


	console.log('Updating %s by removing it', destination);

	fs.remove(destination, err => {

		console.log('Copy %s ', location);

		fs.copy(location, destination, err => {
			if (err) return console.error(err)

			console.log('to %s ', destination);
			console.log('success!')
		})
	});
});

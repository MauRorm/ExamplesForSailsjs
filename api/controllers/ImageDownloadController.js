/**
 * ImageDownloadController
 *
 * @description :: Server-side logic for managing imagedownloads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var path=require('path'); //  add path module to get path
var fs=require('fs'); //  add path module to get path
var request = require('request');

module.exports = {
	imageDownload: function(req, res) {
		var url = 'something url';
		request(url).pipe(fs.createWriteStream(path.resolve(".")+'/PDF/'+'image'+'.png'));
		res.send('Download image ok');
	}
};


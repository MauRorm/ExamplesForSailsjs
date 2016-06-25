/**
 * DownloadPdfController
 *
 * @description :: Server-side logic for managing downloadpdfs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
  var path=require('path'); //  add path module to get path

module.exports = {

	pdf: function (req, res) {
	var filename="report";
	res.set('Content-Type', 'application/pdf');
    res.download(path.resolve(".")+'/PDF/'+filename+'.pdf');
	}
};

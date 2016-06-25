/**
 * PdfgenerateController
 *
 * @description :: Server-side logic for managing pdfgenerates
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 /*http://www.feedhenry.com/server-side-pdf-generation-node-js/*//*url documentation*/

var jsreport = require('jsreport');
var path=require('path'); //  add path module to get path
var fs=require('fs'); //  add path module to get path
var request = require('request');

module.exports = {
	pdf: function (req, res) {
		var fileName = 'report';
		var template = '<h1>Reporte {{:number}}</h1>';
		var data = {
			number: "1"
		};
		jsreport.render({
			template: {
				content: template,
				engine: 'jsrender',
				recipe: 'phantom-pdf'
			},
			data: data
		}).then(function(resp) {
    		resp.stream.pipe(res);
    		resp.stream.pipe(fs.createWriteStream(path.resolve(".")+'/PDF/'+fileName+'.pdf')); /*write pdf file in path*/
    		res.download(path.resolve(".")+'/PDF/'+filename+'.pdf');						   /*download pdf file*/
  		}).catch(function(e) {    
    		res.end(e.message);
  		});
	},
};


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
		var secretToken = 'e18f29e2-6a41-2675-b4cb-4ea553fc8629';
		var url = 'http://www3.inegi.org.mx//sistemas/api/indicadores/v1//Indicador/6200012020/00000/es/true/json/' + secretToken;
		var fileName = 'report';
		var nameReport;
		var dataReport;
		var template = fs.readFileSync(path.resolve(".")+'/assets/templates/'+'template'+'.html').toString();
		request(url, function (error, response, body) {
			var serialData = JSON.parse(body);
			for (var prop in serialData.Data.Serie[0]) {
				if (typeof serialData.Data.Serie[0].NotesPeriod !== 'undefined') {
					nameReport = serialData.Data.Serie[0].NotesPeriod;
					dataReport = serialData.Data.Serie[0]. SourcesPeriod;
				}
    		}
			var data = {
				titleReport: nameReport,
				dataReport: dataReport
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
	    		//res.download(path.resolve(".")+'/PDF/'+filename+'.pdf');						   /*download pdf file*/
	  		}).catch(function(e) {    
	    		res.end(e.message);
	  		});
		})
	},
};


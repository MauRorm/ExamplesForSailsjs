/**
 * PdfSecondController
 *
 * @description :: Server-side logic for managing pdfseconds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var wkhtmltopdf = require('wkhtmltopdf');
 var PDFDocument = require('pdfkit'); // add pdfkit module to access it
 var path=require('path'); //  add path module to get path
 var fs=require('fs'); //  add path module to get path



module.exports = {

	pdf: function (req, res) {
	var filename="report";
    var content="que ondiux";
	var doc = new PDFDocument(); // create instance of PDFDocument
	doc.fontSize(25).text('Hola', 100, 80);
	doc.text('And here is some wrapped text...', 100, 300).font('Times-Roman', 13).moveDown().text(content, {
	    width: 412,
	    align: 'justify',
	    indent: 30,
	    columns: 2,
	    height: 300,
	    ellipsis: true
	});
    doc.y = 320;
    doc.text(content,100,100);
    console.log(path.resolve(".")+'/PDF/'+filename+'.pdf');
    doc.pipe( fs.createWriteStream(path.resolve(".")+'/PDF/'+filename+'.pdf') );
	res.set('Content-Type', 'application/pdf');
	console.log(res.get('Content-Type'));
    res.redirect('/pdfGenerateDownload');
    doc.end();
	}
};


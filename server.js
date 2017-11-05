var http = require('http');
var dt = require('./dateModule');
var url = require('url');
var result = '';
var fs = require('fs');
var uc = require('upper-case');
var formidable = require('formidable');
var count = 0;

//Send email message
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '3355844@gmail.com',
        pass: 'pass'
    }
});

var mailOptions = {
    from: '3355844@gmail.com',
    // to: 'juliajulia1203@gmail.com',
    to: 'juliajulia1203@gmail.com, 3355844@gmail.com',
    subject: 'This message is sending from Node.js',
    html: '<h1>Привет </h1><p>коли ти flop flop flop?)))</p>'
};


//Events
var events = require('events');
var eventEmitter = new events.EventEmitter();
var myEventHandler = function () {
    console.log("I hear a scream!!!")
};
eventEmitter.on('scream', myEventHandler);

// var express = require('express');

//SERVER 8080

http.createServer(function (req, res) {
        if (req.url === '/favicon.ico') {
            return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        //mySQL
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "localbase"
        });

        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            /*Create a database Table customer*/
            // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
            // var sql = "ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY";
            // var sql = "INSERT INTO customers (name, address) VALUES ?";
            // var values = [
            //     ['John', 'Highway 71'],
            //     ['Peter', 'Lowstreet 4'],
            //     ['Amy', 'Apple st 652'],
            //     ['Hannah', 'Mountain 21'],
            //     ['Michael', 'Valley 345'],
            //     ['Sandy', 'Ocean blvd 2'],
            //     ['Betty', 'Green Grass 1'],
            //     ['Richard', 'Sky st 331'],
            //     ['Susan', 'One way 98'],
            //     ['Vicky', 'Yellow Garden 2'],
            //     ['Ben', 'Park Lane 38'],
            //     ['William', 'Central st 954'],
            //     ['Chuck', 'Main Road 989'],
            //     ['Viola', 'Sideway 1633']
            // ];
            // con.query(sql, [values], function (err, result) {
            // var sql = "SELECT * FROM customers";
            // var sql = "SELECT * FROM customers WHERE address LIKE 'S%'";
            var sql = "SELECT * FROM customers ORDER BY name DESC LIMIT 5 OFFSET 2";

            con.query(sql,function (err, result, fields) {
                if (err) throw err;
                console.log(result);
            });
            /*Create a database named "mydb":*/
            //     con.query("CREATE DATABASE localbase", function (err, result) {
            //         if (err) throw err;
            //         console.log("Database created");
            //     });
        });
        // }
        //Send message
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent' + info.response)
        //     }
        // });

        //Form upload and save eny file
        // if (req.url === '/fileupload') {
        //     console.log('file upload started');
        //     var form = new formidable.IncomingForm();
        //     form.parse(req, function (err, fields, files) {
        //         var oldPath = files.filetoupload.path;
        //         var newPath = 'C:/Users/33558/PhpstormProjects/SomeOneCMS/' + files.filetoupload.name;
        //         fs.rename(oldPath, newPath, function (err) {
        //             if (err) throw err;
        //             console.log('File uploaded and moved!');
        //         });
        //         console.log('Is parsed');
        //     });
        // }
        // res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        // res.write('<input type="file" name="filetoupload"><br>');
        // res.write('<input type="submit">');
        // res.write('</form>');

        //Events
        // eventEmitter.emit('scream');

        //Read Html File and write
        fs.readFile('demoFile.html', function (err, data) {
            res.write(data);
            res.end();
        });

        //Write to file
        fs.writeFile('textFile.txt', " Called Url : " + req.url + " . ", function (err) {
            count++;
            if (err) throw err;
            console.log("Saved " + count);
        });

        //Read stream from File
        var readStream = fs.createReadStream('textFile.txt');
        readStream.on('open', function () {
            console.log('The File is open');
        });

        res.write(uc('Hello world!!'));
        res.write(dt.myDateTime());
        res.write(req.url);

        // Parse URL address
        // var q = url.parse(req.url, true).query; //http://localhost:8080/?year=2017&month=July
        // var txt = q.year + " " + q.month;
        // res.write(txt);

        // res.end(result);
        // res.end();
    }
).listen(8080);
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname));
var server = http.createServer(app);

const db = new sqlite3.Database('microbialite.sqlite3', (err) => {
    if (err) {
        return console.log(err.message);
    }
});

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'WayPointCreation.html'));
});

app.post('/way', (req, res) => {
    let data = [];
    data.push(req.body["WaypointID"]);
    data.push("'"+req.body["Title"]+"'");
    data.push(req.body["Longitude"]);
    data.push(req.body["Latitude"])
    data.push(req.body["Northing"]);
    data.push(req.body["Easting"]);
    data.push(req.body["UTMZone1"]);
    data.push("'"+req.body["UTMZone2"]+"'");
    data.push("'"+req.body["Datum"]+"'");
    data.push("'"+req.body["Projection"]+"'");
    data.push("'"+req.body["FieldBook"]+"'");
    data.push("'"+req.body["FieldbookPage"]+"'");
    data.push("'"+req.body["Formation"]+"'");
    data.push("'"+req.body["SiteName"]+"'");
    data.push("'"+req.body["DateCollection"]+"'");
    data.push(req.body["Elevation"]);
    data.push("'"+req.body["ProjectName"]+"'");
    data.push(req.body["MeasuredSection"]);
    data.push("'"+req.body["SectionName"]+"'");
    data.push("'"+req.body["Comments"]+"'");
    let query = "INSERT INTO Waypoint VALUES(" +data[0];
    for (let i = 1; i < data.length; i++) {
        query += ", " + data[i];
    }
    query += ");";
    console.log(query)
    db.all(query);
    
    res.send("nice job!");
});

app.post('/macro', (req, res) => {});
app.post('/micro', (req, res) => {});
app.post('/thin', (req, res) => {});
app.post('/photo', (req, res) => {});
app.post('/employee', (req, res) => {
    console.log(req.body);
});
app.post('/analyze', (req, res) => {});
app.post('/problem', (req, res) => {});

server.listen(3000, () => {
    console.log("Server listening on port: 3000");
});
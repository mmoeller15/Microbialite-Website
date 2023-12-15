var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var fs = require('fs');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname));
var server = http.createServer(app);

const db = new sqlite3.Database('microbialite.sqlite3', (err) => {
    if (err) {
        return console.log(err.message);
    }
});

function dbSelect(table, form_data) {
    let query = "SELECT * FROM " + table;
    let flag = false;
    for (const key in form_data) {
        if (form_data[key] != '') {
            query += " WHERE ";
            flag = true;
            break;
        }
    }

    if (flag) {
        for (const key in form_data) {
            let x = parseFloat(form_data[key]);
            if (form_data[key] != '') {
                if (!isNaN(x) && !form_data[key].includes("-")) {
                    query += key + " = " + form_data[key] + " AND ";
                } else {
                    query += key + " = '" + form_data[key] + "' AND ";
                }
            }
        }
        query = query.slice(0, -5);
    }
    query += ";";
    console.log(query);

    return new Promise ((resolve) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function dbUpdate(table, form_data) {
    let id_key = Object.keys(form_data)[0];
    let id_value = form_data[Object.keys(form_data)[0]];
    let query = "UPDATE " + table + " SET ";
    for (const key in form_data) {
        if (key != id_key) {
            let x = parseFloat(form_data[key]);
            if (form_data[key] != '') {
                if (!isNaN(x) && !form_data[key].includes("-")) {
                    query += key + " = " + form_data[key] + ", ";
                } else {
                    query += key + " = '" + form_data[key] + "', ";
                }
            }
        }
    }

    query = query.slice(0, -2);
    query += " WHERE " + id_key + " = " + id_value + ";";

    console.log(query);
    return new Promise (() => {
        db.all(query, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}

function dbInsert(table, form_data) {
    let query = "INSERT INTO " + table + " VALUES(";
    for (const key in form_data) {
        let x = parseFloat(form_data[key]);
        if (!isNaN(x) && !form_data[key].includes("-")) {
            query += form_data[key] + ", ";
        } else {
            query += "'" + form_data[key] + "', ";
        }
    }
    query = query.slice(0, -2) + ");";
    console.log(query);
    
    return new Promise (() => {
        db.all(query, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}

function dbDelete(table, form_data) {
    let query = "DELETE FROM " + table;
    let flag = false;
    for (const key in form_data) {
        if (form_data[key] != '') {
            query += " WHERE ";
            flag = true;
            break;
        }
    }

    if (flag) {
        for (const key in form_data) {
            let x = parseFloat(form_data[key]);
            if (form_data[key] != '') {
                if (!isNaN(x) && !form_data[key].includes("-")) {
                    query += key + " = " + form_data[key] + " AND ";
                } else {
                    query += key + " = '" + form_data[key] + "' AND ";
                }
            }
        }
        query = query.slice(0, -5);
    }
    query += ";";
    console.log(query);

    return new Promise(() => {
        db.all(query, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
}

function dbJoin(table1, table2, id) {
    let query = "SELECT * FROM " + table1 + " RIGHT JOIN " + table2;
    query += " ON " + table1 + "." + table1 + "ID = " + table2 + "." + table1 + "ID";

    if (id != '') {
        query += " WHERE " + table1 + "." + table1 + "ID = " + id;
    }

    query += " ORDER BY " + table1 + "." + table1 + "ID";

    console.log(query);

    return new Promise ((resolve) => {
        db.all(query, (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                resolve(rows);
            }
        });
    });
}

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, 'WayPointCreation.html'));
    
});


function selectData(res, results, table) {
    fs.readFile(__dirname + '/data.html', (err, template) => {
        let data = "";
        let response = template.toString();
        console.log(table)

        response = response.replace('%%TITLE%%', table);

        data = data + '<tr>';
        for (const key in results[0]) {
            data = data + '<th>' + key + '</th>';
        }
        data = data + '</tr>';

        for (let i = 0; i < results.length; i++) {

            data = data + '<tr>';
            for (const key in results[i]) {
                data = data + '<td>' + results[i][key] + '</td>';
            }
            data = data + '</tr>';
        }
        response = response.replace('%%DATA%%', data);
        res.status(200).type('html').send(response);
    });
}


app.post('/way', (req, res) => {
    let operation = req.body["operation"];
    let table = "Waypoint";
    delete req.body.operation;
    if (operation == "insert") {
        dbInsert(table, req.body);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results);
            selectData(res, results, table);
        })
    }
});

app.post('/macro', (req, res) => {
    let operation = req.body["operation"];
    let table = "Macrostructure";
    delete req.body.operation;
    if (operation == "insert") {
        dbInsert(table, req.body);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results);
            selectData(res, results, table);
        })
    }
});



app.post('/meso', (req, res) => {
    let operation = req.body["operation"];
    let table = "Mesostructure";
    delete req.body.operation;
    if (operation == "insert") {
        dbInsert(table, req.body);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results);
            selectData(res, results, table);
        })
    }
});

app.post('/thin', (req, res) => {
    console.log(req.body);
    let table = "ThinSection";
    let operation = req.body["operation"];
    delete req.body.operation
    let texture = req.body["Texture"].split(",");
    let cement = req.body["Cement"].split(",");
    let porosity = req.body["Porosity"].split(",");
    let minearlogy = req.body["Minearlogy"].split(",");
    let clastic_grain = req.body["ClasticGrain"].split(",");

    delete req.body.Texture;
    delete req.body.Cement;
    delete req.body.Porosity;
    delete req.body.Minearlogy;
    delete req.body.ClasticGrain;

    if (operation == "insert") {
        dbInsert(table, req.body);
        texture.forEach((e) => {
            if (e != '') {
                dbInsert("Texture", {ThinSectionID: req.body["ThinSectionID"], type: e});
            }
        });
        cement.forEach((e) => {
            if (e != '') {
                dbInsert("Cement", {ThinSectionID: req.body["ThinSectionID"], type: e});
            }
        });
        porosity.forEach((e) => {
            if (e != '') {
                dbInsert("Porosity", {ThinSectionID: req.body["ThinSectionID"], type: e});
            }
        });
        minearlogy.forEach((e) => {
            if (e != '') {
                dbInsert("Minearlogy", {ThinSectionID: req.body["ThinSectionID"], type: e});
            }
        });
        clastic_grain.forEach((e) => {
            if (e != '') {
                dbInsert("ClasticGrain", {ThinSectionID: req.body["ThinSectionID"], type: e});
            }
        });
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            for (let i = 0; i < results.length; i++) {
                let tex = dbSelect("Texture", {ThinSectionID: results[i]["ThinSectionID"].toString()});
                let cem = dbSelect("Cement", {ThinSectionID: results[i]["ThinSectionID"].toString()});
                let por = dbSelect("Porosity", {ThinSectionID: results[i]["ThinSectionID"].toString()});
                let min = dbSelect("Minearlogy", {ThinSectionID: results[i]["ThinSectionID"].toString()});
                let cla = dbSelect("ClasticGrain", {ThinSectionID: results[i]["ThinSectionID"].toString()});

                Promise.all([tex, cem, por, min, cla]).then((values) => {   
                    if (typeof values[0] !== 'undefined') {
                        results[i]["Texture"] = '';
                        values[0].forEach((e) => {
                            results[i]["Texture"] += e.type + ",";
                        });
                    }
                   
                    if (typeof values[1] !== 'undefined') {
                        results[i]["Cement"] = '';
                        values[1].forEach((e) => {
                            results[i]["Cement"] += e.type + ",";
                        });
                    }
                
                    if (typeof values[2] !== 'undefined') {
                        results[i]["Porosity"] = '';
                        values[2].forEach((e) => {
                            results[i]["Porosity"] += e.type + ",";
                        });
                    }
                 
                    if (typeof values[3] !== 'undefined') {
                        results[i]["Minearlogy"] = '';
                        values[3].forEach((e) => {
                            results[i]["Minearlogy"] += e.type + ","; 
                        });
                    }
                                        
                    if (typeof values[4] !== 'undefined') {
                        results[i]["ClasticGrain"] = '';
                        values[4].forEach((e) => {
                            results[i]["ClasticGrain"] += e.type + ",";
                        });
                    }
                });
            }
            selectData(res, results, table);
        })
    }
});



app.post('/photo', (req, res) => {
    let operation = req.body["operation"];
    let table = "Photo"
    let table2 = req.body["choice"] + "photo";
    console.log(table2);
    delete req.body.choice;
    delete req.body.operation;
    let updatedJSON = Object.assign({},req.body);

    if (operation == "insert") {
        delete req.body.RockID;
        dbInsert(table, req.body);
        delete updatedJSON.photoData;
        dbInsert(table2, updatedJSON);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        delete req.body.RockID;
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results); 
            selectData(res, results);
        })
    }
});


app.post('/employee', (req, res) => {
    let operation = req.body["operation"];
    let table = "Employee"
    delete req.body.operation;
    if (operation == "insert") {
        dbInsert(table, req.body);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results);
            selectData(res, results, table);
        })
    }
});
app.post('/analyze', (req, res) => {
    let operation = req.body["operation"];
    let choice = req.body["choice"];
    let table = "";
    if(choice === "thinsection"){
         table = "analyzing"+choice;
    }else {
     table = "analyzing"+req.body["choice"];
    }
    delete req.body.operation;
    delete req.body.choice;
    if (operation == "insert") {
        dbInsert(table, req.body);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results);
            selectData(res, results, table);
        })
    }
});


app.post('/problem', (req, res) => {
    let operation = req.body["operation"];
    let table = "ProblemLog"
    delete req.body.operation;
    if (operation == "insert") {
        dbInsert(table, req.body);
    } else if (operation == "delete") {
        dbDelete(table, req.body);
    } else if (operation == "update") {
        dbUpdate(table, req.body);
    } else if (operation == "select") {
        let promise = dbSelect(table, req.body);
        promise.then((results) => {
            console.log(results);
            selectData(res, results, table);
        })
    }

});

app.post('/contain', (req, res) => {
    let table1 = req.body.choice;
    let table2 = "";
    if (table1 == "Waypoint") {
        table2 = "Macrostructure";
    } else if (table1 == "Macrostructure") {
        table2 = "Mesostructure";
    } else if (table1 == "Mesostructure") {
        table2 = "ThinSection";
    }

    let promise = dbJoin(table1, table2, req.body.RockID);
    promise.then((results) => {
        selectData(res, results, "contains");
    });
});

app.post('/reset', (req, res) => {
    const data_delete = fs.readFileSync('./sql/ProjectPhase5DataDelete.sql', { encoding: 'utf8', flag: 'r' });
    const table_drop = fs.readFileSync('./sql/ProjectPhase5TableDrop.sql', { encoding: 'utf8', flag: 'r' });
    const table_create = fs.readFileSync('./sql/ProjectPhase5TableCreation.sql', { encoding: 'utf8', flag: 'r' });
    const data_insert = fs.readFileSync('./sql/ProjectPhase5DataInsert.sql', { encoding: 'utf8', flag: 'r' });
    
    let delete_arr = data_delete.split(';');
    let table_drop_arr = table_drop.split(';');
    let table_create_arr = table_create.split(';');
    let data_insert_arr = data_insert.split(';');

    db.serialize(() => {
        delete_arr.forEach((e) => {
            db.all(e + ';', (err) => {
                if (err) {
                    console.log(err)
                }
            });
        });
        table_drop_arr.forEach((e) => {
            db.all(e + ';', (err) => {
                if (err) {
                    console.log(err)
                }
            });
        });
        table_create_arr.forEach((e) => {
            db.all(e + ';', (err) => {
                if (err) {
                    console.log(err)
                }
            });
        })
        data_insert_arr.forEach((e) => {
            db.all(e + ';', (err) => {
                if (err) {
                    console.log(err)
                }
            });
        });
    });
});

server.listen(3000, () => {
    console.log("Server listening on port: 3000");
});

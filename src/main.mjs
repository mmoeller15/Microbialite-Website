import * as fs from 'node:fs';
import { default as sqlite3 } from 'sqlite3';

fs.unlinkSync('microbialite.sqlite3', (err) => {});

const db = new sqlite3.Database('microbialite.sqlite3', (err) => {
    if (err) {
        return console.log(err.message);
    }
});

function dbSelect(query, params) {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    });
}

const dataSql = fs.readFileSync('./sql/ProjectPhase5TableCreation.sql').toString();
const dataArr = dataSql.split(');');

const dataSql2 = fs.readFileSync('./sql/ProjectPhase5DataInsert.sql').toString();
const dataArr2 = dataSql2.split(');');

for (let i = 0; i < dataArr.length; i++) {
    let query1 = dataArr[i] + ");";
    let query2 = dataArr2[i] + ");";
    db.all(query1, (err) => {
        if (!err) {
            db.all(query2);
        }
    }); 
}
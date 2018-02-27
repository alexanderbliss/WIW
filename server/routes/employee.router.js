let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../modules/pool.js');

// Route to get all of a specific employees shifts.
router.get('/employeeShifts/:id', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
            console.log('error', errorConnectingToDb);
            
        } else {
            let id = req.params.id
            let queryText = 'SELECT*FROM "shift" WHERE "employee_id" = $1;';
            db.query(queryText,[id] , function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500);
                    console.log('errorMakingQuery', errorMakingQuery);
                    
                } else {

                    res.send(result.rows);
                }
            }); // END QUERY
        }
    });
});

//get Employee info
router.get('/employeeinfo/:id', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
            console.log('error', errorConnectingToDb);
        } else {
            let id = req.params.id
            let queryText = 'SELECT*FROM'+
            '"users"' +
            'LEFT JOIN "shift" ON "users".$1  = "shift".$1 WHERE "role" = \'Manager\';';
            db.query(queryText, [id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500);
                    console.log('errorMakingQuery', errorMakingQuery);
                } else {
                    res.send(result.rows);
                }
            }); // END QUERY
        }
    });
});

module.exports = router;

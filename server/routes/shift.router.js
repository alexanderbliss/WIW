let express = require('express');
let router = express.Router();
let path = require('path');
let pool = require('../modules/pool.js');


//POST a Shift
router.post('/add', function (req, res) {
        pool.connect(function (errorConnectingToDB, db, done) {
            console.log('req.', req);
            
            let shift = {
                manager_id:req.body.manager_id,
                employee_id: req.body.employee_id,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
            }
            if (errorConnectingToDB) {
                console.log('Error connecting to db', errorConnectingToDB);
                res.sendStatus(500);
            } else {
                var queryText = 'INSERT INTO "shift" ("manager_id", "employee_id", "start_time", "end_time")'+
                'VALUES($1,$2,$3,$4);';
                db.query(queryText, [shift.manager_id, shift.employee_id, shift.start_time, shift.end_time],
                    function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            console.log('Error making query', errorMakingQuery, result)
                            res.sendStatus(500);
                            console.log('errorMakingQuery', errorMakingQuery);
                            
                        } else {
                            res.send(result.rows);
                        }
                    })
                }
            })
        });


        //get shifts from a range of dates
router.get('/range', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
            console.log('error', errorConnectingToDb);
        } else {
            let date1 = req.headers.date1;
            let date2 = req.headers.date2;
            let queryText = 'SELECT*FROM "shift"WHERE' +
                '"start_time" BETWEEN $1 AND $2;';
            db.query(queryText, [date1, date2], function (errorMakingQuery, result) {
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

//See Manager Info
router.get('/whosManaging/:id', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
            console.log('error', errorConnectingToDb);
        } else {
            let employee_id = req.params.id
            let queryText = 'SELECT*FROM "users" WHERE "employee_id" = $1 AND "role" = \'Manager\';';
            db.query(queryText, [employee_id], function (errorMakingQuery, result) {
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

//see who else is working a shift
router.get('/whosWorking/:id', function (req, res) {
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
            console.log('error', errorConnectingToDb);
        } else {
            let employee_id = req.params.id
            let queryText = ' SELECT*FROM "shift" WHERE "id" = $1;';
            db.query(queryText, [employee_id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500);
                    console.log('errorMakingQuery', errorMakingQuery);
                } else {
                    let mId = result.rows[0].manager_id
                    let employee_id = req.params.id
                    let queryText = 'SELECT "name" FROM "users" WHERE "employee_id" = $1;';
                    db.query(queryText, [mId], function (errorMakingQuery, result) {
                        done();
                        if (errorMakingQuery) {
                            res.sendStatus(500);
                            console.log('errorMakingQuery', errorMakingQuery);
                        } else {
                            res.send(result.rows);
                        }
                    })                
                }
            }); // END QUERY
        }
    });
});

//Change Time of a shift
router.put('/time', function (req, res) {
        let changeTime = {
            start_time : req.body.start_time,
            end_time : req.body.end_time,
            id : req.body.id
        }
        pool.connect(function (errorConnectingToDb, db, done) {
            if (errorConnectingToDb) {
                res.sendStatus(500);
                console.log("errorConnectingToDb", errorConnectingToDb);
            } else {
                var queryText = 'UPDATE "shift" SET "start_time" = $1 , "end_time" = $2  WHERE "id" = $3;'
                db.query(queryText, [changeTime.start_time, changeTime.end_time, changeTime.id],
                    function (errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        res.sendStatus(500);
                        console.log('errorMakingQuery', errorMakingQuery);
                    } else {
                        res.sendStatus(201);
                    }
                }); // END QUERY
            }
        });
});//End POST route

// Assign a shift
router.put('/assign', function (req, res) {
    let assign = {
        shiftId: req.body.shiftId,
        employeeId: req.body.employeeId
    }
    console.log(assign);
    
    pool.connect(function (errorConnectingToDb, db, done) {
        if (errorConnectingToDb) {
            res.sendStatus(500);
            console.log("errorConnectingToDb", errorConnectingToDb);
        } else {
            var queryText = 'UPDATE "shift" SET "employee_id" = $1  WHERE "id" = $2;'
            db.query(queryText, [assign.employeeId, assign.shiftId], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    res.sendStatus(500);
                    console.log('errorMakingQuery', errorMakingQuery);
                } else {
                    res.sendStatus(201);
                }
            }); // END QUERY
        }
    });
});//End POST route

module.exports = router;

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// Route includes
let employeeRouter = require('./routes/employee.router.js')
let shiftRouter = require('./routes/shift.router.js')
let port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes

app.use('/employee', employeeRouter);
app.use('/shift', shiftRouter);

// Listen //
app.listen(port, function(){
    
console.log('Listening on port:', port);
});

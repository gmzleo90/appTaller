const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan');

//models & db Imports
const db = require('./db/db.js')
const User = require('./db/models/User');
const Customer = require('./db/models/Customer');
const Brand = require('./db/models/Brand.js');
const Vehicle = require('./db/models/Vehicle.js');
const Turn = require('./db/models/Turn.js');



//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());//parser
app.use(cors({         //cors 
    origin: 'http://localhost:3000'
}))


//route

// //User create
// app.post('/create/user', (req, res) => {
//     const userData = req.body;
//     User.create({ ...userData })
//         .then((user) => {
//             console.log('User Created');
//             res.status(201).json({ ...user.dataValues })
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err.message);
//         });
// })

//get all clients
app.get('/api/clients/general', (req, res) => {
    Customer.findAll({ where: { customerType: false } }).then(result => {
        res.send(result).status(200)
    }).catch();
})



//get  checking accounts clients
app.get('/api/clients/checking-accounts', (req, res) => {
    Customer.findAll({ where: { customerType: true } }).then(result => res.send(result).status(200)).catch();
})


app.post('/api/clients-create', (req, res) => {
    console.log(req.body);
    Customer.create({ ...req.body })
        .then(() => {
            console.log('created!');
            Customer.findAll({ where: { dni: req.body.dni } })
                .then(result => {
                    res.send(result).statusCode(201);
                })
        })
        .catch((err) => {
            //res.sendStatus(409)   
            console.log(err);
        })
})

app.delete('/api/clients/delete/:id', (req, res) => {

})



//[{ model: Vehicle, include: [Brand] }]






//server port
const PORT = 3001;

db.sync(
    //{ force: true }
).then(() => {
    app.listen(PORT, () => {
        console.log('-> Server Message: Db Sync OK!');
        console.log(`-> Server Message: Server Up! on http://localhost:${PORT}`);
    })
})





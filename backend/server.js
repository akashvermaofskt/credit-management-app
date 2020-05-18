const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');

let User = require('./user.model');


app.use(cors());
app.use(bodyParser.json());
const connectionString = "mongodb+srv://akashvermaofskt:<password>@mycluster-xx5kl.mongodb.net/users"

mongoose.connect(connectionString,{ useNewUrlParser: true });


const connection=mongoose.connection;
connection.once('open',function(){
    console.log("MongoDB databse connection established succesfully!")
});
app.listen(PORT,function(){
    console.log("Serve is running on Port: "+PORT);
});

const userRoutes = express.Router();
app.use('/users',userRoutes);

userRoutes.route('/').get(function(req,res){
    User.find(function(err,users){
        if(err){
            console.log(err);
        }else{
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    User.findById(id,function(err,user){
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req,res){
    let user = new User(req.body);

    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('use adding failed');
        });
});

userRoutes.route('/update/:id').post(function(req,res){
    User.findById(req.params.id,function(err,user){
        if(!user)
            res.status(404).send("data not found");
        else
            user.name=req.body.name;
            user.email=req.body.email;
            user.credit=req.body.credit;

            user.save().then(user => {
                res.json('user updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

const transferRoutes = express.Router();
let Transfer = require('./transfer.model');
app.use('/transfers',transferRoutes);


transferRoutes.route('/').get(function(req,res){
    Transfer.find(function(err,transfers){
        if(err){
            console.log(err);
        }else{
            res.json(transfers);
        }
    });
});


transferRoutes.route('/add').post(function(req,res){
    let transfer = new Transfer(req.body);

    transfer.save()
        .then(transfer => {
            res.status(200).json({'transfer': 'transfer successfully'});
        })
        .catch(err => {
            res.status(400).send('transfer failed');
        });
});


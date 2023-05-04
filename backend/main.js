const express = require('express');
const bodyParser = require('body-parser')
const fs = require("fs");
const { MongoClient } = require('mongodb');

const mongoDB = require("./database");
const userContoller = require("./controllers/userController");
const auth = require("./middleware/auth");

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = "mongodb+srv://ilyas:august4@clusterkaraganda.ygj7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


let app = express();
app.use(bodyParser.json());

app.get('/user/login', userContoller.login)
app.get('/user/createUser', userContoller.createUser)

let client = mongoDB.initiate(uri);

let server = app.listen(3001, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("BackEnd running at http://%s:%s", host, port)
})
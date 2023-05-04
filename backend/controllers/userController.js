const mongoDB = require("../database");
const tokenKey = require("../tokenKey");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    let account = req.body.account;
    let password = req.body.password;
  
    //account already exists in database, hence no adding. no duplicates
    mongoDB.findDocument(mongoDB.client, { account: account }, "USERS", "Students").then(
        (result) => {
            if (result === undefined || result.password !== password) {
                res.json({ pass: false })
                return;
            }
            console.log(tokenKey);
            const accessToken = jwt.sign(JSON.stringify({ account: account }), tokenKey.key);
            
            res.json({ pass: true, token: accessToken })
        })
}

exports.createUser = (req, res, next) => {
    let account = req.body.account;
    let password = req.body.password;

    this.checkAccount(account).then(
        (result) => {
            if (result) {
                res.end({ acknowledged: false })
                return;
            }

            else mongoDB.createDocument(mongoDB.client, {account: req.body.account,password: req.body.password}, "USERS", "Students").then(
                (result) => {
                    res.json({ acknowledged: true });
                });
        })
}

exports.EditUserData=(req,res,next) =>{
    let userData = req.body.userData;
    //let account = ;
    mongoDB.updateDocument(mongoDB.client,{account:req.body.account})
}

//Set user Data
exports.checkAccount = async (accountName) => {
    return new Promise(async (resolve) => {
        mongoDB.findDocument(mongoDB.client, { account: accountName }, "USERS", "Students").then(
            (result) => { return resolve(!(result === undefined)); }
        )
    });

}
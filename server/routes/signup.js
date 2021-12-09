const express = require("express");
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require("../../models/user");
const Signup = express.Router();

Signup.use(express.json());

Signup.post("/", async (req, res) => {
try{
    let {email,password,id,name} = req.body;
    console.log(req.body);
    password = await bcrypt.hash(password,3);
    console.log(password);
    await User.create({email:email,password:password, name:name, id:id}).then(result => {
        return res.status(200).send(result);
     }).catch(err=>{
         return res.status(400).send(err);
     })
}catch(err){
    return res.status(500).send({err:err.message });
}

});

module.exports = { Signup };

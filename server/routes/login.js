const express = require("express");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const User = require("../../models/user")
const passport = require("passport");
const Login = express.Router();

Login.get("/", passport.authenticate('local'),async (req, res) => {

let {email,password} = req.query;
const user = await User.findOne({where:{email:email}});
if(!user){
  return res.status(400).json("해당 아이디없음");
}else{
  const isEqualPw = await bcrypt.compare(password,user.password);
  console.log(isEqualPw);
  if(isEqualPw) {
    return res.status(200).json({msg : "로그인 성공!",user});
  }
else 
  return res.status(404).json({msg : "로그인 실패"});
}
});

Login.get('/check', async (req, res, next) => {
  if(req.isAuthenticated()) return res.json(req.user);
  return res.json({message: 'user 없음'});
});

Login.post('/logout', async (req, res, next)=> {
  try {
      if (req.session !==null) { //세션정보가 존재하는 경우
        await req.session.destroy(function(){
          req.session;
        });
  
        res.status(200).json("세션삭제");
      } 
      }catch(err){
        
      }
});


module.exports = { Login };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require( "../models/user");

const register = async(req, res)=>{
  const {email, username, password}=req.body;

  // check if all fields are present
  if (!email||!username||!password){
    return res.status(400).send("Please provide all fields.")
  }

  // checking if username or email already exist in database
  const userExists = await User.findOne({email});
  if (userExists) {
    return res.status(400).send("Email already exists");
  }

//hashing of password
const hashedPassword =await bcrypt.hash(password, 12);

// create a user
const user = await User.create({
  email,
  username,
  password:hashedPassword,
});

//generate token
const token =jwt.sign({id:user._id}, "123456789",{expiresIn:"2h"})
res.status(201).json({token});


};


// Now lets look at code for the login side

const login = async(req, res)=>{
  const {email, password}= req.body;

  // check if  user is in the Database
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).send("Invalid Username");
  }
// compare passwords whether it tallys with the one existing in the database
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch){
  return res.status(400).send("Invalid Password");
}

// generate a token so that the user can have access within a certain time frame
const token =jwt.sign({id: user._id}, "123456789",{expiresIn: "2h"});
 res.status(200).json({token});
};


// verifiying token before granting access

const verifyToken =(req, res, next)=>{
  const token= req.headers;
  if (!token){
    return res.status(401).json({message: "Not Authorized"});
  }

  next();
}




module.exports ={
  register,
  login,
  verifyToken
};
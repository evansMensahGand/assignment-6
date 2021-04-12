const user = require("../models/user");
const user = require("../models/user");
const user = require("../models/user");


// searching for all the users in the database
const getAllUsers = async(req, res)=>{
  const users = await user.find()
  res.status(200).json({users});
};


//  how to search for a single user from database
const getSingleUser = async(req, res)=>{
  const {id}= req.params;
  const user = await user.findById(id);
  res.status(200).json({user});
};

// updating a user info in the database
const updateUser= async (req, res)=>{
const {id } = req.params;
const user = await user.findByIdAndUpdate(id, req.body, {new: true});
res.status(200).json({user});
};

const deleteUser =async (req,res)=>{
  const {id}= req.params;
  await user.findByIdAndDelete(id);
  res.status(200).json({message:"User deleted successfully"});
};


module.exports={
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
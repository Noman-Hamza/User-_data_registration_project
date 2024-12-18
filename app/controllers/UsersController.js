import UsersModel from '../models/UsersModel.js';
import {EncodeToken} from "../utility/tokenUtility.js";
import usersModel from "../models/UsersModel.js";
import mongoose from "mongoose";


//// User Registration
export const Registration=async (req,res)=>{

    try {
        let reqBody=req.body;
        await UsersModel.create(reqBody)

        return res.status(200).json({status:"success","Message":"User Registration successfully"})
    }catch(err){
        res.status(500).json({status:"error","massage":err.toString()});
    }
}


///User login

export const Login=async (req,res)=>{
    try {
        let reqBody=req.body;
        let data=await      UsersModel.findOne(reqBody)
        if(data===null){
            return res.status(400).json({status:"Fail","Message":"User not found"})
        }else {
                 ///Login  Success Token Encode
            let token = EncodeToken(data['email'],data['_id']);
            // Cookies Option
            let cookieOption={expires:new Date(Date.now()+ 24 * 60 * 60 * 1000), httpOnly:false}

            // Set Cookies With Response
            res.cookie('token',token,cookieOption)
            return res.status(200).json({status:"success",token:token,"Message":"User found successfully"})
        }
    }catch(err){
       res.status(500).json({status:"error","massage":err.toString()});
    }

}

///User single profile read

export const ReadSingleProfile=async (req,res)=>{

  try {
      let user_id=req.headers['user_id'];
      let data=await UsersModel.findOne({"_id":user_id})
      return res.json({status:"success","Massage":"User Profile Details successfully",data:data})
  }catch(err){
      res.status(500).json({status:"error","massage":err.toString()});
  }

}

//All User profile read

export const AllUserProfileRead = async (req, res) => {
    try {
        let data = await UsersModel.find();
        return res.json({status:"success","Massage":"User Profile Details successfully",data:data})
    } catch (err) {

        return res.status(500).json({ status: "error", message: err.toString() });
    }
};


///Single User profile update

export const ProfileUpdate=async (req,res)=>{

    try {
        let reqBody=req.body;
        let user_id=req.headers['user_id'];
        await UsersModel.updateOne({"_id":user_id},reqBody);
        return res.status(200).json({status:"success","Message":"User ProfileUpdate successfully"})


    }catch(err){
        res.status(500).json({status:"error","massage":err.toString()});
    }

}




// Delete Single user
export const DeleteSingleUser =  async (req, res) => {
    try {
        let user_id=req.headers['user_id'];

        await UsersModel.deleteOne({"_id":user_id})
        return res.json({status:"success","Message":"User DeleteTask successfully"})
    }
    catch(err){
        return res.json({status:"fail","Message":err.toString()})
    }


}


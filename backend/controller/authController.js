import { genToken, genToken1 } from "../config/token.js";
import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from "bcryptjs";


export const registration= async (req,res) => {
    try {
        const {name, email,password}= req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter valid email"})
        }
        if(password.length<8){
            return res.status(400).json({message:"Enter Strong password"})
        }
        let hashPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:hashPassword})

        let token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        return res.status(201).json(user);

    } catch (error) {
        console.log("registration error")
        return res.status(500).json({message:`Registration error ${error}`})
        
    }
}

export const login = async(req,res)=>{
    try {
        let {email,password}=req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user is not found "});
        }
        let isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({message:"login successfully"});
    } catch (error) {
         console.error("login error:", error.message);
        return res.status(500).json({ message: "Login failed" });
    }
}

export const logOut=async (req,res) => {
    try {
       res.clearCookie("token")
        return res.status(200).json({message:"logOut successfully"})
    } catch (error) {
         console.error("logout error:", error.message);
    return res.status(500).json({ message: "LogOut failed" });
    }
    
}

export const googleLogin = async(req,res)=>{
    try {
        let {name,email}= req.body;
        let user = await User.findOne({email})
        if(!user){
           user = await User.create({name,email})
        }
        
        let token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({message:"login successfully"});
    } catch (error) {
        console.error("googleLogin error:", error.message);
    return res.status(500).json({ message: "googleLogin failed" });
    }
}

export const adminLogin = async (req,res) => {
    try {
        let {email , password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        let token = await genToken1(email)
        res.cookie("token",token,{
        httpOnly:true,
         secure:true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json(token)
        }
        return res.status(400).json({message:"Invaild creadintials"})

    } catch (error) {
        console.log("AdminLogin error")
    return res.status(500).json({message:`AdminLogin error ${error}`})
        
    }
    
}
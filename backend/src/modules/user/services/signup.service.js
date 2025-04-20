import User from "../../../DB/models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

 const signup= async(req,res,next)=>{
    try {
        const {name , email , password ,confirmationPassword , phone} = req.body;
        if(password !== confirmationPassword){
            return res.status(400).json({mssage:"password mismatch confirmation Password!!"})
        }

        const checkUser= await User.findOne({email});
        if(checkUser){
            return res.status(409).json({message:"email Already exists!!"})
        }
       
        const hashPassword=bcrypt.hashSync(password , parseInt(process.env.SALT));

        const user=await User.create({name , email , password:hashPassword , phone});
        return res.status(201).json({
            message:'Done',
            user
        })
    } catch (error) {
        return res.status(500).json({message:'server error' ,error , msg:error.message});
    }
}

export default signup;
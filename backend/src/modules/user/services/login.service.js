import User from "../../../DB/models/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRoles } from "../../../middleware/auth.middleware.js";
 const login=async(req , res , next)=>{
    try {
        const {email , password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:'user not found'})
        }
        
        const match=bcrypt.compareSync(password , user.password)
        if(!match){
            return res.status(404).json({message:'In-Valid login data!!'})

        }
        const token=jwt.sign({id:user._id , isloggedIn:true},
            user.role==userRoles.admin?process.env.TOKEN_SIGNATURE_ADMIN :process.env.TOKEN_SIGNATURE ,
            {expiresIn:'11h'}
        );
        return res.status(200).json({
            message:'Done',
            id:user._id,
            user,
            token
        })

    } catch (error) {
        
    }
}

export default login;

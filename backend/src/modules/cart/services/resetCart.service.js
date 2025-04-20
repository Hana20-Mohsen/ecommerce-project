import Cart from "../../../DB/models/Cart.model.js";
import jwt from 'jsonwebtoken'
const resetCart=async(req , res , next)=>{
    try {
        const {authorization} = req.headers;
        const [Bearer , token] = authorization.split(" ")||[]
        let signature=undefined;
        switch(Bearer){
            case 'admin':signature=process.env.TOKEN_SIGNATURE_ADMIN
            break;
            case 'Bearer':signature=process.env.TOKEN_SIGNATURE
            break;
            default:
                break
        }
        const decoded=jwt.decode(token , signature)
        const userId=decoded.id;
        const cart=await Cart.deleteMany({user:userId})
        if(!cart){
            return res.status(404).json({status:'fail' , message:'no items found'})
        }
        const totalPrice=0;
        return res.status(200).json({status:'success' , totalPrice })
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default resetCart;
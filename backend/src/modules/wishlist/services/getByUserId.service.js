import Wishlist from "../../../DB/models/wishlist.model.js";
import jwt from 'jsonwebtoken'
const findByUserId=async (req , res , next)=>{
    try {
         const { authorization } = req.headers;
                const  [Bearer, token ] = authorization.split(" ")||[];
                
                if (!token || !Bearer) {
                    return res.status(400).json({ message: "In-Valid token components" })
                }
                let signature = undefined;
                switch (Bearer) {
                    case "admin":
                        signature = process.env.TOKEN_SIGNATURE_ADMIN;
                        break;
                    case "Bearer":
                        signature = process.env.TOKEN_SIGNATURE
                        break
        
                    default:
                        break;
                }
                const decoded=jwt.decode(token , signature);
              
                const usreId=decoded.id;
                
                const wishlistItems=await Wishlist.find({user:usreId})
                return res.status(200).json({status:'success', wishlistItems , length:wishlistItems.length})
    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}

export default findByUserId;
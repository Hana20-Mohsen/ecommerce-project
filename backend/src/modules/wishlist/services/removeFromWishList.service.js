import Wishlist from "../../../DB/models/wishlist.model.js";
import jwt from 'jsonwebtoken'
const removeFromWishlist=async(req , res , next)=>{
    try {
        const productId = req.params.id;
        
        const { authorization } = req.headers;
        const  [Bearer, token ] = authorization.split(" ")||[];
        // console.log(token);
                
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
                
        const deletedProduct=await Wishlist.findOneAndDelete({user:usreId , product:productId});
        if(!deletedProduct){
            return res.status(404).json({message:'product not found!!'})
        }
        const usersWishlistItems= await Wishlist.find({user:usreId})

        return res.status(200).json({status:'success', message:'Done' , usersWishlistItems ,length:usersWishlistItems.length})
    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}

export default removeFromWishlist;
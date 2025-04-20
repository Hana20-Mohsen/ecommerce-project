import Wishlist from "../../../DB/models/wishlist.model.js";
import Product from "../../../DB/models/Product.model.js";
import jwt from 'jsonwebtoken'
const addToWishLIst = async (req, res, next) => {
    try {
        const productId = req.params.id;
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
        const itemSearch= await Wishlist.find({user:usreId ,product: productId})
        if(itemSearch.length>0){
            await Wishlist.findOneAndDelete({user:usreId ,product: productId})
            await Product.findByIdAndUpdate(productId , {isLoved:false})
            const usersWishlistItems= await Wishlist.find({user:usreId})
        
            return res.status(200).json({status:'deleted', message:'product deleted from wishlist' , usersWishlistItems , length:usersWishlistItems.length })
        }
        
        await Product.findByIdAndUpdate(productId , {isLoved:true})
        const wishlistItem=await Wishlist.create({user:usreId ,product: productId})
        const usersWishlistItems= await Wishlist.find({user:usreId})
        
        
        

        return res.status(201).json({status:'success' , message:'product added to wishlist' , usersWishlistItems  , length:usersWishlistItems.length})
        

    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}

export default addToWishLIst;
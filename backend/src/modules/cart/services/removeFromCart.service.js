import Cart from "../../../DB/models/Cart.model.js";
import jwt from 'jsonwebtoken'
const deleteFromCart=async(req , res , next)=>{
    try {
        const productId=req.params.id;
        const {authorization}=req.headers;
        const [Bearer , token] = authorization.split(" ")||[]
        let signature=undefined
        if(!Bearer || ! token){
            return res.status(400).json({message:'In-Valid token components'})
        }
        switch(Bearer){
            case 'admin':signature=process.env.TOKEN_SIGNATURE_ADMIN
            break;
            case 'Bearer':signature=process.env.TOKEN_SIGNATURE
            break;
            default:
                break
        }
        const decoded=jwt.decode(token , signature);
        const userId=decoded.id;
        const deletedProduct=await Cart.findOneAndDelete({user:userId , product:productId})
        if(!deletedProduct){
            return res.status(404).json({status:'fail' , message:'product not found'})
        }
        const cartItems= await Cart.find({user:userId}).populate('product', 'name price images countInStock');
        const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
        return res.status(200).json({status:'success' , cartItems , length:cartItems.length , totalPrice})
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default deleteFromCart;
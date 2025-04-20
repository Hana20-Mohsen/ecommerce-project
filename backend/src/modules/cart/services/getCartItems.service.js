import Cart from "../../../DB/models/Cart.model.js";
import jwt from 'jsonwebtoken'
const getCartItems=async (req , res , next)=>{
    try {
        const {authorization} = req.headers;
        const [Bearer , token] = authorization.split(" ")||[]
        let signature=undefined;
        switch(Bearer){
            case 'admin' : signature=process.env.TOKEN_SIGNATURE_ADMIN;
            break;
            case 'Bearer' : signature=process.env.TOKEN_SIGNATURE
            break;
            default:
                break
        }
        const decoded=jwt.decode(token , signature);
        const userId=decoded.id;
        const cartItems= await Cart.find({user:userId}).populate('product', 'name price images countInStock');
        if(!cartItems){
            return res.status(404).json({status:"fail" , message:'no items found' , length:cartItems.length})
        }
       
        console.log(cartItems);
        
        const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
        return res.status(200).json({status:'success' , cartItems , length:cartItems.length , totalPrice})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:'server error' , error})
    }
}

export default getCartItems
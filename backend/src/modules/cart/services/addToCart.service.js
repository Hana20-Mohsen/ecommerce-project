import Cart from "../../../DB/models/Cart.model.js";
import jwt from 'jsonwebtoken'
const addToCart=async (req , res , next)=>{
    try {
        const productId = req.params.id;
        const {authorization} = req.headers;
        const {quantity}= req.body;
        const [Bearer , token] = authorization.split(" ")||[];
        if(!Bearer || !token){
            return res.status(400).json({message:'In-Valid token components'})
        }
        let signature=undefined;
        switch(Bearer){
            case "admin": signature=process.env.TOKEN_SIGNATURE_ADMIN
            break;
            case "Bearer": signature= process.env.TOKEN_SIGNATURE
            break;
            default:
                break
            }
            
            const decoded=jwt.decode(token , signature);
            const userId=decoded.id;
            const searchProduct= await Cart.findOne({user:userId ,product:productId} )
            if(searchProduct){
                // if(quantity && quantity>1){
                //     searchProduct.quantity=quantity
                // }
                // else{

                //     searchProduct.quantity+=1;
                // }
                // await searchProduct.save();
                
                // return res.status(201).json({status:'success' ,cartItems, length:cartItems.length})
                const deletedItem= await Cart.findOneAndDelete({user:userId , product:productId})
                const cartItems= await Cart.find({user:userId})
                return res.status(200).json({status:'remove' ,cartItems, length:cartItems.length })
            }
         await Cart.create({user:userId , product:productId})
         const cartItems= await Cart.find({user:userId})
         
        return res.status(201).json({status:'success',cartItems , length:cartItems.length})
        

        
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default addToCart
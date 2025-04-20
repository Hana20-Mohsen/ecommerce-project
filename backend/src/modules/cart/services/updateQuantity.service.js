import Cart from "../../../DB/models/Cart.model.js";
import Product from "../../../DB/models/Product.model.js";
import jwt from 'jsonwebtoken'
const updateQuantity = async (req, res, next) => {
    try {
        const { operation } = req.body;
        const productId = req.params.id;
        const { authorization } = req.headers;
        const [Bearer, token] = authorization.split(" ") || [];
        if (!Bearer || !token) {
            return res.status(400).json({ message: 'In-Valid token components' })
        }
        let signature = undefined;
        switch (Bearer) {
            case "admin": signature = process.env.TOKEN_SIGNATURE_ADMIN
                break;
            case "Bearer": signature = process.env.TOKEN_SIGNATURE
                break;
            default:
                break
        }

        const decoded = jwt.decode(token, signature);
        const userId = decoded.id;
        const productToUpdate = await Cart.findOne({ user: userId, product: productId })
        if (!productToUpdate) {
            return res.status(404).json({ status: 'fail', message: 'product not found' })
        }
        console.log(productToUpdate);

        switch (operation) {
            case "+": productToUpdate.quantity++
                break;
            case "-": productToUpdate.quantity--
                break;
            default:return  res.status(400).json({status:'fail' , message:'In-Valid operation'})
                break
        }
        const product= await Product.findById(productId);
        const newQuantity=productToUpdate.quantity;
        
        if(newQuantity>product.countInStock ||newQuantity<0){
            return res.status(400).json({status:'fail' , message:"In-Valid quantity"})
        }
        await productToUpdate.save();
        const cartItems= await Cart.find({user:userId}).populate('product', 'name price images countInStock');
                const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);
        return res.status(200).json({status:'success' , cartItems , length:cartItems.length , totalPrice})

    } catch (error) {
        return res.status(500).json({ message: 'server error', error })
    }
}

export default updateQuantity
import Product from "../../../DB/models/Product.model.js";

const GetByProductId=async(req , res , next)=>{
    try {
        const productId=req.params.id;
        const product= await Product.findById(productId)
        if(!product){
            return res.status(404).json({message:'product not found'})
        }
        return res.status(200).json({status:'success' , product})
    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}

export default GetByProductId;
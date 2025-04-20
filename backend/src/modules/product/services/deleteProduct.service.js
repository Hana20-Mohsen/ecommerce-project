import Product from "../../../DB/models/Product.model.js";

const deleteProduct=async(req , res , next)=>{
    try {
        const productId=req.params.id;
        console.log(productId);
        
        const searchProduct=await Product.findByIdAndDelete(productId)
        if(!searchProduct){
            return res.status(404).json({status:'fail' , message:'product not found'})
        }
        const products= await Product.find();

        return res.status(200).json({status:'success' ,products , length:products.length})
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default deleteProduct
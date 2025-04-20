import Product from "../../../DB/models/Product.model.js";

const getAllProducts=async(req , res, next)=>{
    const products= await Product.find();
    if(!products){
        return res.status(404).json({message:'no products found!!'})
    }
    // console.log(products);
    

    return res.status(200).json({
        products
    })
}

export default getAllProducts;
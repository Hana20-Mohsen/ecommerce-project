import Category from "../../../DB/models/category.model.js";
import Product from "../../../DB/models/Product.model.js";
const getByCategoryName=async(req , res , next)=>{
    try {
        const {name}=req.query;
        const category= await Category.findOne({name})
        if(!category){
            return res.status(404).json({status:'fail' , message:'no products found'})
        }
        const categoryId=category.id
        
        const products= await Product.find({category:categoryId})
        if(!products){
            return res.status(404).json({status:'fail' , message:'no products found'})
        }
        
        return res.status(200).json({status:'success',length:products.length , products })
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default getByCategoryName
import Category from "../../../DB/models/category.model.js";

const getAllCategories=async(req , res , next)=>{
    try {
        const categories = await Category.find();
        if(!categories){
            return res.status(404).json({status:'fail' , message:'no categories found'})
        }

        return res.status(200).json({status:'success' , categories , length:categories.length})
    } catch (error) {
        return res.status(500).json({message:'server error ' , error})
    }
}

export default getAllCategories
import Category from "../../../DB/models/category.model.js";

const addCatgory=async (req , res ,next)=>{
    try {
        const {image , name , slug}=req.body;
        if(!name){
            return res.status(400).json({status:'fail' , message:'name is required'})
        }
        const searchCategory= await Category.find({name});
        if(searchCategory.length>1){
            return res.status(409).jsn({status:'fail' , message:'category already exists!!'})
        }
        const newCategory=await Category.create({image , name , slug})
        return res.status(201).json({status:'success' , newCategory})
        
        // const newCategory= await 
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default addCatgory
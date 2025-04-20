import Brand from "../../../DB/models/brand.model.js";

const addBrand=async(req , res , next)=>{
    try {
        const {image , name , slug}=req.body;
        if(!name){
            return res.status(404).json({status:'fail' , message:'name is required'})
        }
        const searchBrand=await Brand.find({name})
        if(searchBrand.length>1){
            return res.status(409).json({status:'fail' , message:'Brand already exists!!!'})
        }

        const newBrand= await Brand.create({image , name , slug})
        return res.status(201).json({status:'success' , newBrand })
    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default addBrand;
import Brand from "../../../DB/models/brand.model.js";

const getAllBrands=async(req , res , next)=>{
    try {
        const brands=await Brand.find();
        if(!brands){
            return res.status(404).json({status:'fail' , message:'no brands found'})
        }
        return res.status(200).json({status:'success' , brands , length:brands.length})
    } catch (error) {
        return res.status(500).json({message:'server error' . error})
    }
}

export default getAllBrands
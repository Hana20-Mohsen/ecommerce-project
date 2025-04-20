import Product from "../../../DB/models/Product.model.js";

const addMultiple=async (req , res , next)=>{
    try {
        const {data}=req.body;
      const done=  await Product.insertMany(data)
      if(!done){
        return res.status(400).json({status:'fail' , message:'data not inserted'})
      }
      return res.status(201).json({status:'success' , data:done})

    } catch (error) {
        return res.status(500).json({message:'server error' , error})
    }
}

export default addMultiple
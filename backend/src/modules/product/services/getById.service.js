import Product from "../../../DB/models/Product.model.js";

const getByIds = async (req, res, next) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ message: "Invalid or missing 'ids' array" });
        }

        const products= await Product.find({_id:{$in:ids}});
        return res.status(200).json({status:'success' , products})

    } catch (error) {
        return res.status(500).json({ message: "server error", error })
    }
}

export default getByIds;
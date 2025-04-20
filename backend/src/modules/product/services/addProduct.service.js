import multer from 'multer';
import path from 'path';
import Product from '../../../DB/models/Product.model.js';


// Create Product API
const addProduct=async (req, res) => {
  const { name, price, description ,category ,countInStock , detaileddescription ,brand ,rating ,numReviews  } = req.body;
  if (!req.body.name || !req.body.price || !req.body.description || !req.body.category || !req.body.countInStock) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const images = req.files.map(file => file.filename); // تخزين أسماء الصور

  // بعدها تخزني البيانات دي كلها في الداتابيز
  const newProduct = {
    name,
    price,
    description,
    detaileddescription,
    brand,
    category,
    countInStock,
    rating,
    numReviews,
    images // array of filenames
  };

  const product= await Product.create(newProduct)
  return res.status(201).json({
    message:'Done',
    product
  })

}

export default addProduct;
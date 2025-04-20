import { Router } from "express";
import multer from 'multer';
import path from 'path';
import addProduct from "./services/addProduct.service.js";
import getAllProducts from "./services/getAllProducts.service.js";
import getByIds from "./services/getById.service.js";
import GetByProductId from "./services/getByProductId.service.js";
import addMultiple from "./services/addMultiple.service.js";
import deleteProduct from "./services/deleteProduct.service.js";
const router=Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Save in uploads folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // مثلا: 171234234.png
    }
  });
  const upload = multer({ storage: storage });


router.post('/add', upload.array('images', 5) , addProduct);
router.get('/all' , getAllProducts)
router.post('/getByIds', getByIds)
router.get('/:id' , GetByProductId)
router.post('/multi' , addMultiple)
router.delete('/:id' , deleteProduct)
export default router;


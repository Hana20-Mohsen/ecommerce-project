import { Router } from "express";
import addBrand from "./services/addBrand.service.js";
import getAllBrands from "./services/getAllBrands.service.js";


const router=Router();

router.post('/add' , addBrand)
router.get('/all' , getAllBrands)


export default router;
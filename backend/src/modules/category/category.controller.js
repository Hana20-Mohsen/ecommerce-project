import { Router } from "express";
import addCatgory from "./services/addCategory.service.js";
import getAllCategories from "./services/getAllCategories.service.js";
import getByCategoryName from "./services/getByCategoryName.service.js";
const router=Router();

router.post('/add' ,addCatgory )
router.get('/all' , getAllCategories)
router.get('/name' , getByCategoryName)

export default router;
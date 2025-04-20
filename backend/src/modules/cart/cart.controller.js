import { Router } from "express";
import addToCart from "./services/addToCart.service.js";
import getCartItems from "./services/getCartItems.service.js";
import deleteFromCart from "./services/removeFromCart.service.js";
import resetCart from "./services/resetCart.service.js";
import updateQuantity from "./services/updateQuantity.service.js";
const router=Router();

router.post('/add/:id' ,addToCart );
router.get('/all', getCartItems )
router.delete('/delete/:id' , deleteFromCart)
router.delete('/reset' , resetCart)
router.put('/update/:id' , updateQuantity)

export default router;
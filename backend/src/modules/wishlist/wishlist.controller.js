import { Router } from "express"; 
import addToWishLIst from "./services/addToWishList.service.js";
import { authentication , authorization } from "../../middleware/auth.middleware.js";
import { endpoint } from "../user/user.endpoint.js";
import removeFromWishlist from "./services/removeFromWishList.service.js";
import findByUserId from "./services/getByUserId.service.js";
const router = Router();

router.post('/add/:id' , authentication() , authorization(endpoint.wishlistL) , addToWishLIst)
router.delete('/delete/:id' , authentication(),authorization(endpoint.wishlistL) , removeFromWishlist)
router.get('/byUser' , authentication(), authorization(endpoint.wishlistL) , findByUserId)

export default router;

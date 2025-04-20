import { Router } from "express";
import { authentication , authorization  } from "../../middleware/auth.middleware.js";
import { endpoint } from "./user.endpoint.js";
import signup  from "./services/signup.service.js";
import login from "./services/login.service.js";
const router=Router();
router.post('/register' , signup)
router.post('/login' , login)
export default router;
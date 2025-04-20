import connectDB from "./DB/connection.js";
import userController from './modules/user/user.controller.js'
import productController from './modules/product/product.controller.js'
import wishlistController from './modules/wishlist/wishlist.controller.js'
import cartController from './modules/cart/cart.controller.js'
import categoryController from './modules/category/category.controller.js'
import brandController from './modules/brand/brand.controller.js'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bootstrap=(app , express)=>{
    app.use(express.json());

    const allowedOrigins = [
        'http://localhost:3001',
        'http://localhost:3002'
      ];
    //here i will use cors
    app.use(cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('CORS not allowed'));
          }
        },
        credentials: true
      }));

  
      //to make my images visible to anyone use my web application
      console.log(__dirname);
      
      
      app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


    app.get('/',(req,res,next)=>{
        return res.status(200).json({
            message:"welcome in e-commerce project..."
        })
    })


    app.use('/api/v1/user' ,userController )
    app.use('/api/v1/product' , productController)
    app.use('/api/v1/wishlist' , wishlistController)
    app.use('/api/v1/cart' , cartController)
    app.use('/api/v1/category' , categoryController)
    app.use('/api/v1/brand' , brandController)



    app.all('*' , (req,res,next)=>{
        return res.status(404).json({
            message:'In-Valid routing!!'
        })
    })

    connectDB()
}

export default bootstrap;
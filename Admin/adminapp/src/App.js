import React from 'react'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Products from './products/Products.jsx'
import Cart from './cart/Cart.jsx'
import NotFoundPage from './NotFoundPage/NotFoundPage.jsx'
import Categories from './categories/Categories.jsx'
import { Offline, Online } from "react-detect-offline";
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes.jsx'
import StoreContextProvider from './context/storeContext.js'
import { ToastContainer } from 'react-toastify';
import Admin from './admin/Admin.jsx'
import AdminLayOut from './layouts/adminLayOut/AdminLayOut.jsx'
import AdminProtectedRoute from './ProtectedRoutes/AdminProtectedRoute/AdminProtectedRoute.jsx'
import ManageProducts from './admin/ManageProducts/ManageProducts.jsx'
import AddProduct from './admin/addproduct/AddProduct.jsx'
import ProductContextProvider from './context/ProductContext.js'
import Offers from './admin/Offers/Offers.jsx'
import LiveOrders from './admin/liveOrders/LiveOrders.jsx'
import BestSeller from './admin/bestSeller/BestSeller.jsx'


export default function App() {
  const routes = createBrowserRouter([
 
    { index:true,element:<Admin/>},
      {path:'admin',element:<Admin/>},
      { path:'offers', element:<Offers/> },
      { path:'liveOrders', element:<LiveOrders/> },
      { path:'bestSeller', element:<BestSeller/> },
      { path:'manageProducts', element:<ManageProducts/> },
      {path:'addProduct' , element :<AddProduct/>  },
      { path:'products',element:<Products/>},
     { path:'cart',element:<Cart/>},
      {path:'category',element:<Categories/>},

     
    
   
  ])
  return (
    <>

     

    {/* detect off line */}
    <ToastContainer theme='colored' autoClose={400}/>
    <StoreContextProvider>
  <ProductContextProvider>
      <RouterProvider router={routes}/>
      </ProductContextProvider>
    </StoreContextProvider>

    <Offline>
      <div className='offline'>You are offline Now!</div>
    </Offline>

     
    </>
  )
}


import {createBrowserRouter,} from "react-router-dom";
import Login from "../Login & Register/Login";
;
import Root from './../Root/Root';

import Register from './../Login & Register/Register';




import ProductList from "../pages/ProductList";
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import Error from './../Shared/Error';
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children:[{
        path:'/',
        element:<Home></Home>,
       
      },
      {
        path:'/products',
        element:
          <PrivateRoute>
            <ProductList></ProductList>
          </PrivateRoute>
        
      },
    
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
    },
  ]);

  export default router;
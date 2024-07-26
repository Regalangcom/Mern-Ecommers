import React , { Suspense , lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App             from '@eli/App'
import Success from '@eli/pages/success';
import Cancel from '@eli/pages/Cancel';
import Orderpage from '@eli/pages/Orderpage';

const Home              =  lazy(() => import('@eli/pages/Home'));
const Login             =  lazy(() => import('@eli/pages/Login'));
const ResetPasswords    =  lazy(() => import('@eli/pages/ForgotPassowrd'));
const SignUp            =  lazy(() => import('@eli/pages/SignUp'));
const AdminPanel        =  lazy(() => import('@eli/pages/AdminPanel'));
const AllUsers          =  lazy(() => import('@eli/pages/AllUsers'));
const AllProducts       =  lazy(() => import('@eli/pages/AllProducts'));
const CategoryProduct   =  lazy(() => import('@eli/pages/CategoryProduct'));
const ProductDetails    =  lazy(() => import('@eli/pages/ProductDetails'));
const Cart              =  lazy(() => import('@eli/pages/Cart'));
const SearchProduct     =  lazy(() => import('@eli/pages/SearchProduct'));


export const Loading = () => <div className='text-center'> Loading ...</div>


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : (
                    <Suspense fallback={<Loading />}>
                        <Home/>
                    </Suspense>
                )  
                    
            },
            {
                path : "login",
                element : (
                    <Suspense fallback={<Loading />}>
                        <Login/>
                    </Suspense>
                )
            },
            {
                path : "forgot-password",
                element : (
                    <Suspense fallback={<Loading />}>
                         <ResetPasswords />
                    </Suspense>
                ) 
            },
            {
                path : "sign-up",
                element : (
                    <Suspense fallback={<Loading />}>
                       <SignUp/>
                   </Suspense>
                ) 
            },
            {
                path : "product-category",
                element : (
                    <Suspense fallback={<Loading />}>
                        <CategoryProduct/>
                   </Suspense>
                ) 
            },
            {
                path : "product/:id",
                element : (
                    <Suspense fallback={<Loading />}>
                      <ProductDetails/>
                   </Suspense>
                ) 
            },
            {
                path : 'cart',
                element : (
                    <Suspense fallback={<Loading />}>
                      <Cart/>
                   </Suspense>
                ) 
            },
            // orderPage
            {
                path : 'orderpage',
                element : (
                    <Suspense fallback={<Loading />}>
                      <Orderpage />
                   </Suspense>
                ), 
                // children : [
            
                // ]
            },
            // {
            //     path : "orderSavedPDF",
            //     element : (
            //         <Suspense fallback={<Loading />}>
            //           <DownloadReceipt />
            //         </Suspense>
            //     )  
            // },
            {
                path : "search",
                element : (
                    <Suspense fallback={<Loading />}>
                      <SearchProduct/>
                    </Suspense>
                ) 
            },
            // success
            {
                path : "success",
                element : (
                    <Suspense fallback={<Loading />}>
                      <Success />
                    </Suspense>
                ) 
            },
            // cancell
            {
                path : "cancel",
                element : (
                    <Suspense fallback={<Loading />}>
                      <Cancel />
                    </Suspense>
                ) 
            },
            {
                path : "admin-panel",
                element : (
                    <Suspense fallback={<Loading />}>
                       <AdminPanel/>,
                    </Suspense>
                ),
                children : [
                    {
                        path : "all-users",
                        element : (
                            <Suspense fallback={<Loading />}>
                              <AllUsers/>
                            </Suspense>
                        )  
                    },
                    {
                        path : "all-products",
                        element : (
                            <Suspense fallback={<Loading />}>
                              <AllProducts/>
                            </Suspense>
                        )  
                    }
                ]
            },
        ]
    }
])


export default router
import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';


const Cart = () => {


    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    // const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)
    const { fetchUserAddToCart } = useContext(Context)


    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_PORT_SERVER}/api/view-card-product` , { withCredentials : true })

            if (response.data.success) {
                setData(response.data.data)
            }
        } catch (error) {
            console.log("error addcart : " , error.message); 
        }
    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])


    const increaseQty = async ( id , qty ) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_PORT_SERVER}/api/update-cart-product`, {
                _id : id,
                quantity : qty + 1 
            }, {
                withCredentials : true
            })


            if (response.data.success) {
                fetchData()
            }
        } catch (error) {
            console.error('Error updating cart product:', error);
        }
    }



    const decraseQty = async ( id , qty ) => {

        if (qty >= 2 ) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_PORT_SERVER}/api/update-cart-product`, {
                    _id : id,
                    quantity : qty - 1
                } , {
                    withCredentials : true
                })

                if (response.data.success) {
                    fetchData()
                }

            } catch (error) {
                console.error('Error updating cart product:', error);
            }
        }

    }




    const deleteCartProduct = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_PORT_SERVER}/api/delete-cart-product`, {
                withCredentials: true,
                data: {
                    _id: id,
                },
            });
    
            if (response.data.success) {
                fetchData();
                fetchUserAddToCart();
            }
        } catch (error) {
            console.error('Error deleting cart product:', error);
        }
    };
    
    


    const handlePayment = async () => {
        try {
            const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
            const stripe = await stripePromise;
    
            const response = await axios.post(`${import.meta.env.VITE_PORT_SERVER}/api/create-checkout-session`, 
                { cartItems: data },
                { 
                    withCredentials: true 
                }
            );
            console.log("response data  : " , response.data);
         
    
            if (response.status === 200 && response.data.id) {
                const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });
                if (error) {
                    console.error("Stripe redirect error:", error);
                }
            } else {
                console.error("Invalid response from server:", response);
            }
        } catch (error) {
            console.error("Error during payment process:", error);
        }

    };



    const totalQty = data.reduce((previousValue, currentValue) => {
        console.log('Quantity:', currentValue.quantity); 
        return previousValue + (currentValue.quantity || 0);
    }, 0);
    
    const totalPrice = data.reduce((previousValue, currentValue) => {
        const quantity = currentValue.quantity || 0;
        const sellingPrice = currentValue?.productId?.sellingPrice || 0;
        console.log('Quantity:', quantity, 'Selling Price:', sellingPrice); 
        return previousValue + (quantity * sellingPrice);
    }, 0);
    
  return (
    <div className='container mx-auto'>
        {/* <InlineScriptComponent /> */}
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button type='submit' className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>

                                </div>
                            )
                        }
                </div>
                    )
                }

        </div>
    </div>
  )
}

export default Cart
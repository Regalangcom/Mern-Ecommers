// import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{

    try {
      const dataResponse = await axios.get(`${import.meta.env.VITE_PORT_SERVER}/api/user-details`,{
        withCredentials : true 
      })

      const dataApi = await dataResponse.data

      if(dataApi.success){
        dispatch(setUserDetails(dataApi?.data))
      }
      
    } catch (error) {
      console.log(error.message);
    }
  }




  const fetchUserAddToCart = async()=>{

    try {
      const dataResponse = await axios.get(`${import.meta.env.VITE_PORT_SERVER}/api/countAddToCartProduct` , {withCredentials : true})
  
      const dataApi = await dataResponse.data
  
      setCartProductCount(dataApi?.data?.count)
      
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='bottom-right'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
import React, { useContext, useState } from 'react'
// import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import axios from 'axios';
import DOMPurify from 'dompurify';

const Header = () => {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    // VITE_PORT_SERVER
    const TakeData = await axios.get(`${import.meta.env.VITE_PORT_SERVER}/api/userLogout`,{
      withCredentials : true
    })

    const data = await TakeData.data

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }



    if(data.error){
      toast.error(data.message)
    }

  }



  const validateSanitasi = (input) => {
    
    // buat sanitize
    const SanitizeInputs = DOMPurify.sanitize(input);

    const invalidChars = /[<>&"']/g;

    if (invalidChars.test(SanitizeInputs)) {
      return { valid : false , SanitizeInputs , message : "invalid characters" }; 
    }

    return { valid : true, SanitizeInputs };

}




  const handleSearch = (e)=>{
    const { value } = e.target
    const { valid , message , SanitizeInputs } = validateSanitasi(value);

    if (!valid) {
      toast.error(message)
      return;
    }

    setSearch(SanitizeInputs);



    if(SanitizeInputs){
      navigate(`/search?q=${SanitizeInputs}`)
    }else{
      navigate("/search")
    }
  }


  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  
 


  // const DomPurifyReady = () => console.log("");

  return (
    <header className='h-16 shadow-md  bg-blue-500  fixed w-full z-40 '>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between '>
     
                <Link to={"/"} className='hidden md:block'>
                    <h4>My Shop</h4>
                </Link>

             <div>
      {/* Icon Search */}
      <div className='flex items-center justify-center w-12 h-12 bg-blue-900 rounded-full text-white cursor-pointer' onClick={togglePopup}>
        <GrSearch />
      </div>

      {/* Popup Search */}
      {isPopupOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <div className='flex items-center w-full justify-between border rounded-full focus-within:shadow pl-2'>

              <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/> {/*  */}

              <div className='text-lg min-w-[50px] h-8 bg-blue-900 flex items-center justify-center rounded-r-full text-white'>
                <GrSearch />
              </div>
            </div>
            <button className='mt-4 w-full bg-blue-900 text-white p-2 rounded' onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>


            <div className='flex items-center gap-7'>
                
                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer rounded-full relative flex justify-center bg-gray-700' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  
                  {
                    menuDisplay && (
                      <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded-full'>
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-blue-900 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                         <Link to={`/orderpage`} className=' whitespace-nowrap p-2 md:block hidden hover:bg-slate-100'
                         onClick={() => setMenuDisplay(preve => !preve)}>Order</Link>
                        </nav>
                      </div>
                    )
                  }
                 
                </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><FaShoppingCart/></span>
      
                          <div className=' bg-blue-900  text-black w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }
              


                <div className='p-7'>
                  {
                    user?._id ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded  text-white bg-blue-900 hover:bg-blue-900'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded text-white  bg-blue-900  hover:bg-blue-500'>Login</Link>
                    )
                  }
                    
                </div>

            </div>

      </div>
    </header>
  )
}

export default Header
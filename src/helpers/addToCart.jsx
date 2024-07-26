import axios from "axios"
import SummaryApi from "../common"
import { toast } from 'react-toastify'

const addToCart = async(e, id ) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await axios.post(`${import.meta.env.VITE_PORT_SERVER}/api/addtocart`,{
        productId : id, 
    } , { withCredentials : true })

    // const responseData = await response.data

    if(response.data.success){
        toast.success(response.data.message)
    }

    if(response.data.error){
        toast.error(response.data.message)
    }


    return responseData

}


export default addToCart
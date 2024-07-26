import axios from "axios"

const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadImage  = async(image) => {
    try {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mern_product");
        
        const dataResponse = await axios.post(url, formData);
        
        return dataResponse.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;     
    }
}

export default uploadImage 
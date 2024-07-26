import axios from "axios";
// import SummaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_PORT_SERVER}/api/category-product`, {
            category : category
        });
        const dataResponse = response.data;
        return dataResponse;
    } catch (error) {
        console.error("Error fetching category-wise product:", error);
        throw error;
    }
}

export default fetchCategoryWiseProduct;

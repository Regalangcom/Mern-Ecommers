const backendDomin = import.meta.env.VITE_PORT_SERVER

const SummaryApi = {
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },

    payment : {
        url : `${backendDomin}/api/checkout`,
        method : 'post'
 
    }
}


export default SummaryApi
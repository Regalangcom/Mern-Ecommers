import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import displayINRCurrency from '@eli/helpers/displayCurrency';

const Orderpage = () => {
  const [Data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT_SERVER}/api/order-list`, { withCredentials: true });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const RecivedOrderPDF = async  (orderId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT_SERVER}/api/orderSavedPDF/${orderId}`, {
          responseType: 'blob',
          withCredentials: true
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } catch (error) {
      console.error('Error downloading the receipt', error);
  }
  }


  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='max-w-7xl mx-auto py-8'>
        { Data[0] && (
          <div className='text-center text-gray-600'>No order available</div>
        )}

        <div className='space-y-8'>
          {Data.data?.map((item, index) => (
            <div key={item.userId + index} className='bg-white shadow-md rounded-md p-6'>
              <p className='text-lg font-semibold'>{format(new Date(item.createdAt), "dd MMM yyyy")}</p>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
                {item?.productDetails.map((product, index) => (
                  <div key={product.productId + index} className='flex space-x-4 border rounded-md p-4'>
                    <img src={product.image[0]} className='w-28 h-28 object-cover rounded-md' alt={product.name} />

                    <div className='flex flex-col'>
                      <p className='text-lg font-semibold'>{product.name}</p>
                      <div className='flex items-center gap-2 mt-1'>
                        <div className='text-red-700'>{displayINRCurrency(product.price)}</div>
                        <p className='text-gray-600'>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div> 
                <div className=''>
                  <div className='mt-6'>
                    <div className='text-lg font-semibold w-100'>Payment Details:</div>
                    <p className='ml-1'>Payment Method: {item.paymentDetails.payment_method_type[0]}</p>
                    <p className='ml-1'>Payment Status: <span className='text-green-900'>{item.paymentDetails.payment_status}</span></p>
                  </div>
                  <div className='mt-4'>
                    <div className='text-lg font-semibold'>Shipping Details:</div>
                    {item?.shipping_options.map((shipping, index) => (
                      <div key={shipping.shipping_rate} className='ml-1'>
                        <p>Shipping Amount: {shipping.shipping_amount}</p>
                      </div>
                    ))}
                  </div>


                </div>

                <div className='mt-4 text-lg text-end'>Total Amount: <span className='font-semibold'>{displayINRCurrency(item.totalAmount)}</span> </div>
                 <button onClick={RecivedOrderPDF} className='text-sky-500'> Download resi </button>
            </div>
          ))}
        </div>
        {/* <DownloadReceipt orderId={orderId} /> */}
      </div>
    </div>
  );
};

export default Orderpage;

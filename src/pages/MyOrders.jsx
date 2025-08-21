import React, { useEffect } from 'react'
import { useState } from 'react';

import { dummyOrders } from '../assets/assets';

const MyOrders = () => {

   const [myorders,setMyOrders] = useState([]);



    // Fetch orders 
    const fetchOrders = async () => {
       setMyOrders(dummyOrders)

    };

   useEffect(()=>{
        fetchOrders();
   },[])

  return (
    <div>

        <div className='flex  flex-col items-end w-max mb-8'>
             <p className='text-2xl font-medium uppercase'>My Orders</p>
             <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
             {myorders.map((order,index)=>
            
             <div key={index} className=' border border-gray-300  rounded-lg mb-10 p-4 py-5 max-w-4xl'>

                <p className='flex justify-between md:items-centre text-gray-400 md:font-medium max-md:flex-col'>
                      <span>  OrderId  :  {order._id}</span>
                      <span> Payment :  {order.paymentType}</span>
                     <span>  Total Amount : ₹{order.items.reduce((acc, item) => acc + item.product.offerPrice * (item.quantity || 1), 0)}</span>
                </p>
                        {order.items.map((item,index)=>(
                            <div key={index}  className={`relative bg-white text-gray-500/70 
                        ${order.items.length !== index + 1 ? "border-b" : ""} 
                              border-gray-300 flex flex-col md:flex-row md:items-center justify-between 
                           p-4 py-5 md:gap-16 w-full max-w-4xl`}> 
                                <div className='flex items-centre mb-4 md:mb-0'>
                                       <div className=' bg-primary/10 p-4 rounded-lg '>
                                        <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                                       </div>
                                                 <div className='ml-4'>
                                                    <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                                    <p>Category : {item.product.category}</p>
                                                 </div>
                                </div>

                                     <div className=' flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                         
                                         <p> Quantity : {item.quantity ||'1'} </p>
                                             <p> Status : {order.status } </p>
                                               <p> Date : {new Date(order.createdAt).toLocaleDateString() } </p>
                                             
                                             <p className='text-primary text-lg font-medium'> Amount :  ₹{item.product.offerPrice * item.quantity} </p>

                                        </div>  



                            </div>
                        ))}

             </div>
            
            )}
    </div>
  )
}

export default MyOrders

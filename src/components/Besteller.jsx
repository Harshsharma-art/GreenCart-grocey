import React from 'react';
import ProductCart from './ProductCart';
import { useAppContext } from '../context/AppContext';

const Besteller = () => {
  const { products } = useAppContext();

  if (!products || products.length === 0) {
    return <p className='mt-16 text-lg'>No best seller available yet.</p>;
  }

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium flex flex-row justify-start'>Best Seller</p>
      
      <div className=' mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Besteller;

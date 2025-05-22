
'use client'
import React, { useEffect, useState } from 'react';

export default function CheckProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error fetching products: ", err));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="min-w-full flex flex-col gap-[12px] row-start-2 items-center sm:items-start">
        <h2 className='w-full h-full text-center text-xl'>Lista de productos</h2>
        <ul className="flex flex-wrap gap-6 justify-center items-center sm:items-start">
          {products.map((product:any) => (
          <li key={product.product_id} className='w-64  h-28 p-4 overflow-auto bg-slate-500 mb-2 rounded shadow'>
            <p>Nombre del producto: {product.product_name}</p>
            <p>precio del producto: {product.product_price}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

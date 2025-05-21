
'use client'
import React, { useEffect, useState } from 'react';

export default function checkProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Error fetching products: ", err));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Lista de productos</h2>
        <ul>
          {products.map((product:any) => (
          <li className='p-4 bg-white rounded shadow'>
            <p>Nombre del producto: {product.product_name}</p>
            <p>precio del producto: {product.product_price}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

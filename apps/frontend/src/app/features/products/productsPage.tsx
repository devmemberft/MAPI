
'use client'
import { useState } from 'react';
import { useApi } from '@/app/hooks/useApi';

export default function CheckProducts() {
  const productsPerPage = 8;

  const [actualPage,setActualPage] = useState(1);

  const { data:products,loading,error } = useApi('/products');

  if(loading) return <p className='m1'>Cargando productos...</p>
  if(error) return <p className='m1 text-red-700'>Error: {error}</p>

  const totalPages = Math.ceil(products.lenght / productsPerPage);

  const firstIndex = (actualPage - 1) * productsPerPage;
  const lastIndex = firstIndex + productsPerPage;
  const visibleProducts = products.slice(firstIndex,lastIndex);


  return (
    <>
    <div className='products-options fixed top-16 h-16 w-full'>
      <div className='buttons flex flex-row space-x-4 h-full'>
        <button onClick={
          () => setActualPage(p => p - 1)}
          disabled={actualPage === 1}
          className='px-3 py-1 bg-slate-100/10 rounded disabled:opacity-50 cursor-pointer'
          >Anterior
        </button>

        <button onClick={
          () => setActualPage(p => p + 1)}
          disabled={actualPage === totalPages}
          className='px-3 py-1 bg-slate-100/10 rounded disabled:opacity-50 cursor-pointer'>
          Siguiente
        </button>
      </div>
    </div>
    <div className="get-section fixed top-32 left-42 h-screen overflow-auto font-[family-name:var(--font-geist-sans)]">

      <div className="flex min-w-full w-full p-4">

        <div className='flex flex-wrap items-center justify-center px-6 py-2 gap-6 bg-neutral-500/40 border-1 border-slate-100/10 rounded shadow'>
          {visibleProducts.map((product:any) => (
            <div key={product.product_id} className='w-64 h-50 p-0.5 bg-slate-900 border-1 border-slate-100/10 mb-2 rounded-xl shadow'>
              <div className='flex w-full h-32 border-1 bg-slate-100/10 border-slate-100/10 rounded-xl'></div>
              <p className='p-1'>{product.product_name}</p>
              <p className='p-1'>{product.product_price}$UYU</p>
          </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

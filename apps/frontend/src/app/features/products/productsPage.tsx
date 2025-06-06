
'use client'
import { useState } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { Package } from 'lucide-react';
import { usePagination } from '@/app/hooks/usePagination';

export default function CheckProducts() {
  const { data:products,loading,error } = useApi('/products');
  const {visibleItems, page, totalPages, setPage} = usePagination(10, products ?? [],1);
  if(loading) return <p className='m1'>Cargando productos...</p>
  if(error) return <p className='m1 text-red-700'>Error: {error}</p>

  return (
    <>
    <div className='search-bar'></div>

    <div className="main-section p-4 font-[family-name:var(--font-geist-sans)]">

      <div className="flex min-w-full w-full p-4">

        <div className='products-container flex flex-wrap items-center justify-center px-6 py-2 gap-6 rounded shadow'>
          
          <div className='methods-buttons flex text-center items-center justify-center w-full h-auto p-2 space-x-6'>
            <button onClick={
              () => setPage(p => p - 1)}
              disabled={ page === 1 }
              className='paginationButton'
              >Anterior
            </button>

            <button onClick={
              () => setPage(p => p + 1)}
              disabled={page >= totalPages}
              className='paginationButton'>
              Siguiente
            </button>
            <button className='px-3 py-1 bg-slate-100/10 rounded disabled:opacity-50 cursor-pointer'>Agregar producto</button>
          </div>

          {visibleItems.map((product:any) => (
            <div key={product.product_id} className='product-box w-64 h-50 p-2 bg-gray-100/80 border-1 border-slate-100/10 mb-2 rounded-xl shadow'>
              <div className='flex w-full h-32 border-b-1 border-neutral-600/10'></div>
              <div className='truncate overflow-auto items-center text-start'>{product.product_name.slice(0,30)}</div>
              <div className='truncate overflow-auto items-center text-start'>{product.product_price}$UYU</div>
          </div>
          ))}
        </div>
      </div>

    </div>

    </>
  );
}
/*
<div className='post-section fixed top-16 right-0 border-l-1 border-slate-100/10 w-[499px] h-screen'>
  <div className='flex flex-col items-center justify-center h-full text-slate-500'>
    <span className='text-3xl mb-4'><Package/></span>
    <p className='text-lg'>Selecciona un producto de la lista</p>
    <p className='text-md'>Para ver informacion y editarla</p>   
  </div>
</div>

*/
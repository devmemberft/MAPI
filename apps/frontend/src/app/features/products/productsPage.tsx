
'use client'
import { useApi } from '@/app/hooks/useApi';

export default function CheckProducts() {

  const { data:products,loading,error } = useApi('/products');

  if(loading) return <p className='m1'>Cargando productos...</p>
  if(error) return <p className='m1 text-red-700'>Error: {error}</p>

  return (
    <div className="grid grid-rows-[1px_1fr_1px] items-center justify-items-center min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
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

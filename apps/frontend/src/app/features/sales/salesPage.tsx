
'use client'
import { useApi } from "@/app/hooks/useApi";

export default function CheckSales() {
  const {data:sales, loading, error } = useApi('/sales');

  if(loading) return <p className="m-1">Cargando ventas...</p>
  if(error) return <p className="m-1 text-red-700">Error: {error}</p>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Lista de ventas activas</h2>
        <ul>
          {sales.map((sale:any) => (
          <li key={sale.sale_id} className='p-4 bg-slate-500 mb-2 rounded shadow'>
            <p>fecha de la venta: {sale.sale_date}</p>
            <p>valor de la cuota: {sale.quota_value}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

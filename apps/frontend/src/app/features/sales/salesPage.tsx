
'use client'
import { useApi } from "@/app/hooks/useApi";
import { Store, Receipt } from "lucide-react";

export default function CheckSales() {
  const {data:sales, loading, error } = useApi('/sales');

  if(loading) return <p className="m-1">Cargando ventas...</p>
  if(error) return <p className="m-1 text-red-700">Error: {error}</p>

  return (
    <>
    
    <div className="get-section fixed top-16 right-0 h-[278px] w-[700px] p-4 border-1 border-slate-100/10">
      <div className='flex flex-col items-center justify-center h-full text-slate-500'>
        <span className='text-3xl mb-4'><Store/></span>
        <p className='text-lg'>Selecciona una venta de la lista</p>
        <p className='text-md'>Para ver el registro completo</p>   
      </div>
    </div>
    
    <div className="get-section fixed bottom-0 right-0 h-[278px] w-[700px] p-4 border-1 border-slate-100/10">
      <div className='flex flex-col items-center justify-center h-full text-slate-500'>
        <span className='text-3xl mb-4'><Receipt/></span>
        <p className='text-lg'>Selecciona el incono de pagos</p>
        <p className='text-md'>Para ver el listado de pagos</p>   
      </div>
    </div>

    <div className="get-section fixed top-16 h-screen w-[500px] p-4 border-1 border-slate-100/10 overflow-auto">
      <div className="font-[family-name:var(--font-geist-sans)]">

        <div className="flex flex-col items-center justify-center overflow-auto">
          <h2 className="text-semibold text-white text-lg mb-4">Lista de ventas activas</h2>
          <ul>
            {sales.map((sale:any) => (
              <li key={sale.sale_id} className='p-4 bg-slate-900 border-1 border-slate-100/10 mb-2 rounded shadow'>
              <p>fecha de la venta: {sale.sale_date}</p>
              <p>valor de la cuota: {sale.quota_value}</p>
            </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
    </>
  );
}

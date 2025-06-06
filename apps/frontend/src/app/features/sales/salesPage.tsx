
'use client'
import { useApi } from "@/app/hooks/useApi";
import { Store, Receipt } from "lucide-react";
import { usePagination } from "@/app/hooks/usePagination";

export default function CheckSales() {
  const {data:sales, loading, error } = useApi('/sales');
  const {visibleItems, page, totalPages, setPage} = usePagination(10,sales ?? [],1);

  if(loading) return <p className="m-1">Cargando ventas...</p>
  if(error) return <p className="m-1 text-red-700">Error: {error}</p>

  return (
    <>
    <div className="search-bar"></div>
    

    <div className="main-section p-4 overflow-auto font-[family-name:var(--font-geist-sans)]">

      <div className="sales-container m-4 p-4 items-center justify-center">

        <h2 className="text-semibold text-lg mb-4">Lista de ventas activas</h2>
        <div className="space-x-2">
          <button className="paginationButton" onClick={() => setPage(p => p - 1 )} disabled={ page === 1 }>Anterior</button>
          <button className="paginationButton" onClick={() => setPage(p => p + 1)} disabled={ page >= totalPages }>Siguiente</button>
        </div>

        <div className="flex flex-row w-full">
          <div>fecha de la venta</div>
          <div>valor de la cuota</div>
        </div>

        <div className="table rounded-xl border-1 border-slate-100/20 bg-gray-200/60 w-full shadow shadow-amber-100/20">
          {visibleItems.map((sale:any) => (
            <div key={sale.sale_id} className='table-grid grid grid-cols-[100px_100px_100px_20px_100px_300px_200px] items-center justify-between space-x-2 px-2 h-8 border-b-1 border-b-slate-100/10 shadow'>
              <div className="truncate overflow-auto items-center text-start">{sale.sale_date.slice(0,10)}</div>
              <div className="truncate overflow-auto items-center text-start">{sale.quota_value}$</div>
              <div className="truncate overflow-auto items-center text-start">{sale.balance_amount}$</div>
              <div className="truncate overflow-auto items-center text-start">{sale.number_of_payments}</div>
              <div className="truncate overflow-auto items-center text-start">{sale.payment_day}</div>
              <div className="truncate overflow-auto items-center text-start">{sale.client.client_name}</div>
              <div className="truncate overflow-auto items-center text-start">{sale.product.product_name}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </>
  );
}
/*
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
*/
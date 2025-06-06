
'use client'
import useSWR from "swr";
import { getData } from "@/app/utils/apiClient";

const fetcher = (url:string) => getData(url);

export default function CheckRoute() {
  const {data:routes, isLoading, error } = useSWR('/payments/daily-route',fetcher);

  if(isLoading) return <p className="m1">Cargando ruta del dia...</p>
  if(error) return <p className="m1 text-red-700">Error: {error}</p>

  return (
    <>
    <div className="search-bar"></div>
    
    <div className="main-section font-[family-name:var(--font-geist-sans)] overflow-auto p-4">

      <div className="m-4 p-4 items-center justify-center text-center">

        <h2 className="text-semibold text-lg mb-2">Ruta del dia</h2>


        <div className="table rounded-xl border-1 border-slate-100/20 bg-gray-200/60 w-full shadow shadow-amber-100/20">
          {routes.map((route:any) => (
            <div key={route.client_id} className='table-grid grid grid-cols-[300px_300px_100px_30px_150px_100px] items-center justify-between space-x-2 px-2 h-8 border-b-1 border-b-slate-100/10 shadow'> 
              <div className="truncate overflow-auto items-center text-start">{route.client_name}</div>
              <div className="truncate overflow-auto items-center text-start">{route.client_address}</div>
              <div className="truncate overflow-auto items-center text-start">{route.client_phone}</div>
              <div className="truncate overflow-auto items-center text-start">{route.client_rute}</div>
              <div className="truncate overflow-auto items-center text-start">{route.client_zone}</div>
              <div className="truncate overflow-auto items-center text-start">{route.client_dni}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
    
   
    </>
  );
}
//route.client_id debido a que este endpoint recolecta informacion de cliente y la relacion que tenga con una venta
/*
 <div className="get-section fixed bottom-0 left-42 h-[285px] w-[500px] border-1 border-slate-100/10">
      <div className="flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-semibold text-white text-lg mb-4">Registro de rutas del mes</h2>
      </div>
    </div>
    
    <div className="get-section fixed bottom-0 right-0 h-[285px] w-[700px] border-1 border-slate-100/10">
      <div className='flex flex-col items-center justify-center h-full text-slate-500'>
        <span className='text-3xl mb-4'><Truck/></span>
        <p className='text-lg'>Selecciona un cliente de la lista</p>
        <p className='text-md'>Para ver informacion y editarla</p>   
      </div>
    </div>

*/
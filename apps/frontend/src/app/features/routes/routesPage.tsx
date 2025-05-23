
'use client'
import { useApi } from "@/app/hooks/useApi";
import { Truck } from "lucide-react";

export default function CheckRoute() {
  const {data:routes, loading, error } = useApi('/payments/daily-route');

  if(loading) return <p className="m1">Cargando ruta del dia...</p>
  if(error) return <p className="m1 text-red-700">Error: {error}</p>

  return (
    <>
    <div className="get-section fixed top-16 h-screen w-[500px] p-4 border-1 border-slate-100/10">
      <div className="font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col items-center justify-center text-center">
          <h2 className="text-semibold text-white text-lg mb-4">Ruta del dia</h2>
          <ul>
            {routes.map((route:any) => (
              <li key={route.client_id} className='p-4 bg-slate-900 mb-2 rounded-xl shadow border-1 border-slate-100/10'> 
              <p>{route.client_name}</p>
              <p>{route.client_address}</p>
            </li>
            ))}
          </ul>
        </main>
      </div>
    </div>

    <div className="get-section fixed top-16 right-0 h-[270px] w-[700px] border-1 border-slate-100/10">
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
    </>
  );
}
//route.client_id debido a que este endpoint recolecta informacion de cliente y la relacion que tenga con una venta
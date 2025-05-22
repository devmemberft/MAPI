
'use client'
import { useApi } from "@/app/hooks/useApi";

export default function CheckRoute() {
  const {data:routes, loading, error } = useApi('/payments/daily-route');

  if(loading) return <p className="m1">Cargando ruta del dia...</p>
  if(error) return <p className="m1 text-red-700">Error: {error}</p>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Ruta del dia</h2>
        <ul>
          {routes.map((route:any) => (
          <li key={route.client_id} className='p-4 bg-slate-500 mb-2 rounded shadow'> 
            <p>nombre del cliente: {route.client_name}</p>
            <p>direccion del cliente: {route.client_address}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
//route.client_id debido a que este endpoint recolecta informacion de cliente y la relacion que tenga con una venta
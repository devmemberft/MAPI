
'use client'
import { useApi } from '@/app/hooks/useApi';

export default function CheckClients() {
  const { data:clients, loading, error } = useApi('/clients');

  if(loading) return <p className='m-1'>Cargando clientes...</p>
  if(error) return <p className='text-red-700'>Error: {error}</p>

  return (
    <div className="items-center justify-items-center min-h-screen py-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[20px] row-start-2 items-center sm:items-start">
        <h2>Lista de clientes</h2>
        <ul className='w-full'>
          {clients?.map((client:any) => (
          <li key={client.client_id} className='p-4 bg-slate-500 mb-2 rounded shadow'>
            <p>Nombre:{client.client_name}</p>
            <p>DNI:{client.client_dni}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

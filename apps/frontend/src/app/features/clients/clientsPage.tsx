
'use client'
import { useApi } from '@/app/hooks/useApi';

export default function CheckClients() {
  const { data:clients, loading, error } = useApi('/clients');

  if(loading) return <p className='m-1'>Cargando clientes...</p>
  if(error) return <p className='text-red-700'>Error: {error}</p>

  return (
    <div className="client-list-container items-center justify-items-center h-[300px] w-[600px] px-6 py-2 font-[family-name:var(--font-geist-sans)]">
      <main className="subcontainer h-full flex flex-col items-center py-4 px-2 border-1 border-slate-100/10 bg-neutral-500/20 rounded-2xl shadow-md sm:items-start">
        <h2>Lista de clientes</h2>
        <section className="client-list h-full flex flex-row overflow-y-auto border-1 border-slate-100/10  bg-slate-900 rounded-xl shadow p-2">
            <ul className='w-full'>
              {clients?.map((client:any) => (
                <li key={client.client_id} className='p-4 bg-slate-900/30 mb-2 border-b-1 border-b-slate-100/10 shadow'>
                <p>Nombre:{client.client_name}</p>
                <p>DNI:{client.client_dni}</p>
              </li>
              ))}
            </ul>
        </section>
      </main>
    </div>
  );
}

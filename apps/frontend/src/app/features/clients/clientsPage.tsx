
'use client'
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useClientsSearch } from '@/app/hooks/useClients';
import { useApi } from '@/app/hooks/useApi';
import { ArrowDownWideNarrow, Search, Users } from 'lucide-react';

export default function CheckClients() {
  const { data:clients, loading, error } = useApi('/clients');

  if(loading) return <p className='m-1'>Cargando clientes...</p>
  if(error) return <p className='text-red-700'>Error: {error}</p>

  /*
  const [dni,setDni] = useState('');
  const [name,setName] = useState('');

  const [debounceDni] = useDebounce(dni,500);
  const [debounceName] = useDebounce(name,500);

  const {clients, loading, error } = useClientsSearch({
    dni:debounceDni,
    name:debounceName,
  })
*/
  return (
    <>
    <div className='get-section fixed top-16 h-screen w-[700px] border-r-1 border-slate-100/10'>

      <div className="client-list-container items-center justify-items-center h-[450px] w-[700px] px-6 py-2 font-[family-name:var(--font-geist-sans)]">
        
        <div className="subcontainer h-full flex flex-col items-center py-4 px-2 border-1 border-slate-100/20 bg-neutral-500/40 rounded-2xl shadow-lg sm:items-start">
          
          <section className="client-options grid grid-cols-[400px_156px] h-auto w-full justify-between items-center py-2">
            <div className='search-bar w-[400px] flex flex-row  items-center justify-between text-center border-1 border-slate-100/10  bg-slate-100/20 rounded-xl shadow px-4 py-2'>
              <ArrowDownWideNarrow />
              <p>escriba aqui</p>
              <Search />
            </div>

            <div className='create-client w-32 flex flex-row  border-1 border-slate-100/10  bg-green-800 rounded-xl shadow mx-6 px-4 py-2'><button>Crear cliente</button></div>
          </section>

          <section className='client-info-columns grid grid-cols-[80px_150px_80px_200px] w-full mt-6 px-6 py-1 justify-between text-sm font-semibold'>
            <div className='truncate overflow-auto'>cedula</div>
            <div className='truncate overflow-auto'>nombre</div>
            <div className='truncate overflow-auto'>telefono</div>
            <div className='truncate overflow-auto'>direccion</div>
          </section>

          <section className="client-list grid gap-2 h-full w-full overflow-y-scroll border-1 border-slate-100/10  bg-slate-900 rounded-xl shadow-lg p-2">
              {clients?.map((client: any) => (
                <section key={client.client_id} className='grid grid-cols-[80px_150px_80px_200px] px-4 py-2 h-10 justify-between text-sm  bg-slate-900/30 mb-2 border-b-1 border-b-slate-100/10 shadow'>
                    <div className='truncate overflow-auto'>{client.client_dni}</div>
                  
                    <div className='truncate overflow-auto'>{client.client_name}</div>

                    <div className='truncate overflow-auto'>{client.client_phone}</div>

                    <div className='truncate overflow-auto'>{client.client_address}</div>

                </section>
              ))}
          </section>

        </div>

      </div>

    </div>

    <div className='post-section fixed top-16 right-0 h-screen w-[calc(100vw-868px)] border-l-1 border-slate-100/10'>
      <div className='flex flex-col items-center justify-center h-full text-slate-500'>
        <span className='text-3xl mb-4'><Users/></span>
        <p className='text-lg'>Selecciona un cliente de la lista</p>
        <p className='text-md'>Para ver informacion y editarla</p>
        
      </div>
    </div>
    </>

  );
}

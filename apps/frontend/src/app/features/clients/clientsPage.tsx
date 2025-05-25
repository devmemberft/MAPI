
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
    <div className='search-bar'>
      <section className="flex justify-between items-center">
        <div className='w-[400px] flex flex-row items-center justify-between text-center border-1 border-slate-100/10  bg-slate-100/20 rounded-xl shadow px-4 py-2'>
          <ArrowDownWideNarrow />
          <p>escriba aqui</p>
          <Search />
        </div>

        <div className='create-client w-32 flex flex-row  items-center justify-center border-1 border-slate-100/10  bg-green-800 rounded-xl shadow px-2 py-1'><button>Crear cliente</button></div>
      </section>
    </div>

    <div className='main-section p-4 border-r-1 border-slate-100/10'>

      <div className="client-list-container m-4 p-4 items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
        
          

          <section className='client-info-columns grid grid-cols-[80px_300px_80px_300px] w-full mt-6 px-2 py-1 justify-between text-sm font-semibold'>
            <div className='truncate overflow-auto'>cedula</div>
            <div className='truncate overflow-auto'>nombre</div>
            <div className='truncate overflow-auto'>telefono</div>
            <div className='truncate overflow-auto'>direccion</div>
          </section>

        <div className="table h-full w-full overflow-y-scroll border-1 border-slate-100/20 bg-gray-200/60 rounded-2xl shadow shadow-amber-100/20">
          {clients?.map((client: any) => (
            <div key={client.client_id} className='grid grid-cols-[80px_300px_80px_300px] space-x-2 px-2 h-8 justify-between items-center text-sm border-b-1 border-b-slate-100/10 shadow'>
                <div className='truncate overflow-auto'>{client.client_dni}</div>
              
                <div className='truncate overflow-auto'>{client.client_name}</div>

                <div className='truncate overflow-auto'>{client.client_phone}</div>

                <div className='truncate overflow-auto'>{client.client_address}</div>

            </div>
          ))}

        </div>

      </div>

    </div>

    </>

  );
}

/*
    <div className='post-section fixed top-16 right-0 h-screen w-[calc(100vw-868px)] border-l-1 border-slate-100/10'>
      <div className='flex flex-col items-center justify-center h-full text-slate-500'>
        <span className='text-3xl mb-4'><Users/></span>
        <p className='text-lg'>Selecciona un cliente de la lista</p>
        <p className='text-md'>Para ver informacion y editarla</p>
        
      </div>
    </div>

*/
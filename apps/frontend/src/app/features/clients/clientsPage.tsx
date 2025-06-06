
'use client'
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useClientsSearch } from '@/app/hooks/useClients';
import { useApi } from '@/app/hooks/useApi';
import { ArrowDownWideNarrow, Pencil, Search, Users } from 'lucide-react';
import { mutate } from 'swr';
import { usePagination } from '@/app/hooks/usePagination';

interface Client {
  dni:string,
  name:string,
  address:string,
  phone:string,
}

export default function CheckClients() {

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState<Client>({ dni:'', name:'', address:'', phone:'' });

  const { data:clients, loading, error } = useApi('/clients');
 
  const {visibleItems, page, totalPages, setPage} = usePagination(10,clients ?? [],1);
  if(loading) return <p className='m-1'>Cargando clientes...</p>
  if(error) return <p className='text-red-700'>Error: {error}</p>
         

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
      <div className='space-x-2'>
        <button className="paginationButton" onClick={() => setPage(p => p - 1)} disabled={page===1}>Anterior</button>
        <button className="paginationButton" onClick={() => setPage(p => p + 1)} disabled={ page >= totalPages}>Siguiente</button>
      </div>

        <section className='client-info-columns grid grid-cols-[50px_80px_300px_80px_300px] w-full mt-6 px-2 py-1 justify-between text-sm font-semibold'>
          <div className='truncate overflow-auto'>Editar</div>
          <div className='truncate overflow-auto'>cedula</div>
          <div className='truncate overflow-auto'>nombre</div>
          <div className='truncate overflow-auto'>telefono</div>
          <div className='truncate overflow-auto'>direccion</div>
        </section>

      <div className="table h-full w-full overflow-y-scroll border-1 border-slate-100/20 bg-gray-200/60 rounded-2xl shadow shadow-amber-100/20">
        {visibleItems?.map((client: any) => (
          <div key={client.client_id} className='grid grid-cols-[50px_80px_300px_80px_300px] space-x-2 px-2 h-8 justify-between items-center text-sm border-b-1 border-b-slate-100/10 shadow'>
              
              <button className='truncate overflow-auto cursor-pointer' onClick={() => setSelectedClient(client)}><Pencil/></button>

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
{ selectedClient && (
  
)}
<Modal
      isOpen={!!selectedClient}
      onClose={()=> setSelectedClient(null)}
      title= ""
      >
      <form onSubmit={handleUpdate} className='flex flex-col space-x-2 space-y-4'>
        
        <input type="text" value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value})} className='form' placeholder='Dni'/>
        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className='form' placeholder='Nombre'/>
        <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className='form' placeholder='Direccion'/>
        <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className='form' placeholder='Telefono'/>

        <button className='w-auto f-auto rounded-xl border-1 border-neutral-800/10 bg-neutral-700/20 text-white'>Guardar Cambios</button>
      </form>
    </Modal>

    
    <div className='post-section fixed top-16 right-0 h-screen w-[calc(100vw-868px)] border-l-1 border-slate-100/10'>
      <div className='flex flex-col items-center justify-center h-full text-slate-500'>
        <span className='text-3xl mb-4'><Users/></span>
        <p className='text-lg'>Selecciona un cliente de la lista</p>
        <p className='text-md'>Para ver informacion y editarla</p>
        
      </div>
    </div>

*/




  
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

/*
useEffect(() => {
  if(selectedClient) {
    setFormData({
      dni: selectedClients.client_dni,
      name: selectedClients.client_name,
      address: selectedClients.client_address,
      phone: selectedClients.client_phone,
      });
      }
      },[selectedClient])
      
      const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/clients/${selectedClients.selectedClient?.client_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          });
          //mutate(); // swr refresh
          setSelectedClient(null);
          }
          */   
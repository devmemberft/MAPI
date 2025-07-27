'use client'
import { Pyramid, Users, BriefcaseBusiness, Package, Store, Truck, Settings, LogOut, Sprout } from 'lucide-react';
import Link from "next/link"
import ThemeToggle from './ThemeToggle';
import { useLogout } from '../../hooks/useLogout';
import { useState } from 'react';
import Modal from './edit-modal';

export function MainPanel() {
    const [logoutConfirmationModal, setLogoutConfirmationModal] = useState(false);
    const [settingsModal, setSettingsModal] = useState(false);

    return (
        <div className="static-component fixed top-6 left-6 bottom-6 right-6 justify-between items-center text-center w-18 border-1 border-black/5 shadow shadow-amber-100/5">

            <div className="flex flex-col h-auto w-auto space-y-3 mx-4 my-6 items-center text-center justify-center">

                <div title='Portafolio'><Link href='/dashboard' className='route'><BriefcaseBusiness strokeWidth={1.5} size={24} /></Link></div>
                
                <div title='Clientes'><Link href='/clients' className="route"><Users strokeWidth={1.5} size={24}/></Link></div>
                <div title='Productos'><Link href='/products' className="route"><Package strokeWidth={1.5} size={24}/></Link></div>
                <div title='Ventas'><Link href='/sales' className="route"><Store strokeWidth={1.5} size={24}/></Link></div>
                <div title='Rutas'><Link href='/routes' className="route"><Truck strokeWidth={1.5} size={24}/></Link></div>
            </div>

            <div className='fixed space-y-3 mx-4 my-98 items-center text-center justify-center'>
                
                <button onClick={ settingsModal ? () => setSettingsModal(false) : () => setSettingsModal(true) } title='Ajustes' className='route cursor-pointer'><Settings strokeWidth={1.5} size={24}/></button>
                    
                <button onClick={ logoutConfirmationModal ? () => setLogoutConfirmationModal(false) : () => setLogoutConfirmationModal(true) } title='Cerrar Sesión' className='route cursor-pointer'><LogOut strokeWidth={1.5} size={24}/></button>

            </div>


            <Modal
                title='Cerrar sesion?'
                isOpen={logoutConfirmationModal}
                onClose={ () => setLogoutConfirmationModal(false)}
                
            >
                <div className='text-xs mt-5 space-x-1'>
                    <button className='transition-colors duration-200 hover:shadow shadow-amber-100/20 py-1 px-2 cursor-pointer border-1 border-slate-100/10 rounded hover:bg-[#078d3d] hover:text-black font-semibold' onClick={ () => setLogoutConfirmationModal(false) }>Cancelar</button>
                    <button className='transition-colors duration-200 hover:shadow shadow-amber-100/20 py-1 px-2 cursor-pointer border-1 border-slate-100/10 rounded hover:bg-[#078d3d] hover:text-black font-semibold' onClick={useLogout()}>Salir</button>
                </div>
            </Modal>

            <Modal
                title='Ajustes'
                isOpen={settingsModal}
                onClose={ () => setSettingsModal(false) }
            >
                <div className='flex flex-row items-center space-x-2 mt-5 '>
                    <p className='text-xs'>Tema </p><ThemeToggle />
                </div>
            </Modal>
        </div>

);
}

/*
            <div className="flex h-12 font-semibold text-[#078d3d] border-b-1 border-b-slate-50/5 justify-center items-center text-center"> <Sprout size={30} /> </div>    


<p className='px-3'>Inicio</p>
<p className='px-3'>Clientes</p>
<p className='px-3'>Productos</p>
<p className='px-3'>Registros</p>
<p className='px-3'>Rutas</p>
<p className='px-3'>Ajustes</p>
<p className='px-3'>Salir</p>
Branding: 
<p className='px-2 font-extrabold text-2xl tracking-wide'>Miselio</p>

Interesante manera de mostrar un panel de opciones al pasar el cursor por encima de una etiqueta
<div className='relative group'>                 
    <div title='Ajustes' className='route'><Settings strokeWidth={1.5} size={20}/><p className='px-3'>Ajustes</p></div>

    <div className='
        absolute left-0 bottom-full z-50 p-1 w-15 opacity-0 scale-95 
        group-hover:opacity-100 group-hover:scale-100
        transition-all duration-200 origin-top-left
        shadow-lg rounded-2xl bg-[#191e20] border-1 border-slate-100/10
        pointer-events-auto'>
        <a href="" className='block px-2 py-1'><ThemeToggle/></a>
    </div>
</div>
*/
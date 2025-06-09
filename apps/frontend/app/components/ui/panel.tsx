'use client'
import { Pyramid, Users, BriefcaseBusiness, Package, Store, Truck, Settings, LogOut } from 'lucide-react';
import Link from "next/link"
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../hooks/useLogout';

export function MainPanel() {
    //const { user, isAuthenticated, logout } = useAuth();

    return (
        <div className="static-component h-full fixed top-0 left-0 justify-between items-center text-center w-42 border-r-1 border-r-black/5 shadow shadow-amber-100/5">
            
            <div className="flex h-12 font-semibold text-white border-b-1 border-b-slate-50/5 justify-center items-center text-center"><Pyramid /><p className='px-2 font-medium text-2xl'>Miselio</p></div>    

            <div className="flex flex-col h-auto w-38 space-y-3 m-2 my-6 items-center text-center justify-center">

                <div title='Portafolio'><Link href='/dashboard' className='route'><BriefcaseBusiness strokeWidth={1.5} size={20} /><p className='px-3'>Inicio</p></Link></div>
                
                <div title='Clientes'><Link href='/clients' className="route"><Users strokeWidth={1.5} size={20}/><p className='px-3'>Clientes</p></Link></div>
                <div title='Productos'><Link href='/products' className="route"><Package strokeWidth={1.5} size={20}/><p className='px-3'>Productos</p></Link></div>
                <div title='Ventas'><Link href='/sales' className="route"><Store strokeWidth={1.5} size={20}/><p className='px-3'>Registros</p></Link></div>
                <div title='Rutas'><Link href='/routes' className="route"><Truck strokeWidth={1.5} size={20}/><p className='px-3'>Rutas</p></Link></div>
            </div>

            <div className='flex flex-col h-auto w-38 space-y-3 mx-2 my-46 items-center text-center justify-center'>
                
                <div className='relative group'>
                    
                    <div title='Ajustes' className='route'><Settings strokeWidth={1.5} size={20}/><p className='px-3'>Ajustes</p></div>
                    
                    <div className='
                        absolute left-0 top-full z-50 p-1 w-15 opacity-0 scale-95 
                        group-hover:opacity-100 group-hover:scale-100
                        transition-all duration-200 origin-top-left
                        shadow-lg rounded-2xl bg-[#191e20] border-1 border-slate-100/10
                        pointer-events-auto'>
                        <a href="" className='block px-2 py-1'><ThemeToggle/></a>
                    </div>
                </div>

                
                <button onClick={useLogout()} title='Cerrar Sesión' className='route'><LogOut strokeWidth={1.5} size={20}/><p className='px-3'>Salir</p></button>

            </div>


        </div>
    );
}

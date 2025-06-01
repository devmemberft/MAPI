'use client'
import { Pyramid, Users, BriefcaseBusiness, Package, Store, Truck, Settings, LogOut } from 'lucide-react';
import Link from "next/link"
import ThemeToggle from './ThemeToggle';

export function MainPanel() {
    return (
        <div className="static-component h-full fixed top-0 left-0 justify-between items-center text-center w-42 border-r-1 border-r-black/10 shadow">
            <div className="flex h-12 font-semibold text-slate-600 border-b-1 border-black/10 justify-center items-center text-center"><Pyramid /></div>    

            <div className="flex flex-col h-auto w-38 space-y-3 m-2 my-6 items-center text-center justify-center">

                <div title='Portafolio'><Link href='/' className='route'><BriefcaseBusiness strokeWidth={1.5} size={20} /><p className='px-3'>Inicio</p></Link></div>
                <div title='Clientes'><Link href='/clients' className="route"><Users strokeWidth={1.5} size={20}/><p className='px-3'>Clientes</p></Link></div>
                <div title='Productos'><Link href='/products' className="route"><Package strokeWidth={1.5} size={20}/><p className='px-3'>Productos</p></Link></div>
                <div title='Ventas'><Link href='/sales' className="route"><Store strokeWidth={1.5} size={20}/><p className='px-3'>Registros</p></Link></div>
                <div title='Rutas'><Link href='/routes' className="route"><Truck strokeWidth={1.5} size={20}/><p className='px-3'>Rutas</p></Link></div>
            </div>

            <div className='flex flex-col h-auto w-38 space-y-3 m-2 items-center text-center justify-center'>
                <div title='Ajustes'><Link href='/settings' className="route"><Settings strokeWidth={1.5} size={20}/><p className='px-3'>Ajustes</p></Link></div>
                <div title='Cerrar Sesión'><Link href='/login' className="route"><LogOut strokeWidth={1.5} size={20}/><p className='px-3'>Salir</p></Link></div>
                <div className="flex hover:text-slate-100/80 hover:bg-slate-100/10 hover:rounded"><ThemeToggle /></div>
            </div>

        </div>
    );
}
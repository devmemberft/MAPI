'use client'
import { Pyramid, Users, BriefcaseBusiness, Package, Store, Truck, Settings, LogOut } from 'lucide-react';
import Link from "next/link"
import ThemeToggle from './ThemeToggle';

export function MainPanel() {
    return (
        <main className="">
            <div className="static-component min-h-full fixed top-0 left-0 justify-between items-center w-42 border-r-1 border-r-black/10 shadow">
                <div className="flex items-center text-center justify-center text-xl font-semibold w-full h-16"><Pyramid /></div>

                <ul className="flex flex-col justify-start items-start space-y-6 p-2 mt-6 h-screen w-full">

                    <li><Link href='/' className='route'><BriefcaseBusiness/><p className='px-2'>Portafolio</p></Link></li>
                    <li><Link href='/clients' className="route"><Users/><p className='px-2'>Clientes</p></Link></li>
                    <li><Link href='/products' className="route"><Package/><p className='px-2'>Productos</p></Link></li>
                    <li><Link href='/sales' className="route"><Store/><p className='px-2'>Ventas</p></Link></li>
                    <li><Link href='/routes' className="route"><Truck/><p className='px-2'>Rutas</p></Link></li>
                    <li><Link href='/settings' className="route"><Settings/><p className='px-2'>Ajustes</p></Link></li>
                    <li><Link href='/login' className="route"><LogOut/><p className='px-2'>Salir</p></Link></li>
                    <li className="flex w-36 hover:text-slate-100/80 hover:bg-slate-100/10 hover:rounded"><ThemeToggle /></li>
                </ul>
            </div>
        </main>
    );
}
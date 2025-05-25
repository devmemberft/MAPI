'use client'
import { Pyramid, Users, BriefcaseBusiness, Package, Store, Truck, Settings, LogOut } from 'lucide-react';
import Link from "next/link"
import ThemeToggle from './ThemeToggle';

export function MainPanel() {
    return (
        <main className="">
            <div className="static-component min-h-full fixed top-0 left-0 p-2 justify-between items-center w-18 border-r-1 border-r-black/10 shadow">

                <div className="flex flex-col h-screen items-center text-center space-y-6 justify-center w-full">

                    <div className="route"><Pyramid /></div>
                    <div title='Portafolio'><Link href='/' className='route'><BriefcaseBusiness/></Link></div>
                    <div title='Clientes'><Link href='/clients' className="route"><Users/></Link></div>
                    <div title='Productos'><Link href='/products' className="route"><Package/></Link></div>
                    <div title='Ventas'><Link href='/sales' className="route"><Store/></Link></div>
                    <div title='Rutas'><Link href='/routes' className="route"><Truck/></Link></div>
                    <div title='Ajustes'><Link href='/settings' className="route"><Settings/></Link></div>
                    <div title='Cerrar Sesión'><Link href='/login' className="route"><LogOut/></Link></div>
                    <div className="flex hover:text-slate-100/80 hover:bg-slate-100/10 hover:rounded"><ThemeToggle /></div>
                </div>
            </div>
        </main>
    );
}
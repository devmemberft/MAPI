'use client'
import { Pyramid, Users, BriefcaseBusiness, Package, Store, Truck, Settings, LogOut } from 'lucide-react';
import Link from "next/link"

export function MainPanel() {
    return (
        <main className="">
            <div className="min-h-full fixed top-0 left-0 justify-between items-center w-42 bg-black border-r-1 border-r-slate-100/10 shadow">
                <div className="flex items-center text-center justify-center text-xl font-semibold w-full h-16"><Pyramid /></div>

                <ul className="flex flex-col justify-start items-start space-y-6 p-2 h-screen w-full">
                    <li><Link href='/' className='flex font-semibold text-slate-600 px-4 py-1 shadow hover:text-slate-100/80 hover:bg-slate-100/10 hover:rounded'><BriefcaseBusiness/><p className='px-2'>Portafolio</p></Link></li>
                    <li><Link href='/clients' className="flex  w-full bg-transparent font-semibold text-slate-600 px-4 py-1 shadow hover:text-white hover:border-b-1 border-b-slate-100/20"><Users/><p className='px-2'>Clientes</p></Link></li>
                    <li><Link href='/products' className="flex bg-transparent text-slate-600 font-semibold px-4 py-1  shadow hover:text-white hover:border-b-1 border-b-slate-100/20"><Package/><p className='px-2'>Productos</p></Link></li>
                    <li><Link href='/sales' className="flex  bg-transparent text-slate-600 font-semibold px-4 py-1  shadow hover:text-white hover:border-b-1 border-b-slate-100/20"><Store/><p className='px-2'>Ventas</p></Link></li>
                    <li><Link href='/routes' className="flex  bg-transparent text-slate-600 font-semibold px-4 py-1  shadow hover:text-white hover:border-b-1 border-b-slate-100/20"><Truck/><p className='px-2'>Rutas</p></Link></li>
                    <li><Link href='/routes' className="flex font-semibold text-slate-600 px-4 py-1  shadow hover:text-white hover:border-b-1 hover:border-b-slate-100/10"><Settings/><p className='px-2'>Config</p></Link></li>
                    <li><Link href='/routes' className="flex font-semibold text-slate-600 px-4 py-1  shadow hover:text-white hover:border-b-1 hover:border-b-slate-100/20"><LogOut/><p className='px-2'>Salir</p></Link></li>
                </ul>
            </div>
        </main>
    );
}
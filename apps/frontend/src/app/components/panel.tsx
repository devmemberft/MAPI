'use client'

import Link from "next/link"

export function MainPanel() {
    return (
        <main className="">
            <div className="min-h-full fixed top-0 left-0 justify-between items-center w-48 bg-white border-r-1 border-r-slate-100/10 shadow">
                <h2 className="flex text-center justify-center text-2xl font-semibold p-1 m-1 w-full h-auto">Administración</h2>
                <ul className="flex flex-col space-y-1 h-screen w-full">
                    <li><Link href='/' className='flex w-full bg-white text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90 hover:shadow-md'>Resumen</Link></li>
                    <li><Link href='/clients' className="flex w-full bg-white text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/95 hover:shadow-md">Clientes</Link></li>
                    <li><Link href='/products' className="flex w-full bg-white text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90">Productos</Link></li>
                    <li><Link href='/sales' className="flex w-full bg-white text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90">Ventas</Link></li>
                    <li><Link href='/routes' className="flex w-full bg-white text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90">Ruta del dia</Link></li>
                </ul>
            </div>
        </main>
    );
}
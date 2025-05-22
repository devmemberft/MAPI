'use client'

import Link from "next/link";

export default function Home() {

  return (
      <main className="flex h-auto w-auto justify-between">
        <div className="flex flex-row justify-between items-center w-full border-b-1 border-b-slate-500">
          <h2 className="flex text-2xl text-white p-1 m-2">Menu principal</h2>
            <ul className="flex flex-row p-1 m-2 space-x-4">
              <li><Link href='/clients' className="bg-white text-slate-600 font-semibold p-1 rounded shadow hover:bg-white/90">Ver lista de clientes</Link></li>
              <li><Link href='/products' className="bg-white text-slate-600 font-semibold p-1 rounded shadow hover:bg-white/90">Ver lista de productos</Link></li>
              <li><Link href='/sales' className="bg-white text-slate-600 font-semibold p-1 rounded shadow hover:bg-white/90">Ver lista de ventas</Link></li>
              <li><Link href='/routes' className="bg-white text-slate-600 font-semibold p-1 rounded shadow hover:bg-white/90">Ver la ruta de hoy</Link></li>
            </ul>
        </div>
      </main>
  );
}

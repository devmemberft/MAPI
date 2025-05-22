'use client'

import Link from "next/link";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Menu principal</h2>
          <ul>
            <li><Link href='/clients'>Ver lista de clientes</Link></li>
            <li><Link href='/products'>Ver lista de productos</Link></li>
            <li><Link href='/sales'>Ver lista de ventas</Link></li>
            <li><Link href='/routes'>Ver la ruta de hoy</Link></li>
          </ul>
      </main>
    </div>
  );
}

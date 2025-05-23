'use client'

import Link from "next/link"

export function MainPanel() {
    return (
        <main className="">
            <div className="min-h-full fixed top-0 left-0 justify-between items-center w-42 bg-neutral-900 border-r-1 border-r-slate-100/10 shadow">
                <h2 className="flex items-center text-center justify-center text-xl font-semibold w-full h-16">Artecol</h2>

                <ul className="flex flex-col justify-start items-start space-y-6 p-6 h-screen w-auto">
                    <li><Link href='/' className='flex bg-transparent text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90 hover:shadow-md'>R</Link></li>
                    <li><Link href='/clients' className="flex  bg-transparent font-semibold px-6 py-1 rounded shadow hover:bg-white/95 hover:shadow-md">C</Link></li>
                    <li><Link href='/products' className="flex bg-transparent text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90">P</Link></li>
                    <li><Link href='/sales' className="flex  bg-transparent text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90">V</Link></li>
                    <li><Link href='/routes' className="flex  bg-transparent text-slate-600 font-semibold px-6 py-1 rounded shadow hover:bg-white/90">R</Link></li>
                </ul>
            </div>
        </main>
    );
}
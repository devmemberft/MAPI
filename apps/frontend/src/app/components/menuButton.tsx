'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BackToMenuButton() {
    const pathname = usePathname();
    if (pathname === '/') return null;
    
    return (
        <li><Link href='/' className='h-[27px] m-2 text-center justify-center fixed top-2 right-2 z-50 bg-white text-slate-600 font-semibold p-1 rounded shadow hover:bg-white/90'>Menú principal</Link></li>
    )
}
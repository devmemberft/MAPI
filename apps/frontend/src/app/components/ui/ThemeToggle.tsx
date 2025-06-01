'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(()=> setMounted(true),[]);

    if(!mounted) return null;

    return(
        <>
            <button
                onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex w-38 px-2 py-1 text-slate-600 cursor-pointer hover:bg-neutral-400/60 hover:rounded"
            >
                {theme === 'dark' ? <Sun className='w-5 h-5 items-center justify-center text-center'/> : <Moon className='w-5 h-5 items-center justify-center text-center'/>}
            </button>
        </>
    );
}
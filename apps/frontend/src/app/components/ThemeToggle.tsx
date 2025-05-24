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
                className="px-4 py-2 text-slate-600/40 cursor-pointer hover:text-white"
            >
                {theme === 'dark' ? <Sun/> : <Moon/>}
            </button>
        </>
    );
}
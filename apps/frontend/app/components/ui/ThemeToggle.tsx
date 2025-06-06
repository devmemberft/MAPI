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
                className="flex w-auto px-2 py-1 cursor-pointer"
            >
                {theme === 'dark' ? <Sun strokeWidth={1.5} size={20}/> : <Moon strokeWidth={1.5} size={20}/>}
            </button>
        </>
    );
}
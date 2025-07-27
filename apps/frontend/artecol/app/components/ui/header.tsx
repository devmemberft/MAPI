'use client'
import { CircleUser, Search } from "lucide-react";
export function PersistentHeader() {
    return (
      <header className="static-component fixed left-42 right-0 w-100% h-16  border-b-1 border-b-black/10">
        <div className="header-subcontainer flex flex-row justify-between items-center">
            <div className="header-items flex flex-row h-16 w-full justify-between items-center px-4">

                <div className=""><p className="text-lg text-slate-100/10">Nombre de la ruta actual</p></div>

                <div className="search flex flex-row rounded-2xl border-1 border-slate-100/10 py-1 px-4">
                    <p className="enter-search text-slate-100/10 items-center justify-center text-center px-2">Escriba aqui</p>
                    <button className="click-searh items-center justify-start text-start pl-2"><Search /></button>
                </div>

                <div  className="notifications flex flex-row rounded-2xl border-1 border-slate-100/10 py-1 px-4"><p className="text-slate-100/10 text-center items-center justify-center">Notificaciones</p></div>

                <div className="date flex flex-row rounded-2xl border-1 border-slate-100/10 bg-neutral-700 py-1 px-4"><p className="text-slate-100/10 text-center items-center justify-center">fecha hoy</p></div>

                <div className="profile flex">
                    <div className="flex flex-row w-auto h-auto p-2">

                        <div className="profile-picture m-2"><CircleUser/></div>
                        <div className="profile-info">
                            <p className="text-md text-center justify-center items-center">info perfil</p> 
                            <p className="text-xs text-center justify-center items-center">info perfil</p>
                        </div>
                    </div>
                </div>
            </div>         
        </div>
      </header>  
    );
}
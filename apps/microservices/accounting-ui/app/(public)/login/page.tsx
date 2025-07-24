'use client'

import { LogIn, KeySquare, SquareUserRound, UserPlus } from "lucide-react";
import { useLogin } from "../../hooks/useLogin";

export default function login() {

    const { handleLogin, accessKey, setAccessKey, loading, errorMsg} = useLogin(() => (window.location.href="/api/finances/transactions"));

    const formattedInput = (e:any) => {
        const raw = e.target.value.replace(/-/g,'').toUpperCase();
        const formatted = raw.match(/.{1,4}/g)?.join('-') || '';
        return formatted;
    }
    return(
        <div className="login-main-container h-screen w-screen">

            <div className="flex items-center justify-center h-screen m-0.1 p-4">
                    
                    <div className="w-full space-y-3">
                        
                        <div className="items-center text-center justify-center">
                            <div className="flex w-full text-white/80 justify-center items-center text-center">
                                <SquareUserRound size={50}/>
                            </div>
                            <h2 className="text-2xl text-white/80 font-semibold">Bienvenido de nuevo</h2>
                            <p className="text-white/60">Ingresa tu llave privada</p>
                        </div>

                        <form onSubmit={handleLogin}>

                            <div className="py-2">
                                <label htmlFor="loginkey" className="text-sm text-white/80" >Llave de acceso</label>
                                <div className="flex flex-row w-full h-full p-2 border-1 tracking-wider border-slate-500/10 rounded text-white/80">
                                    <KeySquare/>
                                    <input required value={accessKey} onChange={(e) => setAccessKey(formattedInput(e))} maxLength={24} placeholder="ABCD-FGHI-JKLM-NOPQ-E234" className="w-full h-full px-2 text-sm text-white/80" type="text" />
                                </div>
                            </div>

                            {errorMsg && (<p className="text-white/60 px-1">{errorMsg}</p>)}
                            
                            <button type="submit" disabled={loading} className="flex flex-row items-center justify-center w-full mt-4 mb-2 py-1 rounded  bg-[#07af4a] shadow-green-400 shadow-xs text-black/80 text-lg font-medium tracking-normal border-2 border-slate-500/10 cursor-pointer hover:bg-[#07af4ad7] transition-colors duration-200"><LogIn size={18}/><p className="px-2 text-lg font-semibold">{loading ? "INGRESANDO..." : 'ACCEDER'}</p></button>
                            <div className="w-full border-1 border-white/10 my-8"></div>

                            <p className="text-sm text-center text-white/60 w-full">No tienes aún una cuenta anonima?</p>
                            <button type="submit" className="flex flex-row w-full items-center justify-center text-center my-2 py-1 rounded bg-gray-400 shadow-xs text-black/80 tracking-normal border-2 border-slate-500/10 cursor-pointer hover:bg-gray-700/80 transition-colors duration-200 "><UserPlus size={18}/><p className="px-2 text-lg font-semibold">CREAR CUENTA</p></button>

                        </form>

                    </div>

                </div>

        </div>
    );
}
/*
<div className="login-card p-4 m-6 bg-[#101413] border-1 border-white/10 w-100 h-100">
</div>
*/
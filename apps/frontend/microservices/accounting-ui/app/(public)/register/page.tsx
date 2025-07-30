'use client'

import { LogIn, ArrowRight, SquareUserRound, UserPlus } from "lucide-react";
import { useRegister } from "../../hooks/useRegister";
import { generateCatpcha } from "../../utils/apiClient";
import { useState } from "react";

export default function register() {
    const [gen_captcha_value, setGenCaptchaValue] = useState(() => generateCatpcha());
    const { captcha_value, setCaptchaValue,handleRegister, loading, errorMsg } = useRegister(() => (window.location.href="/postregister"));
    return(
        <div className="register-main-container h-screen w-screen">

            <div className="flex items-center justify-center h-screen m-0.1 p-4">
                
                <div className="w-full space-y-3">
                    
                    <div className="items-center text-center justify-center">
                        <div className="flex w-full text-white/80 justify-center items-center text-center">
                            <SquareUserRound size={50}/>
                        </div>
                        <h2 className="text-2xl text-white/80 font-semibold">Registra una nueva cuenta</h2>
                        <p className="text-white/60">sin informacion personal, 100% anonima</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="captcha-code flex flex-row py-2">
                            <div className="flex flex-row w-full h-full p-2 border-1 text-center items-center justify-center tracking-[1em] text-sm border-slate-500/10 rounded text-white/80">
                                {gen_captcha_value}
                            </div>
                            
                            <div className="flex w-auto h-auto items-center text-center justify-center px-2 text-white/40"><ArrowRight size={24}/></div>
                            
                            <div className="flex flex-row w-full h-full p-2 border-1 tracking-wider border-slate-500/10 rounded text-white/80">
                                <input required value={captcha_value} onChange={(e) => setCaptchaValue(e.target.value)} maxLength={6} placeholder="000000" className="w-full h-full text-center items-center justify-center tracking-[1em] text-sm text-white/80" type="text" />
                            </div>
                        </div>

                        {errorMsg && (<p className="text-white/60 px-1">{errorMsg}</p>)}
                        
                        <button type="submit" disabled={loading} className="flex flex-row items-center justify-center w-full mt-4 mb-2 py-1 rounded  bg-[#07af4a] shadow-green-400 shadow-xs text-black/80 text-lg font-medium tracking-normal border-2 border-slate-500/10 cursor-pointer hover:bg-[#07af4ad7] transition-colors duration-200"><LogIn size={18}/><p className="px-2 text-lg font-semibold">{loading ? "CREANDO..." : 'CREAR CUENTA'}</p></button>

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
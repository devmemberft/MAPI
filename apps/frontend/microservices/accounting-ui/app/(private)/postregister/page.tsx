'use client'

import { LogIn, MessageSquareWarning } from "lucide-react";

export default function postregister() {
    return(
        <div className="postregister-main-container h-screen w-screen">

            <div className="flex items-center justify-center h-screen m-0.1 p-4">
                
                <div className="w-full space-y-3">
                    
                    <div className="items-center text-center justify-center">
                        <div className="flex flex-col w-full text-white/80 justify-center items-center text-center">
                            <MessageSquareWarning size={50}/>
                            <h2 className="text-2xl text-white/80 font-semibold">AVISO IMPORTANTE</h2>
                        </div>
                    </div>

                        <div className="warning flex py-2">
                            <div className="flex flex-col w-full h-full p-2 border-1 justify-center border-slate-500/10 rounded text-white/80">
                                <p className="text-white/60">Esta es su llave privada de acceso</p>
                                <div className="flex flex-col w-full h-full p-2 border-1 items-center text-center justify-center border-slate-500/50 rounded text-white/80">
                                    <p>ABCD-DCAS-CDAD-CDASD</p>
                                </div>
                                
                                <p className="text-white/60">Copiela y guardela en un lugar seguro, pues no tiene recuperacion.</p>
                                <div className="py-6">
                                    <form>
                                        <input type="checkbox" /> He copiado mi llave privada de acceso
                                        <button type="submit" className="flex flex-row items-center justify-center w-full mt-4 mb-2 py-1 rounded  bg-[#07af4a] shadow-green-400 shadow-xs text-black/80 text-lg font-medium tracking-normal border-2 border-slate-500/10 cursor-pointer hover:bg-[#07af4ad7] transition-colors duration-200"><LogIn size={18}/><p className="px-2 text-lg font-semibold">CONTINUAR</p></button>
                                    </form>

                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}
/*

*/
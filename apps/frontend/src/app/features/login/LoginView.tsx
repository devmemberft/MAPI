import { LogIn } from "lucide-react";

export default function LoginView(){
    return(
        <>
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-120 p-8 bg-linear-30 from-#191e20 via-slate-800/40 to-#191e20 border-1 border-slate-100/10 rounded-2xl shadow">

                <div className="w-full space-y-3">
                    <div className="items-center text-center font-semibold">
                        <p>Bienvenido a PayCo</p>
                    </div>

                    <div className="p-1">
                        <p>Email</p>
                        <input  placeholder="Ingresa tu correo" className="w-full p-2 border-2 border-slate-500/10 rounded" type="text" />
                    </div>

                    <div className="p-1">
                        <div className="justify-between flex flex-row">
                            <p>Contraseña</p>
                            <p className="text-white/10">La olvidaste?</p>
                        </div>

                        <input placeholder="Ingresa tu contraseña" className="w-full p-2 border-2 border-slate-500/10 rounded" type="text" />
                    </div>

                    <button className="w-full rounded  bg-slate-800 border-2 border-slate-500/10 cursor-pointer">Iniciar Sesion</button>
                    <div className="items-center text-center font-light text-white/60"><p>Registrarse</p></div>
                </div>

            </div>

        </div>
        </>
    );
}
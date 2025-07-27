import { useLogin } from "../../hooks/useLogin";
import { LogIn } from "lucide-react";

export default function LoginView(){
    const {
        email,setEmail,password,setPassword,errorMsg,loading,handleLogin,
    } = useLogin(() => {window.location.href="/dashboard"}); //useRouter().push("/")

    return(
        <>
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center w-120 p-8 bg-linear-30 from-#191e20 via-[#078d3d]/5 to-#191e20 border-1 border-slate-100/10 rounded-2xl shadow">

                <div className="w-full space-y-3">
                    <div className="items-center text-center font-semibold">
                        <p>Bienvenido de nuevo</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="py-2">
                            <label htmlFor="email">Email</label>
                            <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresa tu correo" className="w-full p-2 border-2 tracking-wider border-slate-500/10 rounded" type="text" />
                        </div>

                        <div className="py-2">
                            <div className="justify-between flex flex-row">
                                <label htmlFor="password">Contraseña</label>
                                <p className="text-white/10">La olvidaste?</p>
                            </div>

                            <input required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingresa tu contraseña" className="w-full p-2 border-2 tracking-wider border-slate-500/10 rounded" type="text" />
                        </div>

                        {errorMsg && (<p className="px-2">{errorMsg}</p>)}
                        
                        <button type="submit" disabled={loading} className="flex flex-row items-center justify-center w-full mt-4 mb-2 py-1 rounded  bg-[#07af4a] shadow-green-400 shadow-xs text-black/80 text-lg font-medium tracking-wider border-2 border-slate-500/10 cursor-pointer hover:bg-[#07af4ad7] transition-colors duration-200"><LogIn size={18}/>{loading ? "Iniciando..." : "Iniciar Sesion"}</button>
                        <button className="w-full items-center text-center font-light text-white/60"><p>Registrarse</p></button>

                    </form>

                </div>

            </div>

        </div>
        </>
    );
}
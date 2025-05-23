'use client'

export function PersistentHeader() {
    return (
      <header className="header-container fixed left-42 right-0 w-100% h-16 bg-neutral-900 border-b-1 border-b-slate-100/10">
        <div className="header-subcontainer flex flex-row justify-between items-center">
            <div className="header-items flex flex-row h-full w-full justify-between items-center py-2 px-4">

                <div className="route "><p className="text-lg text-slate-100/10">Nombre de la ruta actual</p></div>

                <div className="search flex flex-row rounded-2xl border-1 border-slate-100/10 py-1 px-4">
                    <button className="click-searh text-slate-100/10 items-center justify-start text-start px-2">lupa</button>
                    <p className="enter-search text-slate-100/10 items-center justify-center text-center px-2">Escriba aqui</p>
                </div>

                <div  className="notifications flex flex-row rounded-2xl border-1 border-slate-100/10 py-1 px-4"><p className="text-slate-100/10 text-center items-center justify-center">Notificaciones</p></div>

                <div className="date flex flex-row rounded-2xl border-1 border-slate-100/10 bg-neutral-700 py-1 px-4"><p className="text-slate-100/10 text-center items-center justify-center">fecha hoy</p></div>

                <div className="profile flex flex-row">
                    <div className="profile-picture"><p>Imagen</p></div>
                    <div className="profile-info">
                        <p className="text-lg text-center justify-center items-center">info perfil</p> 
                        <p className="text-sm text-center justify-center items-center">info perfil</p>
                    </div>
                </div>
            </div>
            
            
            
        </div>
      </header>  
    );
}
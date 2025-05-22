'use client'

export function PersistentHeader() {
    return (
      <header className="fixed left-48 right-0 w-100% h-16 bg-slate-800">
        <ul className="flex flex-row justify-between items-center p-4">
            <li>Fecha y hora</li>
            <li>Busqueda</li>
            <li>Notificaciones</li>
            <li>Perfil</li>
        </ul>
      </header>  
    );
}
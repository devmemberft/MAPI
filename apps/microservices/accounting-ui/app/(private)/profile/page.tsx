export default function Profile() {
  return (
    <main className="min-h-screen p-4 bg-transparent">
      <h1 className="text-xl font-bold mb-4">Perfil</h1>

      <section className="bg-gray-100 rounded-xl p-4 mb-6">
        <p className="text-sm">Usuario anónimo</p>
        <p className="text-xs text-gray-500">Token activo: ****-****-1234</p>
      </section>

      <div className="space-y-3">
        <button className="w-full text-left bg-white border rounded-xl p-3">Exportar datos</button>
        <button className="w-full text-left bg-white border rounded-xl p-3">Cambiar idioma</button>
        <button className="w-full text-left bg-white border rounded-xl p-3">Resetear todo</button>
        <button className="w-full text-left bg-red-100 text-red-700 p-3 rounded-xl">Cerrar sesión</button>
      </div>
    </main>
  )
}

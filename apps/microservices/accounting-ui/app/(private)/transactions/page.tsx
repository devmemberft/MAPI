export default function AddTransaction(){
    return(
        <main className="min-h-screen p-4 bg-transparent">
            <h1 className="text-xl font-bold mb-4">Nueva Transacción</h1>

            <form className="space-y-4">
                <input
                type="number"
                placeholder="Monto"
                className="w-full p-3 border rounded-xl"
                />

                <select className="w-full p-3 border rounded-xl">
                <option>Categoría</option>
                <option>Comida</option>
                <option>Transporte</option>
                </select>

                <textarea
                placeholder="Descripción (opcional)"
                className="w-full p-3 border rounded-xl"
                />

                <div className="flex gap-4">
                <button type="submit" className="flex-1 bg-green-500 text-white p-3 rounded-xl">Guardar</button>
                <button type="reset" className="flex-1 bg-gray-200 text-black p-3 rounded-xl">Cancelar</button>
                </div>
            </form>
        </main>
    );
}
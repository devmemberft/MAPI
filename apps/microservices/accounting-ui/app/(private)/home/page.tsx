
export default function Home(){
    return(
        <div className="home-main-container max-w-md mx-auto px-4">

            <main className="min-h-screen p-4 bg-transparent text-gray-900">
                <h1 className="text-xl font-bold mb-4">Resumen General</h1>

                <section className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-100 rounded-2xl p-4 shadow">
                    <p className="text-sm">Ingresos</p>
                    <p className="text-lg font-semibold text-green-700">$1,500</p>
                    </div>
                    <div className="bg-red-100 rounded-2xl p-4 shadow">
                    <p className="text-sm">Gastos</p>
                    <p className="text-lg font-semibold text-red-700">$800</p>
                    </div>
                    <div className="bg-blue-100 rounded-2xl p-4 shadow col-span-2">
                    <p className="text-sm">Balance</p>
                    <p className="text-xl font-bold text-blue-700">$700</p>
                    </div>
                    <p>ahorros</p>
                    <p>reportes</p>
                    <p>registro de transacciones</p>
                </section>

                <button className="w-full bg-black text-white rounded-xl p-3">+ Nueva Transacción</button>
            </main>

        </div>
    );
}
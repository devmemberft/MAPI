export default function Savings(){
    return(
        <main className="min-h-screen p-4 bg-transparent text-gray-900">
            <h1 className="text-xl font-bold mb-4">Mis Ahorros</h1>

            <div className="space-y-4">
                <div className="bg-yellow-100 rounded-xl p-4 shadow">
                <p className="text-sm font-medium">Viaje a Medellín</p>
                <div className="w-full bg-yellow-200 h-2 rounded mt-2 mb-1">
                    <div className="bg-yellow-500 h-2 w-[60%] rounded" />
                </div>
                <p className="text-xs text-right">60% - $600 / $1,000</p>
                </div>

                <div className="bg-indigo-100 rounded-xl p-4 shadow">
                <p className="text-sm font-medium">Laptop nueva</p>
                <div className="w-full bg-indigo-200 h-2 rounded mt-2 mb-1">
                    <div className="bg-indigo-600 h-2 w-[30%] rounded" />
                </div>
                <p className="text-xs text-right">30% - $300 / $1,000</p>
                </div>
            </div>

            <button className="mt-6 w-full bg-black text-white rounded-xl p-3">+ Nueva Meta</button>
        </main>
    );
}
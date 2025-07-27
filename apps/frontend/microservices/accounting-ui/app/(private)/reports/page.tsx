export default function Transactions() {
  return (
    <main className="min-h-screen p-4 bg-transparent">
      <h1 className="text-xl font-bold mb-4">Historial</h1>

      <div className="space-y-3">
        {[
          { type: 'Ingreso', amount: 300, desc: 'Pago freelance', date: '12 Jun' },
          { type: 'Gasto', amount: 50, desc: 'Uber', date: '11 Jun' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center bg-gray-100 rounded-xl p-3 shadow">
            <div>
              <p className="text-sm font-semibold">{item.desc}</p>
              <p className="text-xs text-gray-500">{item.date}</p>
            </div>
            <p className={`text-sm font-bold ${item.type === 'Ingreso' ? 'text-green-600' : 'text-red-600'}`}>
              {item.type === 'Ingreso' ? '+' : '-'}${item.amount}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

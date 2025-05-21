
'use client'
import React, { useEffect, useState } from 'react';

export default function Home() {

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/payments/daily-route")
      .then((res) => res.json())
      .then(setRoutes)
      .catch((err) => console.error("Error fetching route: ", err));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Ruta del dia</h2>
        <ul>
          {routes.map((route:any) => (
          <li className='p-4 bg-white rounded shadow'>
            <p>nombre del cliente: {route.client_name}</p>
            <p>direccion del cliente: {route.client_address}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

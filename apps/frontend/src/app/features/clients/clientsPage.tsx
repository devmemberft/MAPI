
'use client'
import React, { useEffect, useState } from 'react';

export default function CheckClients() {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/clients")
      .then((res) => res.json())
      .then(setClients)
      .catch((err) => console.error("Error fetching clients: ", err));
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>Lista de clientes</h2>
        <ul>
          {clients.map((client:any) => (
          <li className='p-4 bg-white rounded shadow'>
            <p>Nombre:{client.client_name}</p>
            <p>DNI:{client.client_dni}</p>
          </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

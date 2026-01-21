"use client";

import { useState, useEffect } from 'react';

// Tipagem dos dados do Python (Sensores)
interface SensorData {
  sensor_id: string;
  sala: string;
  valor: number;
  timestamp: string;
}

// Tipagem dos dados do Laravel (Salas)
interface Room {
  id: number;
  name: string;
  block: string | null;
  capacity: number;
}

export default function Dashboard() {
  // Estados para Sensores (Python)
  const [readings, setReadings] = useState<SensorData[]>([]);
  const [loadingSensors, setLoadingSensors] = useState(true);

  // Estados para Salas (Laravel)
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  // 1. Busca dados do Python (Porta 5001)
  const fetchSensorData = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/sensor');
      if (res.ok) {
        const data = await res.json();
        setReadings(data);
      }
    } catch (error) {
      console.error("Erro no Python:", error);
    } finally {
      setLoadingSensors(false);
    }
  };

  // 2. Busca dados do Laravel (Porta 8000)
  const fetchRooms = async () => {
    try {
      // O Laravel roda na 8000
      const res = await fetch('http://localhost:8000/api/rooms');
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    } catch (error) {
      console.error("Erro no Laravel:", error);
    } finally {
      setLoadingRooms(false);
    }
  };

  // Efeito inicial e Polling
  useEffect(() => {
    fetchSensorData();
    fetchRooms(); // Busca as salas ao carregar

    // Atualiza sensores a cada 2s (Salas não precisam atualizar tanto)
    const interval = setInterval(fetchSensorData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <header className="mb-8 flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Smart SENAI</h1>
          <p className="text-gray-500">Dashboard Integrado (Laravel + Python + Next.js)</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">Laravel: 8000</span>
           <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">Python: 5001</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* --- COLUNA 1: PYTHON (SENSORES) --- */}
        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-700">
            📡 Monitoramento (IoT)
          </h2>
          
          {loadingSensors ? (
            <p className="text-gray-400">Carregando sensores...</p>
          ) : readings.length === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-gray-500">Nenhum dado de sensor recebido.</p>
              <p className="text-xs text-gray-400 mt-1">Use o cURL na porta 5001 para enviar.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sala</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Valor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {readings.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 text-sm text-gray-600">{item.sala}</td>
                      <td className="px-4 py-2 font-bold text-indigo-600">{item.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* --- COLUNA 2: LARAVEL (SALAS) --- */}
        <section className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-red-700">
              🏫 Salas (Gestão)
            </h2>
            <button 
              onClick={fetchRooms} 
              className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600"
            >
              Atualizar
            </button>
          </div>

          {loadingRooms ? (
             <p className="text-gray-400">Conectando ao Laravel...</p>
          ) : rooms.length === 0 ? (
            <div className="text-center p-4 bg-gray-50 rounded border border-dashed border-gray-300">
              <p className="text-gray-500">Nenhuma sala cadastrada.</p>
              <p className="text-xs text-gray-400 mt-1">Use o cURL na porta 8000 para criar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {rooms.map((room) => (
                <div key={room.id} className="p-4 border rounded-lg hover:shadow-md transition bg-gray-50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">{room.name}</h3>
                    <p className="text-sm text-gray-500">{room.block || 'Sem bloco'}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400">Capacidade</span>
                    <span className="font-mono text-lg font-semibold text-red-600">{room.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
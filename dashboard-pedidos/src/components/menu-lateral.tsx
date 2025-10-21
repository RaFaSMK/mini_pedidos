"use client"

import { LogOut, Menu, Package, ShoppingCart, Users, Home } from "lucide-react"
import { useState } from "react";

export default function MenuLateral() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('clientes');


  return <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-linear-to-b from-emerald-900 to-emerald-800 min-h-screen transition-all duration-300 flex flex-col`}>
    <div className="p-6 flex items-center justify-between border-b border-emerald-700">
      {sidebarOpen && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Package className="text-emerald-600" size={20} />
          </div>
          <span className="text-white font-bold text-xl">Oticket</span>
        </div>
      )}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-emerald-700 p-2 rounded-lg">
        <Menu size={20} />
      </button>
    </div>

    <nav className="flex-1 p-4 space-y-2">
      <button
        onClick={() => setCurrentPage('home')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === 'home' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700'
          }`}
      >
        <Home size={20} />
        {sidebarOpen && <span>Dashboard</span>}
      </button>

      <button
        onClick={() => setCurrentPage('clientes')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === 'clientes' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700'
          }`}
      >
        <Users size={20} />
        {sidebarOpen && <span>Clientes</span>}
      </button>

      <button
        onClick={() => setCurrentPage('produtos')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === 'produtos' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700'
          }`}
      >
        <Package size={20} />
        {sidebarOpen && <span>Produtos</span>}
      </button>

      <button
        onClick={() => setCurrentPage('pedidos')}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === 'pedidos' ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700'
          }`}
      >
        <ShoppingCart size={20} />
        {sidebarOpen && <span>Pedidos</span>}
      </button>
    </nav>

    <div className="p-4 border-t border-emerald-700">
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-700 transition-all">
        <LogOut size={20} />
        {sidebarOpen && <span>Sair</span>}
      </button>
    </div>
  </div>
}
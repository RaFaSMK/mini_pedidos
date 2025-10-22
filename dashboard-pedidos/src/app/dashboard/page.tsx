"use client"

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import DashboardHome from "@/components/pages/DashboardHome"
import ClientesPage from "@/components/pages/ClientesPage"
import ProdutosPage from "@/components/pages/ProdutosPage"
import PedidosPage from "@/components/pages/PedidosPage"
import Toast from "@/components/Toast"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState('home')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="flex-1 p-8">
        {currentPage === 'home' && <DashboardHome showToast={showToast} />}
        {currentPage === 'clientes' && <ClientesPage showToast={showToast} />}
        {currentPage === 'produtos' && <ProdutosPage showToast={showToast} />}
        {currentPage === 'pedidos' && <PedidosPage showToast={showToast} />}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
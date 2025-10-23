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
    /* Aqui mudei de 'flex' para 'flex-col md:flex-row'
      para garantir que no mobile o layout seja uma coluna (topo/conteúdo)
      e no desktop uma linha (sidebar/conteúdo)
    */
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* ESSA É A MUDANÇA PRINCIPAL:
        - 'p-8': Mantém seu padding original.
        - 'pt-16': Adiciona 4rem (64px) de padding no topo (mobile) para desviar da sua barra de h-16.
        - 'md:pt-8': No desktop, remove o pt-16 e volta ao seu padding original de p-8.
      */}
      <div className="flex-1 p-8 pt-8 md:pt-8">
        {/* Obs: usei pt-20 para dar um respiro extra (pt-16 + p-4), ajuste se preferir pt-16 */}
        {currentPage === 'home' && <DashboardHome showToast={showToast} />}
        {currentPage === 'clientes' && <ClientesPage showToast={showToast} />}
        {currentPage === 'produtos' && <ProdutosPage showToast={showToast} />}
        {currentPage === 'pedidos' && <PedidosPage showToast={showToast} />}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
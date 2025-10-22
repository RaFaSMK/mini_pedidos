"use client"

import { useEffect, useState, useCallback } from "react"
import * as dashboardService from "@/services/dashboardService"
import { UltimoPedido, DashboardStats } from "@/services/dashboardService"

import PageHeader from "../PageHeader"
import StatCard from "../StatCard"
import StatusBadge from "../StatusBadge"
import EmptyState from "../EmptyState"
import { ShoppingCart } from "lucide-react"


interface DashboardHomeProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

export default function DashboardHome({ showToast }: DashboardHomeProps) {
  const [stats, setStats] = useState<DashboardStats>({
    clientes: 0,
    produtos: 0,
    pedidos: 0
  })
  const [ultimosPedidos, setUltimosPedidos] = useState<UltimoPedido[]>([])
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)

      const data = await dashboardService.getDashboardData();

      setStats(data.stats);
      setUltimosPedidos(data.ultimosPedidos);

    } catch (error) {
      console.error(error)
      showToast('Erro ao carregar dados do dashboard', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Bem-vindo ao sistema Oticket" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard icon="Users" label="Total Clientes" value={stats.clientes} color="emerald" />
        <StatCard icon="Package" label="Total Produtos" value={stats.produtos} color="blue" />
        <StatCard icon="ShoppingCart" label="Total Pedidos" value={stats.pedidos} color="orange" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Últimos Pedidos</h2>

        {loading ? (
          <div className="text-center py-12">Carregando...</div>
        ) : ultimosPedidos.length === 0 ? (
          <EmptyState icon={ShoppingCart} title="Nenhum pedido" description="Comece criando seu primeiro pedido" />
        ) : (
          <div className="space-y-4">
            {ultimosPedidos.map((pedido) => (
              <div key={pedido.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{pedido.cliente}</p>
                    <p className="text-sm text-gray-600">{pedido.produto}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
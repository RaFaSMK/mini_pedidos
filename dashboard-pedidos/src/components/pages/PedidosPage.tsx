"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import PageHeader from "../PageHeader"
import SearchBar from "../SearchBar"
import Table from "../Table"
import Modal from "../Modal"
import Select from "../Select"
import Input from "../Input"
import EmptyState from "../EmptyState"
import StatusBadge from "../StatusBadge"
import { ShoppingCart, Eye, Edit2 } from "lucide-react"

interface Pedido {
  id: number
  cliente: string
  clienteId: number
  produto: string
  produtoId: number
  quantidade: number
  total: number
  status: string
  data: string
}

interface Cliente {
  id: number
  nome: string
}

interface Produto {
  id: number
  nome: string
  preco: number
}

interface PedidosPageProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const initialFormData = {
  clienteId: '',
  produtoId: '',
  quantidade: ''
}

export default function PedidosPage({ showToast }: PedidosPageProps) {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchPedidos = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/api/pedidos')
      setPedidos(response.data)
    } catch (error) {
      showToast('Erro ao carregar pedidos', 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  const fetchClientes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/clientes')
      setClientes(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchProdutos = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/produtos')
      setProdutos(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])
  
  useEffect(() => {
    fetchPedidos()
    fetchClientes()
    fetchProdutos()
  }, [fetchPedidos, fetchClientes, fetchProdutos])

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData(initialFormData)
  }

  const handleOpenEditModal = (pedido: Pedido) => {
    setEditingId(pedido.id)
    setFormData({
      clienteId: String(pedido.clienteId),
      produtoId: String(pedido.produtoId),
      quantidade: String(pedido.quantidade)
    })
    setShowModal(true)
  }

  const handleOpenNewModal = () => {
    setEditingId(null)
    setFormData(initialFormData)
    setShowModal(true)
  }

  const handleSubmit = async () => {
    const produto = produtos.find(p => p.id === parseInt(formData.produtoId))
    const total = produto ? produto.preco * parseInt(formData.quantidade) : 0

    const payload = {
      clienteId: parseInt(formData.clienteId),
      produtoId: parseInt(formData.produtoId),
      quantidade: parseInt(formData.quantidade),
      total
    }

    try {
      if (editingId) {
        // --- LÓGICA DE EDIÇÃO ---
        await axios.put(`http://localhost:3001/api/pedidos/${editingId}`, payload)
        showToast('Pedido atualizado com sucesso!', 'success')
      } else {
        // --- LÓGICA DE CRIAÇÃO ---
        await axios.post('http://localhost:3001/api/pedidos', payload)
        showToast('Pedido criado com sucesso!', 'success')
      }

      closeModal() // Use a nova função
      fetchPedidos()
    } catch (error) {
      const action = editingId ? 'atualizar' : 'criar'
      showToast(`Erro ao ${action} pedido`, 'error')
      console.error(error)
    }
  }

  const filteredPedidos = pedidos.filter(p =>
    p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.produto.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { label: 'ID', key: 'id', render: (row: Pedido) => `#${row.id}`, className: 'text-gray-900 font-medium' },
    { label: 'Cliente', key: 'cliente', className: 'text-gray-900' },
    { label: 'Produto', key: 'produto' },
    { label: 'Quantidade', key: 'quantidade' },
    { label: 'Total', render: (row: Pedido) => `R$ ${row.total.toFixed(2)}`, className: 'text-gray-900 font-semibold' },
    { label: 'Status', render: (row: Pedido) => <StatusBadge status={row.status} /> },
    { label: 'Data', key: 'data' }
  ]

  const actions = [
    { icon: Eye, onClick: (row: Pedido) => alert(`Visualizar pedido #${row.id}`), className: 'text-blue-600 hover:bg-blue-50', title: 'Visualizar' },
    { icon: Edit2, onClick: (row: Pedido) => handleOpenEditModal(row), className: 'text-emerald-600 hover:bg-emerald-50', title: 'Editar' }
  ]

  return (
    <div>
      <PageHeader
        title="Pedidos"
        subtitle="Gerencie seus pedidos"
        buttonText="Novo Pedido"
        onButtonClick={handleOpenNewModal}
      />
      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por cliente ou produto..." />

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : filteredPedidos.length === 0 ? (
        <EmptyState icon={ShoppingCart} title="Nenhum pedido encontrado" description="Crie seu primeiro pedido para começar" />
      ) : (
        <Table columns={columns} data={filteredPedidos} actions={actions} />
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingId ? "Editar Pedido" : "Novo Pedido"}
        onSubmit={handleSubmit}
      >
        <Select
          options={clientes.map(c => ({ value: c.id, label: c.nome }))}
          value={formData.clienteId}
          onChange={(v) => setFormData({ ...formData, clienteId: v })}
          placeholder="Selecione o cliente"
        />
        <Select
          options={produtos.map(p => ({ value: p.id, label: `${p.nome} - R$ ${p.preco.toFixed(2)}` }))}
          value={formData.produtoId}
          onChange={(v) => setFormData({ ...formData, produtoId: v })}
          placeholder="Selecione o produto"
        />
        <Input
          type="number"
          placeholder="Quantidade"
          value={formData.quantidade}
          onChange={(v) => setFormData({ ...formData, quantidade: v })}
        />
        {formData.produtoId && formData.quantidade && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total estimado:</p>
            <p className="text-2xl font-bold text-gray-900">
              R$ {((produtos.find(p => p.id === parseInt(formData.produtoId))?.preco || 0) * parseInt(formData.quantidade || '0')).toFixed(2)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
} 
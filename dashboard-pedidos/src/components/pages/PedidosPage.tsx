"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import PageHeader from "../PageHeader"
import SearchBar from "../SearchBar"
import Table from "../Table"
import Modal from "../Modal"
import Select from "../Select"
import EmptyState from "../EmptyState"
import { ShoppingCart, Eye, Edit2 } from "lucide-react"

interface Pedido {
  id: number
  cliente: Cliente | string
  clienteId: number
  produto: Produto | string
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
    })
    setShowModal(true)
  }

  const handleOpenNewModal = () => {
    setEditingId(null)
    setFormData(initialFormData)
    setShowModal(true)
  }

  const handleSubmit = async () => {
    const payload = {
      cliente_id: parseInt(formData.clienteId),
      produtos_ids: [parseInt(formData.produtoId)],
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/pedidos/${editingId}`, payload)
        showToast('Pedido atualizado com sucesso!', 'success')
      } else {
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

  const filteredPedidos = pedidos.filter(p => {
    const clienteNome = typeof p.cliente === 'object' ? p.cliente.nome : p.cliente
    const produtoNome = typeof p.produto === 'object' ? p.produto.nome : p.produto

    return (
      clienteNome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produtoNome?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })


  const columns = [
    {
      label: 'ID',
      key: 'id',
      render: (row: Pedido) => `#${row.id}`,
      className: 'text-gray-900 font-medium'
    },
    {
      label: 'Cliente',
      key: 'cliente',
      className: 'text-gray-900',
      render: (row: Pedido) =>
        typeof row.cliente === 'object'
          ? row.cliente.nome
          : row.cliente
    },
    {
      label: 'Produto',
      key: 'produto',
      render: (row: Pedido) =>
        typeof row.produto === 'object'
          ? row.produto.nome
          : row.produto
    },
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
      </Modal>
    </div>
  )
} 
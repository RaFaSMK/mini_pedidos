"use client"

import { useState, useEffect, useCallback } from "react"
import * as pedidoService from "@/services/pedidoService"
import * as clienteService from "@/services/clienteService"
import * as produtoService from "@/services/produtoService"
import { Pedido } from "@/services/pedidoService"
import { Cliente } from "@/services/clienteService"
import { Produto } from "@/services/produtoService"

import PageHeader from "../PageHeader"
import SearchBar from "../SearchBar"
// 1. IMPORTE 'Column' E 'Action'
import Table, { Column, Action } from "../Table"
import Modal from "../Modal"
import Select from "../Select"
import EmptyState from "../EmptyState"
import StatusBadge from "../StatusBadge"
import { ShoppingCart, Eye, Edit2 } from "lucide-react"

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
      const data = await pedidoService.getAllPedidos()
      setPedidos(data)
    } catch (error) {
      showToast('Erro ao carregar pedidos', 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  const fetchClientes = useCallback(async () => {
    try {
      const data = await clienteService.getAllClientes()
      setClientes(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchProdutos = useCallback(async () => {
    try {
      const data = await produtoService.getAllProdutos()
      setProdutos(data)
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
      clienteId: String(pedido.cliente_id),
      produtoId: String(pedido.produtos[0]?.produto.id || ''),
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
        await pedidoService.updatePedido(editingId, payload)
        showToast('Pedido atualizado com sucesso!', 'success')
      } else {
        await pedidoService.createPedido(payload)
        showToast('Pedido criado com sucesso!', 'success')
      }
      closeModal()
      fetchPedidos()
    } catch (error) {
      const action = editingId ? 'atualizar' : 'criar'
      showToast(`Erro ao ${action} pedido`, 'error')
      console.error(error)
    }
  }

  const handleStatusChange = useCallback(async (pedido: Pedido) => {
    const newStatus = pedido.status === 'PENDENTE' ? 'PAGO' : 'PENDENTE';

    try {
      await pedidoService.updatePedidoStatus(pedido.id, { status: newStatus });
      showToast(`Status do pedido #${pedido.id} atualizado!`, 'success');
      fetchPedidos();
    } catch (error) {
      console.error(error);
      showToast('Erro ao atualizar status', 'error');
    }
  }, [showToast, fetchPedidos]);

  const filteredPedidos = pedidos.filter(p => {
    const clienteNome = p.cliente.nome.toLowerCase();

    const produtoNomes = p.produtos
      .map(item => item.produto.nome)
      .join(', ')
      .toLowerCase();

    const term = searchTerm.toLowerCase();

    return clienteNome.includes(term) || produtoNomes.includes(term);
  })

  const columns: Column<Pedido>[] = [
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
      render: (row: Pedido) => row.cliente.nome
    },
    {
      label: 'Produto',
      key: 'produtos',
      render: (row: Pedido) => {
        if (!row.produtos || row.produtos.length === 0) {
          return "(Nenhum produto)";
        }
        return row.produtos
          .map(item => item.produto.nome)
          .join(', ');
      }
    },
    {
      label: 'Pagamento',
      key: 'status',
      render: (row: Pedido) => (
        <StatusBadge
          status={row.status}
          onClick={() => handleStatusChange(row)}
        />
      )
    },
    {
      label: 'Data',
      key: 'data',
      render: (row: Pedido) => {
        if (!row.data) return '-';
        return new Date(row.data).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    }
  ]

  const actions: Action<Pedido>[] = [
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
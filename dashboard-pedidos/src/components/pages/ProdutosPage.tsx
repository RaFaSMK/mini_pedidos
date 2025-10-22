"use client"

import { useState, useEffect, useCallback } from "react"
import * as produtoService from "@/services/produtoService"
import { Produto } from "@/services/produtoService"

import PageHeader from "../PageHeader"
import SearchBar from "../SearchBar"
// 1. IMPORTE 'Column' E 'Action'
import Table, { Column, Action } from "../Table"
import Modal from "../Modal"
import Input from "../Input"
import EmptyState from "../EmptyState"
import { Package, Edit2, Trash2 } from "lucide-react"

interface ProdutosPageProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const initialFormData = {
  nome: '',
  preco: '',
}

export default function ProdutosPage({ showToast }: ProdutosPageProps) {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchProdutos = useCallback(async () => {
    try {
      setLoading(true)
      const data = await produtoService.getAllProdutos()
      setProdutos(data)
    } catch (error) {
      showToast('Erro ao carregar produtos', 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchProdutos()
  }, [fetchProdutos])

  const closeModal = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData(initialFormData)
  }

  const handleOpenNewModal = () => {
    setEditingId(null)
    setFormData(initialFormData)
    setShowModal(true)
  }

  const handleOpenEditModal = (produto: Produto) => {
    setEditingId(produto.id)
    setFormData({
      nome: produto.nome,
      preco: String(produto.preco),
    })
    setShowModal(true)
  }

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      preco: parseFloat(formData.preco) || 0,
    }

    try {
      if (editingId) {
        await produtoService.updateProduto(editingId, payload)
        showToast('Produto atualizado com sucesso!', 'success')
      } else {
        await produtoService.createProduto(payload)
        showToast('Produto cadastrado com sucesso!', 'success')
      }
      closeModal()
      fetchProdutos()
    } catch (error) {
      const action = editingId ? 'atualizar' : 'cadastrar'
      showToast(`Erro ao ${action} produto`, 'error')
      console.error(error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Deseja realmente deletar este produto?')) {
      try {
        await produtoService.deleteProduto(id)
        showToast('Produto deletado com sucesso!', 'success')
        fetchProdutos()
      } catch (error) {
        showToast('Erro ao deletar produto', 'error')
        console.error(error)
      }
    }
  }

  const filteredProdutos = produtos.filter(p =>
    p.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns: Column<Produto>[] = [
    { label: 'Nome', key: 'nome', className: 'text-gray-900 font-medium' },
    { label: 'Preço', key: 'preco', render: (row: Produto) => `R$ ${row.preco.toFixed(2)}` },
  ]

  const actions: Action<Produto>[] = [
    { icon: Edit2, onClick: (row: Produto) => handleOpenEditModal(row), className: 'text-emerald-600 hover:bg-emerald-50', title: 'Editar' },
    { icon: Trash2, onClick: (row: Produto) => handleDelete(row.id), className: 'text-red-600 hover:bg-red-50', title: 'Deletar' }
  ]

  return (
    <div>
      <PageHeader
        title="Produtos"
        subtitle="Gerencie seu catálogo de produtos"
        buttonText="Novo Produto"
        onButtonClick={handleOpenNewModal}
      />
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar por nome"
      />

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : filteredProdutos.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum produto encontrado"
          description="Adicione seu primeiro produto para começar"
        />
      ) : (
        <Table
          columns={columns}
          data={filteredProdutos}
          actions={actions}
        />
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingId ? "Editar Produto" : "Novo Produto"}
        onSubmit={handleSubmit}
      >
        <Input placeholder="Nome do produto" value={formData.nome} onChange={(v) => setFormData({ ...formData, nome: v })} />
        <Input type="number" placeholder="Preço (ex: 19.99)" value={formData.preco} onChange={(v) => setFormData({ ...formData, preco: v })} />
      </Modal>
    </div>
  )
}
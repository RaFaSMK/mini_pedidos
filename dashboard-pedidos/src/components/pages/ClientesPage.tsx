"use client"

import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import PageHeader from "../PageHeader"
import SearchBar from "../SearchBar"
import Table from "../Table"
import Modal from "../Modal"
import Input from "../Input"
import EmptyState from "../EmptyState"
import { Users, Eye, Edit2, Trash2 } from "lucide-react"

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  cidade: string
}

interface ClientesPageProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const initialFormData = {
  nome: '',
  email: '',
  telefone: '',
  cidade: ''
}

export default function ClientesPage({ showToast }: ClientesPageProps) {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState(initialFormData)
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchClientes = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/api/clientes')
      setClientes(response.data)
    } catch (error) {
      showToast('Erro ao carregar clientes', 'error')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    fetchClientes()
  }, [fetchClientes]) 

  const closeModal = useCallback(() => {
    setShowModal(false)
    setEditingId(null)
    setFormData(initialFormData)
  }, []) 

  const handleOpenNewModal = useCallback(() => {
    setEditingId(null)
    setFormData(initialFormData)
    setShowModal(true)
  }, [])

  const handleOpenEditModal = useCallback((cliente: Cliente) => {
    setEditingId(cliente.id)
    setFormData({
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      cidade: cliente.cidade,
    })
    setShowModal(true)
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/clientes/${editingId}`, formData)
        showToast('Cliente atualizado com sucesso!', 'success')
      } else {
        await axios.post('http://localhost:3001/api/clientes', formData)
        showToast('Cliente cadastrado com sucesso!', 'success')
      }
      closeModal()
      fetchClientes()
    } catch (error) {
      const action = editingId ? 'atualizar' : 'cadastrar'
      showToast(`Erro ao ${action} cliente`, 'error')
      console.error(error)
    }
  }, [editingId, formData, showToast, closeModal, fetchClientes])

  const handleDelete = useCallback(async (id: number) => {
    if (window.confirm('Deseja realmente deletar este cliente?')) {
      try {
        await axios.delete(`http://localhost:3001/api/clientes/${id}`)
        showToast('Cliente deletado com sucesso!', 'success')
        fetchClientes()
      } catch (error) {
        showToast('Erro ao deletar cliente', 'error')
        console.error(error)
      }
    }
  }, [showToast, fetchClientes])

  const filteredClientes = clientes.filter(c =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { label: 'Nome', key: 'nome', className: 'text-gray-900 font-medium' },
    { label: 'Email', key: 'email' },
    { label: 'Telefone', key: 'telefone' },
    { label: 'Cidade', key: 'cidade' }
  ]

  const actions = [
    { icon: Eye, onClick: (row: Cliente) => alert(`Visualizar ${row.nome}`), className: 'text-blue-600 hover:bg-blue-50', title: 'Visualizar' },
    { icon: Edit2, onClick: (row: Cliente) => handleOpenEditModal(row), className: 'text-emerald-600 hover:bg-emerald-50', title: 'Editar' },
    { icon: Trash2, onClick: (row: Cliente) => handleDelete(row.id), className: 'text-red-600 hover:bg-red-50', title: 'Deletar' }
  ]

  return (
    <div>
      <PageHeader
        title="Clientes"
        subtitle="Gerencie seus clientes"
        buttonText="Novo Cliente"
        onButtonClick={handleOpenNewModal}
      />
      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por nome ou email..." />

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : filteredClientes.length === 0 ? (
        <EmptyState icon={Users} title="Nenhum cliente encontrado" description="Adicione seu primeiro cliente para começar" />
      ) : (
        <Table columns={columns} data={filteredClientes} actions={actions} />
      )}

      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingId ? "Editar Cliente" : "Novo Cliente"}
        onSubmit={handleSubmit}
      >
        <Input placeholder="Nome completo" value={formData.nome} onChange={(v) => setFormData({ ...formData, nome: v })} />
        <Input type="email" placeholder="Email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
        <Input type="tel" placeholder="Telefone" value={formData.telefone} onChange={(v) => setFormData({ ...formData, telefone: v })} />
        <Input placeholder="Cidade" value={formData.cidade} onChange={(v) => setFormData({ ...formData, cidade: v })} />
      </Modal>
    </div>
  )
}
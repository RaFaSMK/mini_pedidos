"use client"

import { useState, useEffect, useCallback } from "react"
import * as clienteService from "@/services/clienteService"
import { Cliente } from "@/services/clienteService"

import PageHeader from "../PageHeader"
import SearchBar from "../SearchBar"
import Table, { Column, Action } from "../Table"
import Modal from "../Modal"
import Input from "../Input"
import EmptyState from "../EmptyState"
import { Users, Edit2, Trash2 } from "lucide-react"

interface ClientesPageProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const initialFormData = {
  nome: '',
  email: '',
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
      const data = await clienteService.getAllClientes()
      setClientes(data)
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
    })
    setShowModal(true)
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      if (editingId) {
        await clienteService.updateCliente(editingId, formData)
        showToast('Cliente atualizado com sucesso!', 'success')
      } else {
        await clienteService.createCliente(formData)
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
        await clienteService.deleteCliente(id)
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

  const columns: Column<Cliente>[] = [
    { label: 'Nome', key: 'nome', className: 'text-gray-900 font-medium' },
    { label: 'Email', key: 'email' },
  ]

  const actions: Action<Cliente>[] = [
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
        <Table<Cliente>
          columns={columns}
          data={filteredClientes}
          actions={actions}
        />
      )}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={editingId ? "Editar Cliente" : "Novo Cliente"}
        onSubmit={handleSubmit}
      >
        <Input placeholder="Nome completo" value={formData.nome} onChange={(v) => setFormData({ ...formData, nome: v })} />
        <Input type="email" placeholder="Email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
      </Modal>
    </div>
  )
}
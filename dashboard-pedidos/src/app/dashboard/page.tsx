"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PageHeader from "./components/PageHeader";
import Table from "./components/Table";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import Input from "./components/Input";
import Select from "./components/Select";
import EmptyState from "./components/EmptyState";
import SearchBar from "./components/SearchBar";
import StatCard from "./components/StatCard";
import StatusBadge from "./components/StatusBadge";
import {
  Users,
  Package,
  ShoppingCart,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";

// Exemplo de dados locais temporários (depois vamos puxar da API)
const mockClientes = [
  { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 98765-4321", cidade: "São Paulo" },
  { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(21) 97654-3210", cidade: "Rio de Janeiro" },
];
const mockProdutos = [
  { id: 1, nome: "Ingresso Show", preco: 150.0, estoque: 50, categoria: "Música" },
  { id: 2, nome: "Teatro", preco: 80.0, estoque: 20, categoria: "Cultura" },
];
const mockPedidos = [
  { id: 1, cliente: "João Silva", produto: "Ingresso Show", quantidade: 2, total: 300, status: "Confirmado", data: "21/10/2024" },
];

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<any>(null);

  const showToast = (message: string, type = "success") =>
    setToast({ message, type });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-8">
        {currentPage === "home" && (
          <div>
            <PageHeader title="Dashboard" subtitle="Bem-vindo ao sistema Oticket" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <StatCard icon={Users} label="Total Clientes" value={mockClientes.length} color="emerald" />
              <StatCard icon={Package} label="Total Produtos" value={mockProdutos.length} color="blue" />
              <StatCard icon={ShoppingCart} label="Total Pedidos" value={mockPedidos.length} color="orange" />
            </div>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Logo from "../../public/logo.png"
import SidebarButton from "./SidebarButton"
import LogoutSidebarButton from "./LogoutSidebarButton"

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-linear-to-b from-emerald-900 to-emerald-800 min-h-screen transition-all duration-300 flex flex-col`}>
      <div className="p-6 flex items-center justify-between border-b border-emerald-700">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <Image src={Logo} alt="Logo" width={100} />
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-emerald-700 p-2 rounded-lg">
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <SidebarButton
          icon="Home"
          active={currentPage === "home"}
          label="Dashboard"
          onClick={() => setCurrentPage('home')}
          sidebarOpen={sidebarOpen}
        />

        <SidebarButton
          icon="Users"
          active={currentPage === "clientes"}
          label="Clientes"
          onClick={() => setCurrentPage('clientes')}
          sidebarOpen={sidebarOpen}
        />

        <SidebarButton
          icon="Package"
          active={currentPage === "produtos"}
          label="Produtos"
          onClick={() => setCurrentPage('produtos')}
          sidebarOpen={sidebarOpen}
        />

        <SidebarButton
          icon="ShoppingCart"
          active={currentPage === "pedidos"}
          label="Pedidos"
          onClick={() => setCurrentPage('pedidos')}
          sidebarOpen={sidebarOpen}
        />
      </nav>

      <div className="p-4 border-t border-emerald-700">
        <LogoutSidebarButton 
          icon="LogOut"
          label="Sair"
          onClick={() => setCurrentPage('login')}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  )
}

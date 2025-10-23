"use client"

import { Menu } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Logo from "../../public/logo.png"
import SidebarButton from "./SidebarButton"
import LogoutSidebarButton from "./LogoutSidebarButton"
import { useRouter } from 'next/navigation';

interface SidebarProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export default function Sidebar({ currentPage, setCurrentPage }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  const handleMobileClick = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  }

  return (
    <>
      {/* ============================================= */}
      {/* =========     NAVBAR DO MOBILE      ========= */}
      {/* ============================================= */}

      {/* Barra do Topo Mobile - AGORA SEM O LOGO */}
      <div className={`
        md:hidden h-16 bg-linear-to-b from-emerald-900 to-emerald-800 
        flex items-center justify-start px-4 border-b border-emerald-700 
        sticky top-0 z-10 
        ${mobileMenuOpen ? 'hidden' : 'flex'} 
      `}>
        {/* REMOVIDA A DIV DO LOGO AQUI */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-white hover:bg-emerald-700 p-2 rounded-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ============================================= */}
      {/* =========     GAVETA DO MOBILE      ========== */}
      {/* ============================================= */}

      {/* Fundo escuro (Overlay) */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* A Gaveta (Drawer) */}
      <div className={`
        md:hidden fixed top-0 left-0 h-full w-20 
        bg-linear-to-b from-emerald-900 to-emerald-800
        flex flex-col z-30
        transform ${mobileMenuOpen ? 'translateX(0)' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
      `}>

        {/* Botão de Menu (para fechar) - Ainda pode ter um logo aqui se quiser */}
        <div className="p-6 flex items-center justify-center border-b border-emerald-700">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:bg-emerald-700 p-2 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Ícones de Navegação */}
        <nav className="flex-1 p-4 flex flex-col items-center space-y-2">
          <SidebarButton
            icon="Home"
            active={currentPage === "home"}
            label=""
            onClick={() => handleMobileClick('home')}
            sidebarOpen={false}
          />
          <SidebarButton
            icon="Users"
            active={currentPage === "clientes"}
            label=""
            onClick={() => handleMobileClick('clientes')}
            sidebarOpen={false}
          />
          <SidebarButton
            icon="Package"
            active={currentPage === "produtos"}
            label=""
            onClick={() => handleMobileClick('produtos')}
            sidebarOpen={false}
          />
          <SidebarButton
            icon="ShoppingCart"
            active={currentPage === "pedidos"}
            label=""
            onClick={() => handleMobileClick('pedidos')}
            sidebarOpen={false}
          />
        </nav>

        {/* Ícone de Logout */}
        <div className="p-4 border-t border-emerald-700 flex flex-col items-center">
          <LogoutSidebarButton
            icon="LogOut"
            label=""
            onClick={() => {
              setMobileMenuOpen(false);
              router.push('/');
            }}
            sidebarOpen={false}
          />
        </div>
      </div>

      {/* ============================================= */}
      {/* =========     SIDEBAR DO DESKTOP    ========= */}
      {/* ============================================= */}

      <div className={`
        ${sidebarOpen ? 'w-64' : 'w-20'} 
        bg-linear-to-b from-emerald-900 to-emerald-800 
        h-screen sticky top-0 
        transition-all duration-300 
        flex-col hidden md:flex 
      `}>
        <div className={`p-6 flex items-center border-b border-emerald-700 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
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
            onClick={() => router.push('/')}
            sidebarOpen={sidebarOpen}
          />
        </div>
      </div>
    </>
  )
}
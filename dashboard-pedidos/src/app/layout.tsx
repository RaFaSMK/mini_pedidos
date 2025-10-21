const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => (
  <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-emerald-900 to-emerald-800 min-h-screen transition-all duration-300 flex flex-col`}>
    <div className="p-6 flex items-center justify-between border-b border-emerald-700">
      {sidebarOpen && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Package className="text-emerald-600" size={20} />
          </div>
          <span className="text-white font-bold text-xl">Oticket</span>
        </div>
      )}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-emerald-700 p-2 rounded-lg">
        <Menu size={20} />
      </button>
    </div>
    
    <nav className="flex-1 p-4 space-y-2">
      <NavItem icon={Home} label="Dashboard" page="home" currentPage={currentPage} setCurrentPage={setCurrentPage} sidebarOpen={sidebarOpen} />
      <NavItem icon={Users} label="Clientes" page="clientes" currentPage={currentPage} setCurrentPage={setCurrentPage} sidebarOpen={sidebarOpen} />
      <NavItem icon={Package} label="Produtos" page="produtos" currentPage={currentPage} setCurrentPage={setCurrentPage} sidebarOpen={sidebarOpen} />
      <NavItem icon={ShoppingCart} label="Pedidos" page="pedidos" currentPage={currentPage} setCurrentPage={setCurrentPage} sidebarOpen={sidebarOpen} />
    </nav>

    <div className="p-4 border-t border-emerald-700">
      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-700 transition-all">
        <LogOut size={20} />
        {sidebarOpen && <span>Sair</span>}
      </button>
    </div>
  </div>
);

const NavItem = ({ icon: Icon, label, page, currentPage, setCurrentPage, sidebarOpen }) => (
  <button
    onClick={() => setCurrentPage(page)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      currentPage === page ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700'
    }`}
  >
    <Icon size={20} />
    {sidebarOpen && <span>{label}</span>}
  </button>
);

const PageHeader = ({ title, buttonText, onButtonClick, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
        >
          <Plus size={20} />
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  </div>
);

const SearchBar = ({ value, onChange, placeholder = "Pesquisar..." }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
      />
    </div>
  </div>
);

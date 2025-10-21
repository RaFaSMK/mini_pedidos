import Icon from "./IconSidebar";

interface SidebarButtonProps {
  icon: string
  label: string
  sidebarOpen: boolean
  onClick: () => void
}

export default function LogoutSidebarButton({
  icon,
  label,
  sidebarOpen,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-700 transition-all">
      <Icon name={icon as any} size={20} />
      {sidebarOpen && <span>Sair</span>}
    </button>
  )
}
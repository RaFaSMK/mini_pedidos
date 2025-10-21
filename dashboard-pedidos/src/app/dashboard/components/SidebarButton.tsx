import React from "react";
import Icon from "./IconSidebar";

interface SidebarButtonProps {
  icon: string;
  label: string;
  active: boolean;
  sidebarOpen: boolean;
  onClick: () => void;
}

export default function SidebarButton({
  icon,
  label,
  active,
  sidebarOpen,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active ? "bg-green-700 text-white" : "text-green-100 hover:bg-green-700"
      }`}
    >
      <Icon name={icon as any} size={20} />
      {sidebarOpen && <span>{label}</span>}
    </button>
  );
}

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import React from "react";

interface IconProps extends LucideProps {
  name: keyof typeof Icons;
}

export default function Icon({ name, size = 20, color = "white", ...props }: IconProps) {
  const LucideIcon = Icons[name] as React.FC<LucideProps>; // <-- forçando o tipo certo

  if (!LucideIcon) {
    console.warn(`Ícone "${name}" não encontrado em lucide-react`);
    return null;
  }

  return <LucideIcon size={size} color={color} {...props} />;
}

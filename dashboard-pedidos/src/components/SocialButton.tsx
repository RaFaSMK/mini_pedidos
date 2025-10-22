interface SocialButtonProps {
  icon: React.ReactNode;
  text?: string;
  variant?: "default" | "google";
}

export const SocialButton = ({ icon, text, variant = "default" }: SocialButtonProps) => (
  <button className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${variant === "google"
    ? "bg-gray-100 hover:bg-green-200 text-gray-700 flex-1"
    : "bg-gray-100 hover:bg-green-200 p-3"
    }`}>
    {icon}
    {text && <span>{text}</span>}
  </button>
);
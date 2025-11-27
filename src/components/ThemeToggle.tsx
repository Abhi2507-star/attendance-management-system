import { Monitor, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
        transition-all duration-300 flex items-center gap-2
        ${
          theme === "cyberpunk"
            ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-blue-500/50"
            : "bg-white text-slate-900 shadow-slate-300 border-2 border-slate-200"
        }
      `}
      title={theme === "cyberpunk" ? "Switch to Minimalist" : "Switch to Cyberpunk"}
    >
      {theme === "cyberpunk" ? (
        <Monitor className="h-5 w-5" />
      ) : (
        <Zap className="h-5 w-5" />
      )}
      <span className="text-xs font-semibold pr-1">
        {theme === "cyberpunk" ? "Minimal" : "Cyber"}
      </span>
    </motion.button>
  );
}
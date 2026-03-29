import { Edit3 } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingEditButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-foreground text-background shadow-2xl shadow-black/20 hover:-translate-y-1 hover:shadow-black/30 transition-all font-medium border border-border/10"
      aria-label="Edit Portfolio"
    >
      <Edit3 size={18} />
      <span>Edit Portfolio</span>
    </motion.button>
  );
}

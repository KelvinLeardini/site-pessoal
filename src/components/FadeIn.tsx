"use client"; // Avisa ao Next.js que este componente roda no navegador

import { motion } from "framer-motion";

export default function FadeIn({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Começa invisível e um pouco mais para baixo
      animate={{ opacity: 1, y: 0 }}  // Termina 100% visível e na posição original
      transition={{ duration: 0.5, delay: delay }} // Duração suave com o delay que passarmos
    >
      {children}
    </motion.div>
  );
}
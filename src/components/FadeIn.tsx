"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function FadeIn({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  // Se o dispositivo/navegador tiver redução de movimento ou modo de economia,
  // exibe o conteúdo imediatamente sem iniciar invisível
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

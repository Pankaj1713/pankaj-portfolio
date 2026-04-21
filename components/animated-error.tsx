"use client";

import { AnimatePresence, motion } from "framer-motion";

interface AnimatedErrorProps {
  error?: string;
  touched?: boolean;
}

export function AnimatedError({ error, touched }: AnimatedErrorProps) {
  return (
    <div className="h-5 mt-1 pointer-events-none">
      <AnimatePresence>
        {error && touched && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-red-500 text-sm ml-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

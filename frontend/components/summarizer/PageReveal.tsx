"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type PageRevealProps = {
  show: boolean;
  children: ReactNode;
};

export default function PageReveal({
  show,
  children,
}: PageRevealProps) {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.section
          initial={{
            opacity: 0,
            rotateX: -12,
            y: 45,
            scale: 0.985,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: 25,
            scale: 0.99,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            transformPerspective: 1800,
            transformOrigin: "top center",
          }}
          className="mt-24 space-y-20"
        >
          {children}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
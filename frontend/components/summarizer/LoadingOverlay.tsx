"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpenText } from "lucide-react";

type LoadingOverlayProps = {
  isLoading: boolean;
};

export default function LoadingOverlay({
  isLoading,
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/75 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.45,
            }}
            className="paper w-[460px] px-12 py-14"
          >
            {/* Animated Book */}

            <div className="flex justify-center">

              <motion.div
                animate={{
                  rotateY: [0, -18, 18, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <BookOpenText
                  size={54}
                  className="text-primary"
                />
              </motion.div>

            </div>

            {/* Title */}

            <h2 className="mt-8 text-center font-serif text-4xl">
              Reading Document
            </h2>

            <p className="mt-4 text-center leading-8 text-muted-foreground">
              Understanding the document,
              extracting important ideas,
              and preparing your summary.
            </p>

            {/* Progress */}

            <div className="mt-12">

              <div className="h-1 overflow-hidden rounded-full bg-muted">

                <motion.div
                  className="h-full bg-primary"
                  initial={{
                    x: "-100%",
                  }}
                  animate={{
                    x: "100%",
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />

              </div>

            </div>

            {/* Footer */}

            <div className="mt-10 flex justify-center">

              <motion.p
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                }}
                className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
              >
                Please Wait
              </motion.p>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
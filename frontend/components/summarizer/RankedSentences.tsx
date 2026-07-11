"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import type { RankedSentence } from "@/types/summarizer";

type RankedSentencesProps = {
  sentences: RankedSentence[] | null;
};

export default function RankedSentences({
  sentences,
}: RankedSentencesProps) {
  if (!sentences || sentences.length === 0) {
    return null;
  }

  const maxScore = Math.max(
    ...sentences.map((s) => s.score)
  );

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
        delay: 0.2,
      }}
      className="reading-column mt-20"
    >
      <motion.div
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.25,
        }}
        className="paper overflow-hidden transition-shadow hover:shadow-2xl"
      >
        {/* Header */}

        <div className="border-b border-border px-10 py-8">

          <div className="flex items-center gap-4">

            <motion.div
              whileHover={{
                rotate: -10,
                scale: 1.08,
              }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
            >
              <Sparkles className="h-7 w-7 text-primary" />
            </motion.div>

            <div>

              <h2 className="font-serif text-4xl">
                Sentence Importance
              </h2>

              <p className="mt-2 text-muted-foreground">
                The extractive model ranked these
                sentences according to their importance.
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="divide-y divide-border">

          {sentences.map((item, index) => {

            const percentage =
              (item.score / maxScore) * 100;

            return (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.45,
                }}
                whileHover={{
                  backgroundColor: "rgba(148,163,184,0.04)",
                }}
                className="space-y-6 px-10 py-10"
              >

                {/* Top */}

                <div className="flex items-center justify-between">

                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Sentence {index + 1}
                  </p>

                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
                  >
                    {percentage.toFixed(0)}%
                  </motion.div>

                </div>

                {/* Progress */}

                <div className="h-2 overflow-hidden rounded-full bg-muted">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      delay: index * 0.12,
                      duration: 0.8,
                    }}
                    className="h-full rounded-full bg-primary"
                  />

                </div>

                {/* Sentence */}

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: index * 0.12 + 0.2,
                  }}
                  className="font-serif text-[1.08rem] leading-[2] text-foreground"
                >
                  {item.sentence}
                </motion.p>

              </motion.div>

            );

          })}

        </div>

      </motion.div>

    </motion.section>
  );
}
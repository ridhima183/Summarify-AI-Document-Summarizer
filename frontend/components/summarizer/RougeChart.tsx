"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

import type { RougeScores } from "@/types/summarizer";

type RougeChartProps = {
  rouge?: RougeScores | null;
};

const descriptions = {
  rouge1: "Measures word-level overlap.",
  rouge2: "Measures phrase-level overlap.",
  rougeL: "Measures sequence similarity.",
};

export default function RougeChart({
  rouge,
}: RougeChartProps) {
  if (!rouge) return null;

  const metrics = [
    {
      title: "ROUGE-1",
      value: rouge.rouge1,
      description: descriptions.rouge1,
    },
    {
      title: "ROUGE-2",
      value: rouge.rouge2,
      description: descriptions.rouge2,
    },
    {
      title: "ROUGE-L",
      value: rouge.rougeL,
      description: descriptions.rougeL,
    },
  ];

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
        delay: 0.4,
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
                rotate: -8,
                scale: 1.08,
              }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
            >
              <Award className="h-7 w-7 text-primary" />
            </motion.div>

            <div>

              <h2 className="font-serif text-4xl">
                ROUGE Evaluation
              </h2>

              <p className="mt-2 text-muted-foreground">
                Comparing the generated summary
                with your reference summary.
              </p>

            </div>

          </div>

        </div>

        {/* Metrics */}

        <div className="divide-y divide-border">

          {metrics.map((metric, index) => {

            const percentage =
              metric.value * 100;

            return (

              <motion.div
                key={metric.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.45,
                }}
                whileHover={{
                  backgroundColor:
                    "rgba(148,163,184,0.04)",
                }}
                className="space-y-5 px-10 py-8"
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-serif text-2xl">
                    {metric.title}
                  </h3>

                  <motion.span
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary"
                  >
                    {percentage.toFixed(1)}%
                  </motion.span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${percentage}%`,
                    }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.8,
                    }}
                    className="h-full rounded-full bg-primary"
                  />

                </div>

                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: index * 0.15 + 0.2,
                  }}
                  className="text-muted-foreground"
                >
                  {metric.description}
                </motion.p>

              </motion.div>

            );

          })}

        </div>

      </motion.div>

    </motion.section>
  );
}
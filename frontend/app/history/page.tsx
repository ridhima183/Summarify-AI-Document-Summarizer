"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";

import {
  getHistory,
  type HistoryItem,
} from "@/lib/history";

export default function HistoryPage() {
  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">

        <section className="mx-auto max-w-5xl px-6 py-20">

          {/* Hero */}

          <motion.header
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-16 text-center"
          >

            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-muted-foreground">
              Session History
            </p>

            <h1 className="font-serif text-6xl">
              Reading Log
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
              Your most recent summaries from this browser session.
            </p>

          </motion.header>

          {history.length === 0 ? (

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="paper p-16 text-center"
            >

              <h2 className="font-serif text-4xl">
                No summaries yet
              </h2>

              <p className="mt-5 text-lg text-muted-foreground">
                Generate your first summary and it
                will appear here.
              </p>

            </motion.div>

          ) : (

            <div className="space-y-10">

              {history.map((item, index) => (

                <motion.article
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.55,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="paper p-8 transition-shadow hover:shadow-2xl"
                >

                  <div className="mb-6 flex items-center justify-between">

                    <motion.span
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      {item.method}
                    </motion.span>

                    <motion.span
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Clock3 className="h-4 w-4" />
                      {item.timestamp}
                    </motion.span>

                  </div>

                  <h2 className="mb-3 font-serif text-2xl">
                    Original Text
                  </h2>

                  <p className="line-clamp-3 leading-8 text-muted-foreground">
                    {item.input}
                  </p>

                  <div className="my-8 h-px bg-border" />

                  <h2 className="mb-3 font-serif text-2xl">
                    Summary
                  </h2>

                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay:
                        index * 0.15 + 0.2,
                    }}
                    className="font-serif text-lg leading-9"
                  >
                    {item.summary}
                  </motion.p>

                </motion.article>

              ))}

            </div>

          )}

        </section>

      </main>
    </>
  );
}
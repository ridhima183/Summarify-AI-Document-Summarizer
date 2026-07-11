"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Download,
  BookOpenText,
} from "lucide-react";

import type { SummarizeResponse } from "@/types/summarizer";

type SummaryPaperProps = {
  result: SummarizeResponse;
};

export default function SummaryPaper({
  result,
}: SummaryPaperProps) {
  const summary = result.summary ?? "";

  const wordCount = summary
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  async function copySummary() {
    await navigator.clipboard.writeText(summary);
  }

  function downloadSummary() {
    const blob = new Blob([summary], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "summary.txt";

    link.click();

    URL.revokeObjectURL(url);
  }

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
      }}
      className="reading-column mt-24"
    >
      <motion.article
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          paper
          overflow-hidden
          transition-shadow
          hover:shadow-2xl
        "
      >
        {/* Header */}

        <div className="border-b border-border px-10 py-8">

          <div className="flex flex-wrap items-center justify-between gap-6">

            <div className="flex items-center gap-4">

              <motion.div
                whileHover={{
                  rotate: -8,
                  scale: 1.08,
                }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
              >
                <BookOpenText
                  className="h-7 w-7 text-primary"
                />
              </motion.div>

              <div>

                <h2 className="font-serif text-4xl">
                  Summary
                </h2>

                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  {result.method}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <motion.button
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={copySummary}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition hover:bg-primary hover:text-white"
              >
                <Copy size={18} />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={downloadSummary}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition hover:bg-primary hover:text-white"
              >
                <Download size={18} />
              </motion.button>

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="flex flex-wrap gap-8 border-b border-border px-10 py-5 text-sm text-muted-foreground">

          <span>

            <strong className="text-foreground">
              {wordCount}
            </strong>{" "}
            words

          </span>

          <span>

            <strong className="text-foreground">
              {readingTime}
            </strong>{" "}
            min read

          </span>

          {result.characters_extracted && (

            <span>

              <strong className="text-foreground">
                {result.characters_extracted}
              </strong>{" "}
              characters

            </span>

          )}

        </div>

        {/* Summary */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          className="px-10 py-14"
        >

          <div
            className="
              reading-column
              font-serif
              text-[1.18rem]
              leading-[2.2]
              tracking-[0.01em]
              whitespace-pre-wrap
            "
          >
            {summary}
          </div>

        </motion.div>

      </motion.article>

    </motion.section>
  );
}
"use client";

import type { SummarizeRequest } from "@/types/summarizer";

type ControlsProps = {
  method: SummarizeRequest["method"];
  setMethod: (value: SummarizeRequest["method"]) => void;

  numSentences: number;
  setNumSentences: (value: number) => void;

  referenceSummary: string;
  setReferenceSummary: (value: string) => void;

  loading: boolean;

  onSummarize: () => void;
};

const methods = [
  {
    value: "tfidf",
    label: "Quick Summary",
    subtitle: "TF-IDF",
    description:
      "Fast extractive summarization. Best for short articles and notes.",
  },
  {
    value: "textrank",
    label: "Smart Summary",
    subtitle: "TextRank",
    description:
      "Graph-based extractive summarization with sentence ranking.",
  },
  {
    value: "abstractive",
    label: "AI Summary",
    subtitle: "BART",
    description:
      "Transformer-powered abstractive summarization.",
  },
  {
    value: "longdoc",
    label: "Long Document AI",
    subtitle: "LED",
    description:
      "Optimized for research papers and long documents.",
  },
];

export default function Controls({
  method,
  setMethod,
  numSentences,
  setNumSentences,
  referenceSummary,
  setReferenceSummary,
  loading,
  onSummarize,
}: ControlsProps) {
  const currentMethod =
    methods.find((m) => m.value === method);

  return (
    <section className="paper p-8 lg:p-10">

      <h2 className="mb-8 font-serif text-3xl">
        Choose Summary Style
      </h2>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Method */}

        <div>

          <label className="mb-2 block font-medium">
            Summary Style
          </label>

          <select
            value={method}
            disabled={loading}
            onChange={(e) =>
              setMethod(
                e.target
                  .value as SummarizeRequest["method"]
              )
            }
            className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:border-primary disabled:opacity-60"
          >
            {methods.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label} ({item.subtitle})
              </option>
            ))}
          </select>

          <p className="mt-3 text-sm text-muted-foreground">
            {currentMethod?.description}
          </p>

        </div>

        {/* Sentences */}

        <div>

          <label className="mb-2 block font-medium">
            Number of Sentences
          </label>

          <input
            type="number"
            min={1}
            disabled={loading}
            value={numSentences}
            onChange={(e) =>
              setNumSentences(
                Number(e.target.value)
              )
            }
            className="w-full rounded-xl border border-border bg-background p-3 outline-none transition focus:border-primary disabled:opacity-60"
          />

        </div>

      </div>

      {/* Reference Summary */}

      <div className="mt-8">

        <label className="mb-2 block font-medium">
          Reference Summary (Optional)
        </label>

        <textarea
          rows={5}
          disabled={loading}
          value={referenceSummary}
          onChange={(e) =>
            setReferenceSummary(
              e.target.value
            )
          }
          placeholder="Paste a reference summary to evaluate ROUGE scores..."
          className="w-full rounded-xl border border-border bg-background p-4 outline-none transition focus:border-primary disabled:opacity-60"
        />

      </div>

      {/* Button */}

      <div className="mt-10 flex justify-center">

        <button
          disabled={loading}
          onClick={onSummarize}
          className="rounded-full bg-primary px-10 py-4 text-lg font-medium text-primary-foreground transition hover:scale-105 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Generating Summary..."
            : "Generate Summary"}
        </button>

      </div>

    </section>
  );
}
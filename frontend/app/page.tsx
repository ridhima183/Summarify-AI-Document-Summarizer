"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";

import LoadingOverlay from "@/components/summarizer/LoadingOverlay";
import PageReveal from "@/components/summarizer/PageReveal";

import InputSection from "@/components/summarizer/InputSection";
import SummaryPaper from "@/components/summarizer/SummaryPaper";
import RankedSentences from "@/components/summarizer/RankedSentences";
import RougeChart from "@/components/summarizer/RougeChart";

import { summarize, uploadFile } from "@/lib/api";
import { saveHistory } from "@/lib/history";

import type {
  SummarizeRequest,
  SummarizeResponse,
} from "@/types/summarizer";

export default function Home() {
  const [text, setText] = useState("");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [method, setMethod] =
    useState<SummarizeRequest["method"]>("tfidf");

  const [numSentences, setNumSentences] =
    useState(3);

  const [referenceSummary, setReferenceSummary] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState<SummarizeResponse | null>(null);

  async function handleSummarize() {
    if (!text.trim() && !selectedFile) {
      setError(
        "Please paste some text or upload a document."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      let response: SummarizeResponse;

      if (selectedFile) {
        response = await uploadFile(
          selectedFile,
          method,
          numSentences,
          referenceSummary
        );
      } else {
        response = await summarize({
          text,
          method,
          num_sentences: numSentences,
          reference_summary:
            referenceSummary || undefined,
        });
      }

      setResult(response);

      saveHistory({
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleString(),
        method,
        input: selectedFile
          ? selectedFile.name
          : text,
        summary: response.summary,
      });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Unable to connect to the backend. Please ensure the FastAPI server is running."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <LoadingOverlay
        isLoading={loading}
      />

      <Navbar />

      <main className="min-h-screen bg-background">

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

          <InputSection
            text={text}
            setText={setText}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            method={method}
            setMethod={setMethod}
            numSentences={numSentences}
            setNumSentences={setNumSentences}
            referenceSummary={referenceSummary}
            setReferenceSummary={setReferenceSummary}
            loading={loading}
            onSummarize={handleSummarize}
          />

          {error && (
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-red-300 bg-red-50 px-6 py-5 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
              {error}
            </div>
          )}

          {!result && !loading && (
            <div className="reading-column mt-20">

              <div className="paper p-14 text-center">

                <h2 className="font-serif text-4xl">
                  Ready to Summarize
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Paste your text or upload a document,
                  choose a summary style, and generate a
                  concise summary in seconds.
                </p>

              </div>

            </div>
          )}

          <PageReveal show={!!result}>
            {result && (
              <>
                <SummaryPaper
                  result={result}
                />

                <RankedSentences
                  sentences={
                    result.ranked_sentences
                  }
                />

                <RougeChart
                  rouge={result.rouge}
                />
              </>
            )}
          </PageReveal>

        </section>

      </main>
    </>
  );
}
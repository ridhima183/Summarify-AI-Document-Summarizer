"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

const stages = [
  {
    title: "Stage 1 · Document Acquisition",
    content:
      "The system accepts plain text as well as PDF, DOCX and TXT documents. Uploaded files are processed to extract readable text while unsupported or empty files are rejected with meaningful validation messages.",
  },
  {
    title: "Stage 2 · Text Preprocessing",
    content:
      "The extracted text is cleaned and normalized before summarization. The pipeline performs sentence tokenization, word tokenization, stop-word removal and sentence embedding generation using the MiniLM sentence-transformer model.",
  },
  {
    title: "Stage 3 · Extractive Summarization",
    content:
      "Two extractive approaches are implemented. TF-IDF ranks sentences based on term importance and cosine similarity, while TextRank constructs a graph of sentence relationships and applies PageRank to identify the most informative sentences.",
  },
  {
    title: "Stage 4 · Abstractive Summarization",
    content:
      "For AI-generated summaries, Facebook's BART model rewrites the original text into concise natural language. For research papers and lengthy reports, the Longformer Encoder Decoder (LED) model efficiently processes documents far beyond the token limits of traditional transformers.",
  },
  {
    title: "Stage 5 · Evaluation",
    content:
      "Whenever a reference summary is provided, the generated summary is evaluated using ROUGE-1, ROUGE-2 and ROUGE-L metrics. These scores quantify lexical overlap and sequence similarity, enabling objective comparison between generated and reference summaries.",
  },
];

export default function MethodologyPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">

        <section className="mx-auto max-w-4xl px-6 py-20">

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
            className="mb-20 text-center"
          >

            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-muted-foreground">
              System Design
            </p>

            <h1 className="font-serif text-6xl leading-tight">
              Methodology
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
              This application combines traditional Natural Language
              Processing techniques with modern transformer-based
              models to generate accurate summaries for documents of
              varying sizes.
            </p>

          </motion.header>

          {/* Timeline */}

          <article className="relative reading-column">

            <div className="absolute left-5 top-0 h-full w-px bg-border" />

            <div className="space-y-12">

              {stages.map((stage, index) => (

                <motion.section
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.55,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="paper relative ml-12 p-8 transition-shadow hover:shadow-2xl"
                >

                  {/* Timeline Dot */}

                  <div className="absolute -left-[3.35rem] top-10 h-5 w-5 rounded-full border-4 border-background bg-primary" />

                  <h2 className="font-serif text-3xl">
                    {stage.title}
                  </h2>

                  <div className="my-6 h-px bg-border" />

                  <p className="text-lg leading-9 text-foreground">
                    {stage.content}
                  </p>

                </motion.section>

              ))}

            </div>

          </article>

        </section>

      </main>
    </>
  );
}
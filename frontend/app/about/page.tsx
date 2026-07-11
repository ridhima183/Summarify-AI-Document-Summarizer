import Navbar from "@/components/layout/Navbar";

const sections = [
  {
    title: "Project Overview",
    content:
      "This application is an AI-powered text summarization platform built to transform lengthy documents into concise, meaningful summaries. It combines traditional Natural Language Processing techniques with modern transformer-based models to support both extractive and abstractive summarization.",
  },
  {
    title: "Technologies Used",
    content:
      "Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion.\nBackend: FastAPI, Python.\nAI & NLP: TF-IDF, TextRank, Sentence Transformers (MiniLM), Facebook BART, Longformer Encoder Decoder (LED), ROUGE Evaluation.",
  },
  {
    title: "System Architecture",
    content:
      "The application follows a modular architecture. The frontend communicates with the FastAPI backend through REST APIs. Uploaded documents are processed, preprocessed, summarized using the selected model, evaluated with ROUGE when applicable, and returned to the frontend for presentation.",
  },
  {
    title: "Key Features",
    content:
      "• Plain text summarization\n• PDF, DOCX and TXT upload\n• Multiple summarization algorithms\n• ROUGE evaluation\n• Session reading history\n• Premium reading interface\n• Dark and light themes",
  },
  {
    title: "Future Enhancements",
    content:
      "Future improvements include OCR for scanned PDFs, multilingual summarization, user authentication, cloud deployment, persistent history, collaborative workspaces, and custom summarization lengths powered by large language models.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-4xl px-6 py-20">

          <header className="mb-20 text-center">

            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-muted-foreground">
              About This Project
            </p>

            <h1 className="font-serif text-6xl leading-tight">
              AI Text Summarizer
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
              A portfolio project demonstrating modern Natural Language
              Processing techniques, transformer models and full-stack
              application development.
            </p>

          </header>

          <article className="reading-column space-y-16">

            {sections.map((section) => (
              <section key={section.title}>

                <h2 className="font-serif text-4xl">
                  {section.title}
                </h2>

                <div className="my-6 h-px bg-border" />

                <p className="whitespace-pre-line text-lg leading-9">
                  {section.content}
                </p>

              </section>
            ))}

          </article>

        </section>
      </main>
    </>
  );
}
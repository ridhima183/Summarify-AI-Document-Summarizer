import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Text Summarizer",
  description:
    "An AI-powered document summarization platform supporting extractive and abstractive summarization using TF-IDF, TextRank, BART and LED.",
  keywords: [
    "AI",
    "Summarization",
    "NLP",
    "TextRank",
    "TF-IDF",
    "BART",
    "LED",
    "FastAPI",
    "Next.js",
  ],
  authors: [
    {
      name: "Ridhima Gadalay",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${lora.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
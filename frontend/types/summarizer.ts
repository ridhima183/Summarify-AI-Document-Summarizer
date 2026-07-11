// =========================
// Request Types
// =========================

export interface SummarizeRequest {
  text: string;
  method: "tfidf" | "textrank" | "bart" | "led";
  num_sentences: number;
  reference_summary?: string;
}

// =========================
// Ranked Sentence
// =========================

export interface RankedSentence {
  sentence: string;
  score: number;
}

// =========================
// ROUGE Scores
// =========================

export interface RougeScores {
  rouge1: number;
  rouge2: number;
  rougeL: number;
}

// =========================
// Backend Response
// =========================

export interface SummarizeResponse {
  summary: string;

  method: string;

  ranked_sentences: RankedSentence[] | null;

  rouge?: RougeScores | null;

  note?: string | null;

  filename?: string;

  characters_extracted?: number;
}

// =========================
// API Error
// =========================

export interface ApiError {
  detail: string;
}
import type {
  ApiError,
  SummarizeRequest,
  SummarizeResponse,
} from "@/types/summarizer";

const API_BASE_URL = "http://127.0.0.1:8000";

// ================================
// Summarize Text
// ================================

export async function summarize(
  data: SummarizeRequest
): Promise<SummarizeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.detail);
  }

  return response.json();
}

// ================================
// Upload File
// ================================

export async function uploadFile(
  file: File,
  method: string,
  numSentences: number,
  referenceSummary?: string
): Promise<SummarizeResponse> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("method", method);
  formData.append("num_sentences", String(numSentences));

  if (referenceSummary?.trim()) {
    formData.append("reference_summary", referenceSummary);
  }

  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.detail);
  }

  return response.json();
}
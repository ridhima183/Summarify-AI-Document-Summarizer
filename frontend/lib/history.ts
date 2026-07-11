export type HistoryItem = {
  id: string;
  timestamp: string;
  method: string;
  input: string;
  summary: string;
};

const STORAGE_KEY = "summarizer-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

export function saveHistory(item: HistoryItem) {
  const history = getHistory();

  history.unshift(item);

  if (history.length > 5) {
    history.pop();
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}
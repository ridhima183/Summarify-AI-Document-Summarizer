"use client";

type InputPanelProps = {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
};

export default function InputPanel({
  value,
  onChange,
  loading = false,
}: InputPanelProps) {
  return (
    <section className="paper p-8 lg:p-10">

      <div className="mb-6">

        <p className="mt-2 text-muted-foreground">
          Paste an article, report, research paper or
          any long text to generate a summary.
        </p>

      </div>

      <textarea
        value={value}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your document here..."
        className="
          min-h-[450px]
          w-full
          resize-none
          rounded-2xl
          border
          border-border
          bg-background
          p-6
          font-serif
          text-lg
          leading-9
          outline-none
          transition
          focus:border-primary
          focus:ring-2
          focus:ring-primary/20
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">

        <span>
          {value.length} characters
        </span>

        <span>
          {value.trim().length === 0
            ? "Waiting for input"
            : "Ready to summarize"}
        </span>

      </div>

    </section>
  );
}
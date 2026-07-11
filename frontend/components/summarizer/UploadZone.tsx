"use client";

import { useRef, useState } from "react";
import {
  FileText,
  UploadCloud,
  X,
} from "lucide-react";

type UploadZoneProps = {
  file: File | null;
  onChange: (file: File | null) => void;
  loading?: boolean;
};

export default function UploadZone({
  file,
  onChange,
  loading = false,
}: UploadZoneProps) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [dragging, setDragging] =
    useState(false);

  function handleFile(file: File | null) {
    if (!loading) {
      onChange(file);
    }
  }

  return (
    <section>

      <div className="mb-6">

        <h2 className="font-serif text-3xl">
          Upload Document
        </h2>

        <p className="mt-2 text-muted-foreground">
          PDF, DOCX and TXT files are supported.
        </p>

      </div>

      <div
        onClick={() =>
          !loading &&
          inputRef.current?.click()
        }
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() =>
          setDragging(false)
        }
        onDrop={(e) => {
          e.preventDefault();

          setDragging(false);

          handleFile(
            e.dataTransfer.files[0] ??
              null
          );
        }}
        className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          p-10
          text-center
          transition-all
          duration-300

          ${
            dragging
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary hover:bg-primary/5"
          }

          ${
            loading
              ? "pointer-events-none opacity-60"
              : ""
          }
        `}
      >

        {!file ? (
          <>
            <UploadCloud
              className="mx-auto mb-6 text-primary"
              size={54}
            />

            <h3 className="font-serif text-2xl">
              Drag & Drop
            </h3>

            <p className="mt-4 text-muted-foreground">
              or click to browse
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">

              <span className="rounded-full border px-4 py-2">
                PDF
              </span>

              <span className="rounded-full border px-4 py-2">
                DOCX
              </span>

              <span className="rounded-full border px-4 py-2">
                TXT
              </span>

            </div>
          </>
        ) : (
          <div>

            <FileText
              className="mx-auto mb-6 text-primary"
              size={54}
            />

            <h3 className="font-serif text-2xl break-all">
              {file.name}
            </h3>

            <p className="mt-3 text-muted-foreground">
              {(
                file.size /
                1024
              ).toFixed(1)}{" "}
              KB
            </p>

            <button
              type="button"
              disabled={loading}
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 transition hover:bg-destructive hover:text-white"
            >
              <X size={16} />
              Remove File
            </button>

          </div>
        )}

        <input
          ref={inputRef}
          hidden
          type="file"
          disabled={loading}
          accept=".pdf,.docx,.txt"
          onChange={(e) =>
            handleFile(
              e.target.files?.[0] ??
                null
            )
          }
        />

      </div>

    </section>
  );
}
"use client";

import InputPanel from "./InputPanel";
import UploadZone from "./UploadZone";
import Controls from "./Controls";
import { motion } from "framer-motion";

import type { SummarizeRequest } from "@/types/summarizer";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    
    },
  },
};  

type InputSectionProps = {
  text: string;
  setText: (value: string) => void;

  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;

  method: SummarizeRequest["method"];
  setMethod: (value: SummarizeRequest["method"]) => void;

  numSentences: number;
  setNumSentences: (value: number) => void;

  referenceSummary: string;
  setReferenceSummary: (value: string) => void;

  loading: boolean;

  onSummarize: () => void;
};

export default function InputSection({
  text,
  setText,

  selectedFile,
  setSelectedFile,

  method,
  setMethod,

  numSentences,
  setNumSentences,

  referenceSummary,
  setReferenceSummary,

  loading,

  onSummarize,
}: InputSectionProps) {
  return (
    <motion.div
      className="space-y-14"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Hero */}
      <motion.section
        variants={itemVariants}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-muted-foreground">
          AI Powered Summarization
        </p>
        <h1 className="font-serif text-5xl leading-tight lg:text-7xl">
          Read Less.
          <br />
          Understand More.
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground">
          A premium AI reading companion built for
          research papers, articles, reports and long
          documents.
        </p>
      </motion.section>

      {/* 2. Text Input */}
      <motion.section
        variants={itemVariants}
        className="space-y-5"
      >
        <InputPanel
          value={text}
          loading={loading}
          onChange={(value) => {
            setText(value);
            if (value.trim()) {
              setSelectedFile(null);
            }
          }}
        />
      </motion.section>

      {/* 3. Divider */}
      <motion.div 
        variants={itemVariants} 
        className="flex items-center gap-5"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
          OR
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {/* 4. File Upload */}
      <motion.section
        variants={itemVariants}
        className="space-y-5"
      >

        <UploadZone
          file={selectedFile}
          loading={loading}
          onChange={(file) => {
            setSelectedFile(file);
            if (file) {
              setText("");
            }
          }}
        />
      </motion.section>

      {/* 5. Controls */}
      <motion.section 
        variants={itemVariants} 
        className="pt-4"
      >
        <Controls
          method={method}
          setMethod={setMethod}
          numSentences={numSentences}
          setNumSentences={setNumSentences}
          referenceSummary={referenceSummary}
          setReferenceSummary={setReferenceSummary}
          loading={loading}
          onSummarize={onSummarize}
        />
      </motion.section>
    </motion.div>
  );
}

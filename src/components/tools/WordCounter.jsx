"use client";

import { useState, useMemo } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [countSpaces, setCountSpaces] = useState(false);
  const counts = useMemo(() => {
    const t = text.trim();
    const words = t ? t.split(/\s+/).length : 0;
    const characters = countSpaces
      ? text.length
      : text.replace(/ /g, "").length;
    const sentences = t
      ? text
          .split(/[.!?]+/)
          .filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = t
      ? text
          .split(/\n\s*\n/)
          .filter((p) => p.trim().length > 0).length
      : 0;
    const lines = text ? text.split(/\n/).length : 0;

    return { words, characters, sentences, paragraphs, lines };
  }, [text, countSpaces]);

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-2">
          Enter your text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          rows={8}
          className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white resize-none"
        />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={countSpaces}
            onChange={(e) => setCountSpaces(e.target.checked)}
            className="w-4 h-4 text-brand rounded border-border focus:ring-brand"
          />
          <span className="text-sm text-text-muted">
            Count spaces in character count
          </span>
        </label>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
          <div className="text-2xl md:text-3xl font-extrabold text-brand mb-1">
            {counts.words.toLocaleString()}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Words
          </div>
        </div>
        <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
          <div className="text-2xl md:text-3xl font-extrabold text-brand mb-1">
            {counts.characters.toLocaleString()}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Characters
          </div>
        </div>
        <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
          <div className="text-2xl md:text-3xl font-extrabold text-brand mb-1">
            {counts.sentences.toLocaleString()}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Sentences
          </div>
        </div>
        <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
          <div className="text-2xl md:text-3xl font-extrabold text-brand mb-1">
            {counts.paragraphs.toLocaleString()}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Paragraphs
          </div>
        </div>
        <div className="bg-bg-soft rounded-xl p-5 text-center border border-border col-span-2 md:col-span-1">
          <div className="text-2xl md:text-3xl font-extrabold text-brand mb-1">
            {counts.lines.toLocaleString()}
          </div>
          <div className="text-xs text-text-muted uppercase tracking-wide">
            Lines
          </div>
        </div>
      </div>
    </div>
  );
}

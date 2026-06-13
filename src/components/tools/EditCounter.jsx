"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui";

function countWords(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export default function EditCounter() {
  const [originalText, setOriginalText] = useState("");
  const [editedText, setEditedText] = useState("");
  const result = useMemo(() => {
    const origCount = countWords(originalText);
    const editCount = countWords(editedText);
    const diff = editCount - origCount;

    let percent;
    if (origCount > 0) {
      percent = (diff / origCount) * 100;
    } else if (editCount > 0) {
      percent = 100;
    } else {
      percent = 0;
    }

    return {
      original: origCount,
      edited: editCount,
      difference: diff,
      changePercent: percent,
    };
  }, [originalText, editedText]);

  const clearAll = () => {
    setOriginalText("");
    setEditedText("");
  };

  const getDiffClass = (diff) => {
    if (diff > 0) return "text-green-600";
    if (diff < 0) return "text-red-600";
    return "text-text";
  };

  const formatDiff = (diff) => {
    return diff > 0 ? `+${diff}` : `${diff}`;
  };

  const formatPercent = (diff, pct) => {
    const prefix = diff > 0 ? "+" : "";
    return `${prefix}${pct.toFixed(1)}%`;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Original Text
          </label>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste your original text here..."
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Edited Text
          </label>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            placeholder="Paste your edited text here..."
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white resize-none"
          />
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
          <h3 className="font-semibold text-text mb-6 text-lg text-center">
            ✂️ Edit Comparison
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
              <div className="text-sm text-text-muted mb-1">Original</div>
              <div className="text-2xl font-extrabold text-text">
                {result.original.toLocaleString()}
              </div>
            </div>
            <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
              <div className="text-sm text-text-muted mb-1">Edited</div>
              <div className="text-2xl font-extrabold text-text">
                {result.edited.toLocaleString()}
              </div>
            </div>
            <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
              <div className="text-sm text-text-muted mb-1">Difference</div>
              <div
                className={`text-2xl font-extrabold ${getDiffClass(
                  result.difference
                )}`}
              >
                {formatDiff(result.difference)}
              </div>
            </div>
            <div className="bg-bg-soft rounded-xl p-5 text-center border border-border">
              <div className="text-sm text-text-muted mb-1">% Change</div>
              <div
                className={`text-2xl font-extrabold ${getDiffClass(
                  result.difference
                )}`}
              >
                {formatPercent(result.difference, result.changePercent)}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={clearAll}>
          Clear All
        </Button>
      </div>
    </div>
  );
}

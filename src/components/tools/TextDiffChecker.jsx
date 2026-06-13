"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export default function TextDiffChecker() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState(null);

  const compareText = () => {
    const linesA = textA.split("\n");
    const linesB = textB.split("\n");
    const resultA = [];
    const resultB = [];
    let added = 0;
    let removed = 0;

    const maxLen = Math.max(linesA.length, linesB.length);

    for (let i = 0; i < maxLen; i++) {
      const lineA = i < linesA.length ? linesA[i] : "";
      const lineB = i < linesB.length ? linesB[i] : "";

      if (lineA === lineB) {
        resultA.push({ text: lineA, type: "unchanged" });
        resultB.push({ text: lineB, type: "unchanged" });
      } else {
        if (lineA !== "") {
          resultA.push({ text: lineA, type: "removed" });
          removed++;
        } else {
          resultA.push({ text: "", type: "empty" });
        }
        if (lineB !== "") {
          resultB.push({ text: lineB, type: "added" });
          added++;
        } else {
          resultB.push({ text: "", type: "empty" });
        }
      }
    }

    setDiff({
      resultA,
      resultB,
      added,
      removed,
      changed: added + removed,
    });
  };

  const swapText = () => {
    const temp = textA;
    setTextA(textB);
    setTextB(temp);
    setDiff(null);
  };

  const clearAll = () => {
    setTextA("");
    setTextB("");
    setDiff(null);
  };

  const getLineClass = (type) => {
    switch (type) {
      case "removed":
        return "bg-red-50 text-red-700";
      case "added":
        return "bg-green-50 text-green-700";
      case "unchanged":
        return "bg-gray-50 text-gray-700";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Original Text
          </label>
          <textarea
            value={textA}
            onChange={(e) => {
              setTextA(e.target.value);
              setDiff(null);
            }}
            placeholder="Paste your original text here..."
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white resize-none font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Modified Text
          </label>
          <textarea
            value={textB}
            onChange={(e) => {
              setTextB(e.target.value);
              setDiff(null);
            }}
            placeholder="Paste your modified text here..."
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white resize-none font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Button onClick={compareText}>🔍 Compare Texts</Button>
        <Button variant="secondary" onClick={swapText}>
          ⇄ Swap
        </Button>
        <Button variant="secondary" onClick={clearAll}>
          ✕ Clear All
        </Button>
      </div>

      {/* Stats */}
      {diff && (
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            +{diff.added} added
          </span>
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
            -{diff.removed} removed
          </span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            {diff.changed} lines changed
          </span>
        </div>
      )}

      {/* Diff Output */}
      {diff && (
        <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
          <h3 className="font-semibold text-text mb-6 text-lg text-center">
            📋 Comparison Result
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-text mb-3 text-center">
                Original
              </h4>
              <div className="border border-border rounded-lg overflow-hidden">
                {diff.resultA.map((line, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 font-mono text-sm border-b border-border last:border-b-0 ${getLineClass(
                      line.type
                    )}`}
                  >
                    <span className="inline-block w-8 text-gray-400 select-none">
                      {i + 1}
                    </span>
                    {line.type === "removed" && (
                      <span className="mr-2">−</span>
                    )}
                    {line.type === "added" && (
                      <span className="mr-2">+</span>
                    )}
                    {line.text || " "}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text mb-3 text-center">
                Modified
              </h4>
              <div className="border border-border rounded-lg overflow-hidden">
                {diff.resultB.map((line, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 font-mono text-sm border-b border-border last:border-b-0 ${getLineClass(
                      line.type
                    )}`}
                  >
                    <span className="inline-block w-8 text-gray-400 select-none">
                      {i + 1}
                    </span>
                    {line.type === "removed" && (
                      <span className="mr-2">−</span>
                    )}
                    {line.type === "added" && (
                      <span className="mr-2">+</span>
                    )}
                    {line.text || " "}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

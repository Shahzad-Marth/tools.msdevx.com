"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export default function CaseConverter() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [currentCase, setCurrentCase] = useState("lower");

  const convertTo = (text, caseType) => {
    let result = "";
    switch (caseType) {
      case "lower":
        result = text.toLowerCase();
        break;
      case "upper":
        result = text.toUpperCase();
        break;
      case "title":
        result = text.replace(/\w\S*/g, (w) => {
          return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
        });
        break;
      case "sentence":
        result = text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => {
          return c.toUpperCase();
        });
        break;
      case "toggle":
        result = text.replace(/[a-zA-Z]/g, (c) => {
          return c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase();
        });
        break;
      default:
        result = text;
    }
    return result;
  };

  const handleCaseChange = (caseType) => {
    setCurrentCase(caseType);
    setOutputText(convertTo(inputText, caseType));
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    setOutputText(convertTo(newText, currentCase));
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const copyToClipboard = async () => {
   try {
     await navigator.clipboard.writeText(outputText);
   } catch (err) {
     if (import.meta.env.DEV) {
       console.error("Failed to copy:", err);
     }
   }
  };

  const caseOptions = [
    { id: "lower", label: "lowercase" },
    { id: "upper", label: "UPPERCASE" },
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
    { id: "toggle", label: "tOGGLE cASE" },
  ];

  return (
    <div>
      {/* Case Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {caseOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleCaseChange(option.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              currentCase === option.id
                ? "bg-brand text-white"
                : "bg-bg-soft text-text-muted hover:text-text hover:bg-border"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Input
          </label>
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter or paste your text here..."
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-border focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all text-text bg-white resize-none"
          />
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Output
          </label>
          <textarea
            value={outputText}
            readOnly
            rows={10}
            className="w-full px-4 py-3 rounded-lg border border-border bg-bg-soft text-text resize-none cursor-default"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mt-6">
        <Button variant="secondary" onClick={clearText}>
          Clear All
        </Button>
        {outputText && (
          <Button variant="outline" onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
        )}
      </div>
    </div>
  );
}

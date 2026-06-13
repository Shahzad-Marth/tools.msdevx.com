"use client";
import { useEffect, useRef } from "react";

export function HeadingLinker({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const headings = ref.current.querySelectorAll("h2");
    headings.forEach((h2, i) => {
      if (!h2.id) h2.id = `section-${i}`;
    });
  }, []);
  return <div ref={ref}>{children}</div>;
}

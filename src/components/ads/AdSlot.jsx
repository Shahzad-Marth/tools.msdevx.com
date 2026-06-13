"use client";

import { useEffect, useRef } from "react";

export default function AdSlot() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
    initialized.current = true;
  }, []);

  return (
    <div className="my-6 md:my-8 flex justify-center overflow-hidden min-h-[90px]">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8684958562988579"
        data-ad-slot="3516852997"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

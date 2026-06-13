const OVERRIDES = {
  "how-old-am-i-in-seconds": "AgeInSeconds",
  "what-day-was-i-born": "WhatDayWasI",
  "date-difference": "DateDifferenceCalculator",
  "emi-calculator": "EMICalculator",
  "capitalize": "CapitalizeText",
};

function pascalCase(slug) {
  return slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

export function slugToComponent(slug) {
  return OVERRIDES[slug] || pascalCase(slug);
}

export function buildComponentMap(slugs) {
  const map = {};
  for (const slug of slugs) {
    map[slug] = slugToComponent(slug);
  }
  return map;
}

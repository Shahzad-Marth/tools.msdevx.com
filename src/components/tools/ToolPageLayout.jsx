import Link from "next/link";
import { Breadcrumbs } from "@/components/blog";
import { ShareSection } from "@/components/ui/ShareSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { siteConfig } from "@/data/site";

const DISCLAIMERS = {
  "health": {
    title: "Medical Disclaimer",
    body: "The results from this calculator are estimates for informational purposes only and are not a substitute for professional medical advice, diagnosis, or treatment. Individual health needs vary — do not rely on these estimates to make medical decisions. Always consult a qualified healthcare provider before starting any diet, exercise, or wellness program.",
  },
  "finance": {
    title: "Financial Disclaimer",
    body: "The results from this calculator are estimates for informational and educational purposes only. They are not financial advice and should not be the sole basis for any financial decision. Actual loan terms, interest rates, and investment returns may differ significantly from these estimates. Consult a qualified financial professional before making financial commitments.",
  },
  "security": {
    title: "Security & Privacy Note",
    body: "This tool runs entirely in your browser. No password, data, or input is ever sent to any server — everything stays on your device. While we follow security best practices, we recommend using unique passwords for each service and considering a dedicated password manager for added security.",
  },
};

const FORMULA_DEFAULTS = {
  "date-time": (tool) => tool.name.includes("Age") ? {
    title: "Age Calculation Method",
    body: "Age is calculated by subtracting the birth date from the reference date. The result accounts for leap years and varying month lengths. Years are counted as complete 12-month periods.",
  } : tool.name.includes("Date") ? {
    title: "Date Difference Method",
    body: "The date difference is calculated as the absolute difference in milliseconds between two dates, then converted to days, weeks, months, and years. Business days mode excludes Saturdays and Sundays.",
  } : null,
  "health": (tool) => ({
    title: "Formula & Method",
    body: `This calculator uses established formulas from peer-reviewed medical and fitness literature. Results are estimates based on population averages and may not reflect individual variations. ${tool.fullDescription.split(".").slice(0, 1).join(".")}.`,
  }),
  "finance": (tool) => ({
    title: "Formula Used",
    body: "Calculations use standard financial formulas. Results are estimates and may differ from actual figures due to rounding, compounding frequency, fees, and other factors not accounted for in these simplified calculations.",
  }),
  "math": (tool) => ({
    title: "Calculation Method",
    body: "Standard mathematical formulas are used. All calculations are performed client-side using JavaScript double-precision floating point (IEEE 754).",
  }),
  "security": (tool) => tool.name.includes("Password") ? {
    title: "Password Strength Estimation",
    body: "Password strength is estimated based on length, character variety, and common pattern detection. The entropy calculation assumes random character selection. Real-world security depends on how the password is generated, stored, and used.",
  } : null,
};

export function ToolPageLayout({
  tool,
  toolCategory,
  children,
  relatedTools,
  popularTools,
  toolBlogs,
}) {
  const disclaimer = DISCLAIMERS[tool.category];
  const formulaContent = FORMULA_DEFAULTS[tool.category]?.(tool);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/#tools" },
          { label: tool.name },
        ]}
        className="mb-6"
      />

      {/* 2. H1 and intro */}
      <div className="mb-6">
        <span className="text-4xl mb-2 block">{tool.icon}</span>
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">{tool.name}</h1>
        <p className="text-text-muted">{tool.fullDescription}</p>
        {toolCategory && (
          <Link
            href={`/${toolCategory.altSlug}`}
            className="inline-block mt-2 text-xs px-2.5 py-1 bg-brand-light text-brand rounded-md font-medium hover:bg-brand hover:text-white transition-colors"
          >
            {tool.categoryName}
          </Link>
        )}
      </div>

      {/* 3-4-5-6. Tool card: input, results, actions */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card">
        {children}
      </div>

      {/* Action bar */}
      <ShareSection
        title={tool.name}
        description={tool.fullDescription || tool.description}
        url={`${siteConfig.baseUrl}/tools/${tool.slug}`}
      />

      {/* 7. How to Use */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">How to Use This Tool</h2>
          <div className="bg-bg-soft rounded-xl p-6 border border-border">
            <ol className="space-y-3 text-text-muted list-decimal list-inside">
              {tool.howToUse.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 8. Example Use Cases */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">Example Use Cases</h2>
          <div className="bg-card border border-border rounded-xl p-6">
            <ul className="space-y-3 text-text-muted list-disc list-inside">
              {tool.keywords.slice(0, 4).map((kw, i) => (
                <li key={i}>
                  <strong className="text-text capitalize">{kw}</strong>
                  {" — "}Use this tool to get accurate results without manual calculations.
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 9. Formula / Method / Source notes */}
      {formulaContent && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">{formulaContent.title}</h2>
          <div className="bg-bg-soft rounded-xl p-6 border border-border">
            <p className="text-text-muted leading-relaxed">{formulaContent.body}</p>
          </div>
        </section>
      )}

      {/* 10. Limitations / Disclaimer */}
      {disclaimer && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-text mb-4">{disclaimer.title}</h2>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed">{disclaimer.body}</p>
          </div>
        </section>
      )}

      {/* 11. Related Tools */}
      {relatedTools.length > 0 && (
        <RelatedTools items={relatedTools} type="tool" title="Related Tools" />
      )}

      {popularTools.length > 0 && (
        <RelatedTools items={popularTools} type="tool" title="Popular Tools" />
      )}

      {/* 12. Related Articles */}
      {toolBlogs.length > 0 && (
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-bold text-text mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolBlogs.map((b) => (
              <Link
                key={b.slug}
                href={`/blog/${b.slug}`}
                className="group p-5 rounded-xl bg-card border border-border hover:shadow-card-hover hover:border-brand-light transition-all duration-200"
              >
                <div className="flex items-center gap-2 text-xs text-text-muted mb-2">
                  <span className="px-2 py-0.5 rounded bg-brand-light text-brand font-semibold">{b.category}</span>
                  <span>{b.date}</span>
                </div>
                <h3 className="font-semibold text-text group-hover:text-brand transition-colors">{b.title}</h3>
                <p className="text-sm text-text-muted mt-1 line-clamp-2">{b.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Read article →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

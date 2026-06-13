import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "./Breadcrumbs";

export function BlogLayout({ jsonLd, breadcrumbs, children }) {
  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-8" />}
        {children}
      </div>
    </>
  );
}

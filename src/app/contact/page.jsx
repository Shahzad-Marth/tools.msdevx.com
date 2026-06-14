import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/data/site";
import AdSlot from "@/components/ads/AdSlot";

export function generateMetadata() {
  return {
    title: "Contact Us",
    description: "Get in touch with MS DevX Tools. Send us a message, suggest a tool, report a bug, or ask a question.",
    openGraph: {
      title: "Contact Us | MS DevX Tools",
      description: "Get in touch with MS DevX Tools. Send us a message, suggest a tool, report a bug, or ask a question.",
      url: `${siteConfig.baseUrl}/contact`,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: siteConfig.ogImageWidth, height: siteConfig.ogImageHeight, alt: "MS DevX Tools - Free Online Tools" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | MS DevX Tools",
      description: "Get in touch with MS DevX Tools. Send us a message, suggest a tool, report a bug, or ask a question.",
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: `${siteConfig.baseUrl}/contact` },
  };
}

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact MS DevX Tools",
    description: "Get in touch with MS DevX Tools. Send us a message, suggest a tool, report a bug, or ask a question.",
    url: `${siteConfig.baseUrl}/contact`,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="max-w-3xl mx-auto px-6">
        <AdSlot />
      </div>
      <ContactForm />
      <div className="max-w-3xl mx-auto px-6">
        <AdSlot />
      </div>
    </>
  );
}

import Link from "next/link";
import { siteConfig, footerLinks } from "@/data/site";
import { InstallFooterLink } from "@/components/pwa/InstallFooterLink";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-8 px-6 bg-soft border-t border-border text-text-muted text-sm">
      <div className="flex justify-center gap-5 flex-wrap mb-3">
        {footerLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="hover:text-brand transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <InstallFooterLink />
      </div>
      <p>© {year} {siteConfig.name}. All rights reserved.</p>
    </footer>
  );
}

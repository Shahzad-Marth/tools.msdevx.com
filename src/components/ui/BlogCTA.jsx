import { ButtonLink } from "./Button";

export function BlogCTA({
  title,
  description,
  buttonText,
  buttonHref,
  children,
}) {
  return (
    <section className="not-prose my-10">
      <div className="text-center px-6 py-12 md:px-10 bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] rounded-3xl text-white shadow-2xl">
        
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          {title}
        </h2>

        {(description || children) && (
          <div className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            {description || children}
          </div>
        )}

        <ButtonLink
          to={buttonHref}
          variant="primary"
          className="inline-flex items-center justify-center"
        >
          {buttonText}
        </ButtonLink>
      </div>
    </section>
  );
}
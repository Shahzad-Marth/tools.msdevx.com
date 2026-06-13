export { COMPONENT_MAP } from "./tools";

export function getToolComponentName(slug) {
  return COMPONENT_MAP[slug] || null;
}

export { getBlogPostBySlug, getBlogsByCategory } from "./blogs";

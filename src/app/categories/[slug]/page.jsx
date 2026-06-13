import { redirect } from "next/navigation";
import { getCategoryBySlug, categoryList } from "@/data/registry";

export const dynamic = "force-dynamic";

export default async function CategoryRedirect({ params }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) redirect("/categories");
  redirect(`/${cat.altSlug}`, 308);
}

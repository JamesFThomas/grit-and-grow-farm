import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder/PagePlaceholder";

export const metadata: Metadata = {
  title: "Growing | Grit and Grow Farm",
  description:
    "What we grow, how we grow it, where to find it, and what is coming to the fields next.",
};

export default function Growing() {
  return (
    <PagePlaceholder
      title="Growing"
      intro="Heirloom vegetables and herbs grown in staggered waves on a small footprint, with natural inputs only."
      sections={[
        "This season's crops and varieties",
        "How we grow",
        "Where to find our produce",
        "What we are adding over the next five to ten years",
        "The rhythm of the season",
      ]}
    />
  );
}

import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder/PagePlaceholder";

export const metadata: Metadata = {
  title: "About | Grit and Grow Farm",
  description:
    "The story behind Grit and Grow Farm, the land in Byram, Mississippi, and the family running it.",
};

export default function About() {
  return (
    <PagePlaceholder
      title="About"
      intro="How a backyard garden turned into a production farm in Byram, Mississippi."
      sections={[
        "Our story and history",
        "Kayla and Farming Freedom",
        "The land and the farm layout",
        "Where the farm is headed",
        "Mission, values, and what we will not do",
      ]}
    />
  );
}

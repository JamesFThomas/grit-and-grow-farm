import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder/PagePlaceholder";

export const metadata: Metadata = {
  title: "Shop | Grit and Grow Farm",
  description:
    "The Grit and Grow Farm shop is not open yet. Here is what will be on it and how buying will work.",
};

export default function Shop() {
  return (
    <PagePlaceholder
      title="Shop"
      intro="The shop is not open yet. Nothing is in the ground, so nothing is for sale."
      sections={[
        "What we will sell",
        "How buying will work",
        "Delivery, farm stand, and shipping",
        "Hear first when the shop opens",
      ]}
    />
  );
}

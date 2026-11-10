import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/About/AboutPage";

export const metadata: Metadata = {
  title: "About | Grit and Grow Farm",
  description:
    "The story behind Grit and Grow Farm, the land in Byram, Mississippi, and the family running it.",
};

export default function About() {
  return <AboutPage />;
}

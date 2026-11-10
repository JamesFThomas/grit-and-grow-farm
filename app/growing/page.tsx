import type { Metadata } from "next";
import { GrowingPage } from "@/components/pages/Growing/GrowingPage";

export const metadata: Metadata = {
  title: "Growing | Grit And Grow Farm",
  description:
    "What we grow, how we grow it, where to find it, and what is coming to the fields next.",
};

export default function Growing() {
  return <GrowingPage />;
}

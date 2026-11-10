import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/Contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Grit And Grow Farm",
  description:
    "Send a message to Grit And Grow Farm in Byram, Mississippi, about delivery, wholesale, classes and events, or anything else.",
};

export default function Contact() {
  return <ContactPage />;
}

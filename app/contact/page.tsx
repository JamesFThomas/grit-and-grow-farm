import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/PagePlaceholder/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact | Grit and Grow Farm",
  description:
    "Reach Grit and Grow Farm by email, or follow along on social while the first season gets underway.",
};

export default function Contact() {
  return (
    <PagePlaceholder
      title="Contact"
      intro="The best way to follow the farm right now is on social. More ways to reach us open up once crops are in the ground."
      sections={[
        "Email us",
        "Follow on Instagram and YouTube",
        "Delivery and wholesale inquiries, once we are growing",
      ]}
    />
  );
}

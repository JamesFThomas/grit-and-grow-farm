import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { ContactForm } from "./components/ContactForm/ContactForm";
import styles from "./ContactPage.module.css";

export const ContactPage = () => (
  <main className={styles.main}>
    <PageHeader
      title="Contact"
      lede="Send us a message and we will get back to you."
    />

    <div className={styles.form}>
      <ContactForm />
    </div>
  </main>
);

import { PageHeader } from "../PageHeader/PageHeader";
import styles from "./PagePlaceholder.module.css";

type PagePlaceholderProps = {
  title: string;
  intro: string;
  sections: string[];
};

export const PagePlaceholder = ({
  title,
  intro,
  sections,
}: PagePlaceholderProps) => (
  <main className={styles.main}>
    <PageHeader title={title} lede={intro} />

    <h2 className={styles.heading}>Coming to this page</h2>
    <ul className={styles.list}>
      {sections.map((section) => (
        <li key={section} className={styles.item}>
          {section}
        </li>
      ))}
    </ul>
  </main>
);

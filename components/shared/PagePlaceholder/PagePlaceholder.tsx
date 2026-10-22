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
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.intro}>{intro}</p>

    <hr className={styles.rule} />

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

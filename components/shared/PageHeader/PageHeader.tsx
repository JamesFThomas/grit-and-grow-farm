import styles from "./PageHeader.module.css";

type PageHeaderProps = {
  title: string;
  lede: string;
};

export const PageHeader = ({ title, lede }: PageHeaderProps) => (
  <header className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    <p className={styles.lede}>{lede}</p>
  </header>
);

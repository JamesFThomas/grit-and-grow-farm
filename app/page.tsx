import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles.wordmark}>
          Grit <span className={styles.amp}>and</span> Grow Farm
        </h1>

        <p className={styles.tagline}>
          grow it <span className={styles.dot}>·</span> cook it{" "}
          <span className={styles.dot}>·</span> share it
        </p>

        <hr className={styles.rule} />

        <div className={styles.blurb}>
          <p>A small family farm in Byram, Mississippi.</p>
          <p>Vegetables, herbs, mushrooms, and raw honey.</p>
          <p>Grown with natural inputs only.</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Full site coming soon.</p>
      </footer>
    </main>
  );
}

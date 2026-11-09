import Image from "next/image";
import styles from "./HomePage.module.css";

export const HomePage = () => (
  <main className={styles.main}>
    <section className={styles.hero}>
      <div className={styles.intro}>
        <h1 className={styles.tagline}>
          <span className={styles.line}>grow it</span>{" "}
          <span className={styles.line}>cook it</span>{" "}
          <span className={styles.line}>share it</span>
        </h1>

        <hr className={styles.rule} />

        <div className={styles.blurb}>
          <p>A small family farm in Byram, Mississippi.</p>
          <p>Vegetables, herbs, mushrooms, and raw honey.</p>
          <p>Grown with natural inputs only.</p>
        </div>
      </div>

      <div className={styles.frame}>
        <Image
          className={styles.photo}
          src="/images/first-plot.jpg"
          alt="The first plot tilled and staked out in the back field, with the sun high over the tree line."
          width={1600}
          height={1200}
          sizes="(min-width: 60em) 52vw, 100vw"
          priority
        />
      </div>
    </section>
  </main>
);

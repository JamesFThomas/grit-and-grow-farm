import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./AboutSection.module.css";

export type AboutSectionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focus?: "high" | "low";
};

type AboutSectionProps = {
  image: AboutSectionImage;
  children: ReactNode;
  heading?: string;
  flip?: boolean;
  poster?: boolean;
};

const focusClasses = {
  high: styles.focusHigh,
  low: styles.focusLow,
};

export const AboutSection = ({
  image,
  children,
  heading,
  flip = false,
  poster = false,
}: AboutSectionProps) => (
  <section className={`${styles.section} ${flip ? styles.flip : ""}`}>
    <div className={styles.copy}>
      {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
      {children}
    </div>

    <div className={`${styles.frame} ${poster ? styles.posterFrame : ""}`}>
      <Image
        className={[
          styles.image,
          poster ? styles.poster : "",
          image.focus ? focusClasses[image.focus] : "",
        ].join(" ")}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 60em) 50vw, 100vw"
      />
    </div>
  </section>
);

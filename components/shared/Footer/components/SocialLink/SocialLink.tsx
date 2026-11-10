import Image from "next/image";
import styles from "./SocialLink.module.css";

export type SocialLinkProps = {
  name: string;
  href: string;
  lightSrc: string;
  darkSrc: string;
  width: number;
  height: number;
};

export const SocialLink = ({
  name,
  href,
  lightSrc,
  darkSrc,
  width,
  height,
}: SocialLinkProps) => (
  <a
    className={styles.link}
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={name}
  >
    <Image
      className={styles.light}
      src={lightSrc}
      alt=""
      width={width}
      height={height}
    />
    <Image
      className={styles.dark}
      src={darkSrc}
      alt=""
      width={width}
      height={height}
    />
  </a>
);

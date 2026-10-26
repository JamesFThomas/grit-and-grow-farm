"use client";

import Image from "next/image";
import styles from "./Footer.module.css";
import { SubscriptionForm } from "../SubscriptionForm/SubscriptionForm";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/logo/gg-monogram.svg"
            alt="Grit and Grow Farm"
            width={48}
            height={48}
          />
          <p className={styles.name}>Grit and Grow Farm</p>
          <p className={styles.tagline}>grow it · cook it · share it</p>
        </div>

        <section className={styles.newsletter} aria-labelledby="newsletter-heading">
          <h2 id="newsletter-heading" className={styles.heading}>
            Newsletter
          </h2>
          <p className={styles.note}>
            Hear what is in the ground and when the shop opens.
          </p>
          <SubscriptionForm />
        </section>

        <section className={styles.social} aria-labelledby="social-heading">
          <h2 id="social-heading" className={styles.heading}>
            Follow
          </h2>
          <ul className={styles.socialList}>
            <li>
              <a
                className={styles.socialLink}
                href="https://www.instagram.com/gritandgrowfarm/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            {/* TODO: add the YouTube channel link once the channel is live. */}
          </ul>
        </section>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} Grit and Grow Farm
      </p>
    </footer>
  );
};

"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import styles from "./Footer.module.css";

// TODO: replace with the shared SubscriptionForm once it is ported from
// slimkat-media so signups reach the shared spreadsheet.
export const Footer = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

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
          {submitted ? (
            <p className={styles.note} role="status">
              Signups open soon. Follow along on Instagram in the meantime.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="newsletter-email">
                Email
              </label>
              <input
                className={styles.input}
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
              <button className={styles.button} type="submit">
                Sign up
              </button>
            </form>
          )}
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

"use client";

import Image from "next/image";
import styles from "./Footer.module.css";
import { SubscriptionForm } from "../SubscriptionForm/SubscriptionForm";
import { SocialLink } from "./components/SocialLink/SocialLink";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/logo/gg-monogram.svg"
            alt="Grit And Grow Farm"
            width={48}
            height={48}
          />
          <p className={styles.name}>Grit And Grow Farm</p>
          <p className={styles.tagline}>grow it · cook it · share it</p>
        </div>

        <section
          className={styles.newsletter}
          aria-labelledby="newsletter-heading"
        >
          <h2 id="newsletter-heading" className={styles.heading}>
            Newsletter
          </h2>
          <p className={styles.note}>
            What we’re growing, how we’re cooking it, and when y’all can
            get some.
          </p>
          <SubscriptionForm />
        </section>

        <section className={styles.social} aria-labelledby="social-heading">
          <h2 id="social-heading" className={styles.heading}>
            Follow
          </h2>
          <ul className={styles.socialList}>
            <li>
              <SocialLink
                name="Instagram"
                href="https://www.instagram.com/gritandgrowfarm/"
                lightSrc="/logo/instagram-glyph-black.svg"
                darkSrc="/logo/instagram-glyph-white.svg"
                width={1000}
                height={1000}
              />
            </li>
            <li>
              <SocialLink
                name="YouTube"
                href="https://www.youtube.com/@gritandgrowfarm"
                lightSrc="/logo/youtube-icon-almostblack.png"
                darkSrc="/logo/youtube-icon-white.png"
                width={827}
                height={579}
              />
            </li>
          </ul>
        </section>
      </div>

      <p className={styles.copyright}>
        © {new Date().getFullYear()} Grit And Grow Farm
      </p>
    </footer>
  );
};

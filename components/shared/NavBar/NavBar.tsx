"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { links, PageLinks } from "./components/PageLinks";
import styles from "./NavBar.module.css";

export const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary">
        <Link className={styles.brand} href="/">
          <Image
            className={styles.mark}
            src="/logo/gg-lockup-full-name-tight.png"
            alt="Grit And Grow Farm"
            width={640}
            height={390}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>

        <div
          id="primary-navigation"
          className={`${styles.links} ${open ? styles.open : ""}`}
        >
          <PageLinks
            links={links}
            pathname={pathname}
            onNavigate={() => setOpen(false)}
          />
        </div>
      </nav>
    </header>
  );
};

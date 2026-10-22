"use client";

import Link from "next/link";
import styles from "./PageLinks.module.css";

export type PageLink = {
  id: number;
  name: string;
  href: string;
};

export const links: PageLink[] = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "About", href: "/about" },
  { id: 3, name: "Growing", href: "/growing" },
  { id: 4, name: "Shop", href: "/shop" },
  { id: 5, name: "Contact", href: "/contact" },
];

type PageLinksProps = {
  links: PageLink[];
  pathname: string;
  onNavigate?: () => void;
};

export const PageLinks = ({ links, pathname, onNavigate }: PageLinksProps) => (
  <ul className={styles.list}>
    {links.map((link) => (
      <li key={link.id}>
        <Link
          className={styles.link}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          onClick={onNavigate}
        >
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
);

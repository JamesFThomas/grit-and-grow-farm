import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { YOUTUBE_URL } from "@/lib/links/externalLinks";
import styles from "./ShopPage.module.css";

export const ShopPage = () => (
  <main className={styles.main}>
    <PageHeader
      title="Shop"
      lede="The shop is not open yet. Big Pot Boxes are what will be in it."
    />

    <div className={styles.sections}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Big Pot Boxes</h2>
        <p>
          Our Big Pot Box will contain vegetables, spices, and other products
          from the farm with tasty recipes to cook them. What you bring home is
          a meal rather than a pile of ingredients. Our first box will focus on
          cabbage, with several recipes for different ways to prepare it.
        </p>
        <p>
          What goes in our boxes follows what is coming out of the field, so
          the lineup will change with the season.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Hear first when the boxes open</h2>
        <p>
          Nothing is for sale just yet. Our newsletter is where we write about
          the farm, and every post goes out to the people signed up for it, so
          the form at the bottom of this page is the best way to know when the
          first boxes are ready.
        </p>
        <p>
          To watch the first season come in before then, follow{" "}
          <a
            className={styles.link}
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
          >
            This Week on the Farm
          </a>{" "}
          on YouTube.
        </p>
      </section>
    </div>
  </main>
);

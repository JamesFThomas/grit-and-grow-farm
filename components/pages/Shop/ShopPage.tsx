import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import styles from "./ShopPage.module.css";

const YOUTUBE_URL = "https://www.youtube.com/@gritandgrowfarm";
// TODO: add the farm blog link here once the blog is live.

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
          Nothing is for sale just yet. You can sign up at the bottom of this
          page for our newsletter. It will be the best way to know when the
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
          on YouTube. The farm blog is on its way, and the link lands here once
          it is live.
        </p>
      </section>
    </div>
  </main>
);

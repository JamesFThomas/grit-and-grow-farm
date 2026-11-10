import { PageHeader } from "@/components/shared/PageHeader/PageHeader";
import { JADAM_URL, YOUTUBE_URL } from "@/lib/links/externalLinks";
import { FarmPlan } from "./components/FarmPlan/FarmPlan";
import styles from "./GrowingPage.module.css";

export const GrowingPage = () => (
  <main className={styles.main}>
    <PageHeader
      title="Growing"
      lede="More information on how I’m doing things now and the dreams I have for my farm’s future growth."
    />

    <div className={styles.plan}>
      <FarmPlan />
    </div>

    <div className={styles.sections}>
      <section className={styles.section}>
        <h2 className={styles.heading}>Farm breakdown</h2>
        <p>
          We currently have two field plots, W1 and W2, prepped at roughly 30
          by 115 feet each, giving me around 6,900 square feet of growing space
          for year one. During bed prep we ended up with 14 beds, each 30
          inches by 100 feet, separated by walkways of 18 to 21 inches. Nothing
          is perfect in farming, not even the rows. My garden plot is now 30 by
          50 feet with 19 raised and in ground growing sites of several sizes.
          I will keep growing my family’s food in the garden, while the field
          is where I grow for everyone else.
        </p>
        <p>
          My goal is to prep new plots each year until we have expanded our
          growing space to 18 plots, totaling roughly 62,000 square feet, close
          to 1.5 acres. As for the buildings, the greenhouse is underway for
          year one, while the field house is something I would like to have
          finished by year five. It is all a process, so slow and steady is how
          we are planning to move forward.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>How we grow</h2>
        <p>
          I am still learning and growing, and so are the methods I use on the
          farm, but I will never resort to synthetic fertilizers or pesticides
          to grow any of the food I eat or sell. I make the fertilizers that
          feed my crops following the JADAM method, and for pest control I make
          and use products derived from plants. By year 10 my goal is to make
          every fertilizer and pesticide the farm uses myself.
        </p>
        <p>
          JADAM (Jayeoneul Dalmeun Saramdeul, or “people who resemble nature”) is
          an
          ultra low cost, open source organic farming system developed in South
          Korea by Dr. Youngsang Cho. The open source principle lined up with
          my software background, and the focus on natural inputs was the piece
          I had found missing from the so called organic methods I had
          encountered before. More on the method at{" "}
          <a
            className={styles.link}
            href={JADAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            the JADAM Organic Farming Institute
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>What we are working toward</h2>
        <p>
          In year one we will offer our produce paired with recipes, in what we
          call Big Pot Boxes, to emphasize our focus on connecting with friends
          and family through cooking. By our third year we will expand to boxes
          built around seasons, holidays and occasions, along with small batch
          honey and dried spices. By year five the product list will include
          mushrooms.
        </p>
        <p>
          I want to share what I know, so we plan to run public courses. Until
          that in person teaching begins, you can follow the journey on{" "}
          <a
            className={styles.link}
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
          >
            This Week on the Farm
          </a>{" "}
          on YouTube. Everything I write about the farm goes out as our
          newsletter, so the sign up at the bottom of this page is how you read
          it.
        </p>
      </section>
    </div>
  </main>
);

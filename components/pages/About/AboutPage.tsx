import { AboutSection } from "./components/AboutSection/AboutSection";
import styles from "./AboutPage.module.css";

const nonNegotiables = [
  "No GMO seed and no synthetic chemical inputs. Our fertilizers and pest control are made from natural inputs.",
  "No gatekeeping. We will not hold back information that would let someone take control of their own life.",
  "No endorsing a product or a practice we do not use ourselves.",
];

export const AboutPage = () => (
  <main className={styles.main}>
    <header className={styles.intro}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.lede}>
        How I scaled my backyard garden into a small production farm with my
        wife in Byram, Mississippi.
      </p>
    </header>

    <AboutSection
      heading="Our story"
      image={{
        src: "/images/james-trellis.jpg",
        alt: "James standing under an arch of tomato plants in the garden.",
        width: 1050,
        height: 1400,
        focus: "low",
      }}
    >
      <p>
        Growing up I loved helping my grandfather garden. The family owned a
        home in the historically Black neighborhood of Scotlandville, near
        Southern University in Baton Rouge, where he grew vegetables in the
        backyard and in an open lot across the street. I was captivated by the
        look of the uniformity of well maintained garden rows. Seeing each
        plant growing within its own designated space was simply beautiful.
      </p>
      <p>
        The sights, smells, feelings and sounds stayed with me into adulthood.
        Beginning in undergraduate, and throughout years of apartment living, I
        grew whatever I could. I experimented with various houseplants, I
        attempted vermicomposting in a worm bin that did not survive the summer
        on a balcony, and finally got the chance to go big when my wife, Kayla
        and I moved to Mississippi.
      </p>
    </AboutSection>

    <AboutSection
      flip
      image={{
        src: "/images/kayla-collards.jpg",
        alt: "Kayla holding an armful of freshly cut collard greens.",
        width: 1050,
        height: 1400,
        focus: "high",
      }}
    >
      <p>
        In 2018 Kayla received a wonderful career opportunity so I closed my
        small fitness business in New Orleans to support a move to the Jackson
        area. We searched for a home under two conditions: no subdivision, and
        enough land to produce food. We found our home in Byram and I started
        my garden in 2019. Over time, and a few career changes later, I made my
        way to farming.
      </p>
      <p>
        I started my 30’x30’ garden to exert control over my life by learning
        to grow what we ate. While scaling up to that goal, I still had to mow
        the remaining grass on our three acres of land. The Mississippi heat,
        working on a documentary and a conversation with Kayla inspired me to
        scale my personal garden into a farm business that could help other
        people take control over what they ate.
      </p>
    </AboutSection>

    <AboutSection
      poster
      heading="Kayla and Farming Freedom"
      image={{
        src: "/images/farming-freedom-poster.jpg",
        alt: "Poster for Farming Freedom, a film by Kayla Turner Thomas about Black landownership in Mississippi.",
        width: 900,
        height: 1333,
      }}
    >
      <p>
        While helping my wife produce her documentary, Farming Freedom, I was
        confronted by the reality of living on land that was underutilized
        coupled with paying thousands each year in lawn maintenance. Farming
        Freedom is a triumphant story of a man who freed his family through
        land ownership. Owning land but not feeling free, I began to see
        farming as a missing piece.
      </p>
      <p>
        Inspired by the film and wholly supported by my wife, I am working
        towards making my land productive and building the life of my dreams.
        My goal is to grow nutritious food, cook tasty meals, and show others
        how to do the same. Farming is hard as hell, but it&apos;s the most
        rewarding thing in my life outside of being married.
      </p>
    </AboutSection>

    <AboutSection
      flip
      heading="What we will not do"
      image={{
        src: "/images/planting-by-hand.jpg",
        alt: "Planting by hand in the garden rows, with the first beds grown in.",
        width: 1400,
        height: 1050,
      }}
    >
      <p>
        We grow food from seed to harvest and cook it together, bringing
        families and community back to the table, because control over your
        food is control over your life. Three things we will not do:
      </p>
      <ul className={styles.list}>
        {nonNegotiables.map((rule) => (
          <li key={rule} className={styles.item}>
            {rule}
          </li>
        ))}
      </ul>
    </AboutSection>
  </main>
);

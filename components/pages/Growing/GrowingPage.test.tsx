import { render, screen } from "@testing-library/react";
import { GrowingPage } from "./GrowingPage";

/*
 * Given a visitor who wants to know how the farm grows and where it is headed
 * When the Growing page renders
 * Then the layout plan leads the page, the three sections follow it, the
 *      outside links point at JADAM and the YouTube series, and the writing
 *      is named as the newsletter rather than a separate blog
 */
describe("GrowingPage", () => {
  it("titles the page", () => {
    render(<GrowingPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Growing",
    );
  });

  it("leads with the farm layout plan", () => {
    render(<GrowingPage />);

    expect(
      screen.getByRole("img", { name: /farm layout, years 1 to 10/i }),
    ).toBeInTheDocument();
  });

  it("covers the three sections", () => {
    render(<GrowingPage />);

    ["Farm breakdown", "How we grow", "What we are working toward"].forEach(
      (heading) => {
        expect(
          screen.getByRole("heading", { level: 2, name: heading }),
        ).toBeInTheDocument();
      },
    );
  });

  it("links out to JADAM", () => {
    render(<GrowingPage />);

    expect(
      screen.getByRole("link", { name: /jadam organic farming institute/i }),
    ).toHaveAttribute("href", "https://en.jadam.kr/");
  });

  it("links out to the YouTube series", () => {
    render(<GrowingPage />);

    expect(
      screen.getByRole("link", { name: /this week on the farm/i }),
    ).toHaveAttribute("href", "https://www.youtube.com/@gritandgrowfarm");
  });

  it("names the newsletter as where the farm writing goes", () => {
    render(<GrowingPage />);

    expect(screen.getByText(/goes out as our newsletter/i)).toBeInTheDocument();
  });

  it.todo("links out to the newsletter archive once the publication is live");
});

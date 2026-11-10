import { render, screen } from "@testing-library/react";
import { AboutSection } from "./AboutSection";

const image = {
  src: "/images/example.jpg",
  alt: "An example photograph",
  width: 1400,
  height: 1050,
};

/*
 * Given a section of the About page pairing copy with one photograph
 * When the section renders
 * Then the copy, its optional heading, and the image all appear, and a
 *      continuation row renders without introducing a second heading
 */
describe("AboutSection", () => {
  it("shows the heading when one is given", () => {
    render(
      <AboutSection heading="Our story" image={image}>
        <p>Some copy</p>
      </AboutSection>
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Our story" })
    ).toBeInTheDocument();
  });

  it("renders no heading on a continuation row", () => {
    render(
      <AboutSection image={image}>
        <p>Some copy</p>
      </AboutSection>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders the copy it is given", () => {
    render(
      <AboutSection image={image}>
        <p>Some copy</p>
      </AboutSection>
    );

    expect(screen.getByText("Some copy")).toBeInTheDocument();
  });

  it("shows the photograph", () => {
    render(
      <AboutSection image={image}>
        <p>Some copy</p>
      </AboutSection>
    );

    expect(screen.getByAltText("An example photograph")).toBeInTheDocument();
  });
});

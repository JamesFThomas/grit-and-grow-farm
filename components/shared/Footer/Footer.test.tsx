import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

/*
 * Given a visitor who has scrolled to the bottom of any page
 * When the footer renders
 * Then they see the farm mark, a newsletter signup that says what the
 *      newsletter carries, and where to follow us
 */
describe("Footer", () => {
  it("shows the farm logo", () => {
    render(<Footer />);

    expect(screen.getByAltText("Grit And Grow Farm")).toBeInTheDocument();
  });

  it("offers a newsletter signup", () => {
    render(<Footer />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subscribe" }),
    ).toBeInTheDocument();
  });

  it("says what the newsletter carries", () => {
    render(<Footer />);

    expect(
      screen.getByText(/what we.re growing, how we.re cooking it/i),
    ).toBeInTheDocument();
  });

  it("links to Instagram", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/gritandgrowfarm/",
    );
  });

  it("links to YouTube", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "YouTube" })).toHaveAttribute(
      "href",
      "https://www.youtube.com/@gritandgrowfarm",
    );
  });
});

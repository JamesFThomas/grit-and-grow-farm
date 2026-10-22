import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Footer } from "./Footer";

/*
 * Given a visitor who has scrolled to the bottom of any page
 * When the footer renders
 * Then they see the farm mark, a newsletter signup, and where to follow us
 */
describe("Footer", () => {
  it("shows the farm logo", () => {
    render(<Footer />);

    expect(screen.getByAltText("Grit and Grow Farm")).toBeInTheDocument();
  });

  it("offers a newsletter signup", () => {
    render(<Footer />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();
  });

  it("acknowledges a signup without losing the page", async () => {
    render(<Footer />);

    await userEvent.type(screen.getByLabelText("Email"), "james@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("links to Instagram", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/gritandgrowfarm/"
    );
  });

  it.todo("links to YouTube once the channel is live");
});

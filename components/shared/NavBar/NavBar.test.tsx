import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavBar } from "./NavBar";

jest.mock("next/navigation", () => ({
  usePathname: () => "/growing",
}));

/*
 * Given a visitor on any page of the site
 * When the navigation bar renders
 * Then they can reach every base page, and on a small screen they can
 *      open and close the menu with the hamburger toggle
 */
describe("NavBar", () => {
  it("links to every base page", () => {
    render(<NavBar />);

    ["Home", "About", "Growing", "Shop", "Contact"].forEach((name) => {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    });
  });

  it("marks the current page", () => {
    render(<NavBar />);

    expect(screen.getByRole("link", { name: "Growing" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("starts with the menu collapsed", () => {
    render(<NavBar />);

    expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("opens the menu when the toggle is clicked", async () => {
    render(<NavBar />);
    const toggle = screen.getByRole("button", { name: "Menu" });

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the menu after a link is followed", async () => {
    render(<NavBar />);
    const toggle = screen.getByRole("button", { name: "Menu" });

    await userEvent.click(toggle);

    // jsdom has no navigation, so following the href logs an unimplemented
    // error. Routing is Next's concern; this scenario only cares that the
    // menu collapses, so the default is prevented and the React onClick
    // still fires.
    const aboutLink = screen.getByRole("link", { name: "About" });
    aboutLink.addEventListener("click", (event) => event.preventDefault());

    await userEvent.click(aboutLink);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});

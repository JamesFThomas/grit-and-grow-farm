import { render, screen } from "@testing-library/react";
import { links, PageLinks } from "./PageLinks";

/*
 * Given the list of base pages
 * When the links render
 * Then each page is listed once, pointing at its own route
 */
describe("PageLinks", () => {
  it("renders one link per page", () => {
    render(<PageLinks links={links} pathname="/" />);

    expect(screen.getAllByRole("link")).toHaveLength(links.length);
  });

  it("points each link at its route", () => {
    render(<PageLinks links={links} pathname="/" />);

    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "href",
      "/shop"
    );
  });

  it("marks only the current page", () => {
    render(<PageLinks links={links} pathname="/shop" />);

    expect(screen.getByRole("link", { name: "Shop" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
      "aria-current"
    );
  });
});

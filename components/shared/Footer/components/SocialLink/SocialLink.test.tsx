import { render, screen } from "@testing-library/react";
import { SocialLink } from "./SocialLink";

const props = {
  name: "Instagram",
  href: "https://www.instagram.com/gritandgrowfarm/",
  lightSrc: "/logo/instagram-glyph-black.svg",
  darkSrc: "/logo/instagram-glyph-white.svg",
  width: 1000,
  height: 1000,
};

/*
 * Given a social account shown in the footer as an emblem rather than text
 * When the link renders
 * Then it still announces the platform by name, opens in a new tab, and
 *      carries a mark for both the light and the dark theme
 */
describe("SocialLink", () => {
  it("announces the platform by name", () => {
    render(<SocialLink {...props} />);

    expect(screen.getByRole("link", { name: "Instagram" })).toBeInTheDocument();
  });

  it("points at the account", () => {
    render(<SocialLink {...props} />);

    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      props.href,
    );
  });

  it("opens in a new tab without leaking the referrer", () => {
    render(<SocialLink {...props} />);
    const link = screen.getByRole("link", { name: "Instagram" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("carries a mark for each theme", () => {
    const { container } = render(<SocialLink {...props} />);

    expect(container.querySelectorAll("img")).toHaveLength(2);
  });

  it("leaves the marks out of the accessibility tree", () => {
    render(<SocialLink {...props} />);

    expect(screen.queryAllByRole("img")).toHaveLength(0);
  });
});

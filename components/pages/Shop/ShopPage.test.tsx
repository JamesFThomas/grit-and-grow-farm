import { render, screen } from "@testing-library/react";
import { ShopPage } from "./ShopPage";

/*
 * Given a visitor looking for something to buy before the farm has produce
 * When the Shop page renders
 * Then it says plainly that the shop is closed, explains what a Big Pot Box
 *      is, and points at the ways to hear when the boxes open
 */
describe("ShopPage", () => {
  it("titles the page", () => {
    render(<ShopPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Shop");
  });

  it("says the shop is not open yet", () => {
    render(<ShopPage />);

    expect(screen.getByText(/the shop is not open yet/i)).toBeInTheDocument();
  });

  it("explains what a Big Pot Box is", () => {
    render(<ShopPage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Big Pot Boxes" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/focus on cabbage/i)).toBeInTheDocument();
  });

  it("points at the newsletter and the YouTube series", () => {
    render(<ShopPage />);

    expect(screen.getByText(/our newsletter/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /this week on the farm/i }),
    ).toHaveAttribute("href", "https://www.youtube.com/@gritandgrowfarm");
  });

  it.todo("links out to the farm blog once it is live");
});

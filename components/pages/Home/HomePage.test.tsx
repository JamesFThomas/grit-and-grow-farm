import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";

/*
 * Given a visitor landing on the farm's home page
 * When the page renders
 * Then the tagline leads, the three line description sits under it, and a
 *      photograph of the field runs alongside
 */
describe("HomePage", () => {
  it("leads with the tagline as the page heading", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "grow it cook it share it"
    );
  });

  it("describes the farm in three lines", () => {
    render(<HomePage />);

    [
      "A small family farm in Byram, Mississippi.",
      "Vegetables, herbs, mushrooms, and raw honey.",
      "Grown with natural inputs only.",
    ].forEach((line) => {
      expect(screen.getByText(line)).toBeInTheDocument();
    });
  });

  it("shows the field photograph", () => {
    render(<HomePage />);

    expect(screen.getByAltText(/first plot tilled/i)).toBeInTheDocument();
  });
});

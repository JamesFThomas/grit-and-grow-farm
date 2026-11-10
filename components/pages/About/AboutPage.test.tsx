import { render, screen } from "@testing-library/react";
import { AboutPage } from "./AboutPage";

/*
 * Given a visitor who wants to know who runs the farm
 * When the About page renders
 * Then they get the farm's story, the documentary behind it, the three
 *      things the farm will not do, and a photograph with each section
 */
describe("AboutPage", () => {
  it("titles the page", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "About"
    );
  });

  it("covers the three sections", () => {
    render(<AboutPage />);

    ["Our story", "Kayla and Farming Freedom", "What we will not do"].forEach(
      (heading) => {
        expect(
          screen.getByRole("heading", { level: 2, name: heading })
        ).toBeInTheDocument();
      }
    );
  });

  it("lists the three non negotiables", () => {
    render(<AboutPage />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("shows a photograph with every section", () => {
    render(<AboutPage />);

    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  it("shows the Farming Freedom poster", () => {
    render(<AboutPage />);

    expect(screen.getByAltText(/Farming Freedom/i)).toBeInTheDocument();
  });
});

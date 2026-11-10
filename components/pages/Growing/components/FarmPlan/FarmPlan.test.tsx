import { render, screen } from "@testing-library/react";
import { FarmPlan } from "./FarmPlan";

/*
 * Given a visitor looking at where the farm is headed
 * When the layout plan renders
 * Then it is announced as an image, every plot in the full build is labelled,
 *      and the fixed structures are named
 */
describe("FarmPlan", () => {
  it("announces itself as an image", () => {
    render(<FarmPlan />);

    expect(
      screen.getByRole("img", { name: /farm layout, years 1 to 10/i }),
    ).toBeInTheDocument();
  });

  it("labels all eighteen plots", () => {
    render(<FarmPlan />);

    [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
      expect(screen.getByText(`W${number}`)).toBeInTheDocument();
      expect(screen.getByText(`E${number}`)).toBeInTheDocument();
    });
  });

  it("names the structures on the site", () => {
    render(<FarmPlan />);

    ["garden", "greenhouse", "field house", "hives", "outer road"].forEach(
      (name) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      },
    );
  });

  it("carries a legend for what is in the ground and what is planned", () => {
    render(<FarmPlan />);

    expect(screen.getByText("in the ground")).toBeInTheDocument();
    expect(screen.getByText("planned")).toBeInTheDocument();
  });
});

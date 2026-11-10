import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

/*
 * Given any page below the home page
 * When its header renders
 * Then the page title leads as the first heading with its lede beneath
 */
describe("PageHeader", () => {
  it("shows the title as the page heading", () => {
    render(<PageHeader title="Growing" lede="Where the farm stands today." />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Growing" }),
    ).toBeInTheDocument();
  });

  it("shows the lede", () => {
    render(<PageHeader title="Growing" lede="Where the farm stands today." />);

    expect(
      screen.getByText("Where the farm stands today."),
    ).toBeInTheDocument();
  });
});

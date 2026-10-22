import { render, screen } from "@testing-library/react";
import { PagePlaceholder } from "./PagePlaceholder";

/*
 * Given a base page that has no content written yet
 * When the placeholder renders
 * Then the visitor sees the page title and what is planned for it
 */
describe("PagePlaceholder", () => {
  const props = {
    title: "Growing",
    intro: "What we grow and how.",
    sections: ["This season's crops", "How we grow"],
  };

  it("shows the page title as the heading", () => {
    render(<PagePlaceholder {...props} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Growing" })
    ).toBeInTheDocument();
  });

  it("shows the intro", () => {
    render(<PagePlaceholder {...props} />);

    expect(screen.getByText("What we grow and how.")).toBeInTheDocument();
  });

  it("lists every planned section", () => {
    render(<PagePlaceholder {...props} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(props.sections.length);
  });
});

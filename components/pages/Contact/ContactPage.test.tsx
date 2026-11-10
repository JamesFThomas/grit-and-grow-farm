import { render, screen } from "@testing-library/react";
import { ContactPage } from "./ContactPage";

/*
 * Given a visitor who wants to reach the farm
 * When the Contact page renders
 * Then the page is titled and the form is the only thing on it
 */
describe("ContactPage", () => {
  it("titles the page", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Contact",
    );
  });

  it("renders the contact form", () => {
    render(<ContactPage />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send message" }),
    ).toBeInTheDocument();
  });
});

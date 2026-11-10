import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

/*
 * Given a visitor who wants to reach the farm
 * When the contact form renders
 * Then every field is labelled, the required ones are validated before
 *      anything is sent, and a successful submission is confirmed on screen
 */
describe("ContactForm", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("labels every field", () => {
    render(<ContactForm />);

    ["First name", "Last name", "Email", "Message"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what is this about/i)).toBeInTheDocument();
  });

  it("offers every inquiry type", () => {
    render(<ContactForm />);

    [
      "General question",
      "Delivery",
      "Wholesale",
      "Classes and events",
    ].forEach((option) => {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    });
  });

  it("refuses an empty submission and says what is missing", async () => {
    (global as unknown as { fetch: unknown }).fetch = jest.fn();
    render(<ContactForm />);

    await userEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects a phone number that is not a US number", async () => {
    render(<ContactForm />);
    const phone = screen.getByLabelText(/phone/i);

    await userEvent.type(phone, "123");
    await userEvent.tab();

    expect(
      screen.getByText("A US phone number is required"),
    ).toBeInTheDocument();
  });

  it("confirms a successful submission", async () => {
    (global as unknown as { fetch: unknown }).fetch = jest.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => ({ status: "success" }),
    });

    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText("First name"), "Ada");
    await userEvent.type(screen.getByLabelText("Last name"), "Lovelace");
    await userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
    await userEvent.selectOptions(
      screen.getByLabelText(/what is this about/i),
      "general",
    );
    await userEvent.type(screen.getByLabelText("Message"), "Hello there.");
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText(/thanks for reaching out/i),
    ).toBeInTheDocument();
  });

  it("tells the visitor when they have been rate limited", async () => {
    (global as unknown as { fetch: unknown }).fetch = jest.fn().mockResolvedValue({
      status: 429,
      ok: false,
      json: async () => ({ status: "error" }),
    });

    render(<ContactForm />);

    await userEvent.type(screen.getByLabelText("First name"), "Ada");
    await userEvent.type(screen.getByLabelText("Last name"), "Lovelace");
    await userEvent.type(screen.getByLabelText("Email"), "ada@example.com");
    await userEvent.selectOptions(
      screen.getByLabelText(/what is this about/i),
      "general",
    );
    await userEvent.type(screen.getByLabelText("Message"), "Hello there.");
    await userEvent.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText(/too many attempts/i)).toBeInTheDocument();
  });
});

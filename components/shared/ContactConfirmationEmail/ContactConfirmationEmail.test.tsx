import { ContactConfirmationEmail } from "./ContactConfirmationEmail";

/*
 * Given someone who has just sent a message through the contact form
 * When their confirmation email is built
 * Then it greets them by name, carries the farm lockup by content id, and
 *      signs off in the farm's voice
 */
describe("ContactConfirmationEmail", () => {
  it("greets the sender by first name", () => {
    const html = ContactConfirmationEmail("gg_lockup", "Ada");

    expect(html).toContain("Hi Ada,");
  });

  it("references the lockup by content id rather than a url", () => {
    const html = ContactConfirmationEmail("gg_lockup", "Ada");

    expect(html).toContain('src="cid:gg_lockup"');
    expect(html).toContain('alt="Grit And Grow Farm"');
  });

  it("signs off with the tagline", () => {
    const html = ContactConfirmationEmail("gg_lockup", "Ada");

    expect(html).toContain("Grow it. Cook it. Share it.");
  });
});

import { SubscriptionConfirmationEmail } from "./SubscriptionConfirmationEmail";

/*
 * Story: A new subscriber receives a confirmation email
 * In order to know their signup worked and what the newsletter will bring,
 * a visitor who subscribes wants a branded confirmation email in their inbox.
 *
 * Scenario: The lockup is embedded by content id
 *   Given a logo content id
 *   When the template is rendered
 *   Then the image should reference that content id and be labelled with the farm name
 *
 * Scenario: The lockup carries explicit dimensions
 *   Given Outlook on Windows renders through Word and handles height:auto poorly
 *   When the template is rendered
 *   Then the image should declare its width and height rather than leaving either to the client
 *
 * Scenario: The newsletter expectation is set
 *   Given the template is rendered
 *   When the body is read
 *   Then it should say the letter comes monthly and describe what it carries
 *
 * Scenario: The farm is placed and the tagline carried
 *   Given the template is rendered
 *   When the body is read
 *   Then it should name Byram, Mississippi and end on the tagline and sign off
 */
describe("SubscriptionConfirmationEmail", () => {
  const logoContentId = "gg_lockup";

  it("embeds the lockup by content id", () => {
    const html = SubscriptionConfirmationEmail(logoContentId);

    expect(html).toContain(`src="cid:${logoContentId}"`);
    expect(html).toContain('alt="Grit and Grow Farm"');
  });

  it("declares explicit dimensions on the lockup", () => {
    const html = SubscriptionConfirmationEmail(logoContentId);

    expect(html).toContain('width="200"');
    expect(html).toContain('height="122"');
    expect(html).not.toContain("height:auto");
  });

  it("sets the expectation of a monthly letter from the farm", () => {
    const html = SubscriptionConfirmationEmail(logoContentId);

    expect(html).toContain("Once a month");
    expect(html).toContain("what is in the ground");
  });

  it("places the farm and closes on the tagline and sign off", () => {
    const html = SubscriptionConfirmationEmail(logoContentId);

    expect(html).toContain("Byram, Mississippi");
    expect(html).toContain("Grow it. Cook it. Share it.");
    expect(html).toContain("See you at the table,");
    expect(html).toContain("James and Kayla Thomas");
  });
});

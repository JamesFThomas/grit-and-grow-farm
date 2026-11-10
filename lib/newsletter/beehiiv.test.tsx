import { addSubscriberToBeehiiv } from "./beehiiv";

/*
 * Given a subscriber who has cleared every guard on the subscribe route
 * When the address is pushed to the beehiiv publication
 * Then beehiiv is called with the publication's own endpoint and token, is
 *      told not to send a welcome email of its own, and every failure is
 *      swallowed so the signup still succeeds
 */
describe("addSubscriberToBeehiiv", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      BEEHIIV_API_KEY: "test-key",
      BEEHIIV_PUBLICATION_ID: "pub_test",
    };

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  const mockFetch = (response: Partial<Response>) => {
    const fetchMock = jest.fn().mockResolvedValue(response);
    global.fetch = fetchMock as unknown as typeof fetch;

    return fetchMock;
  };

  it("posts the address to the publication's subscriptions endpoint", async () => {
    const fetchMock = mockFetch({ ok: true });

    await addSubscriberToBeehiiv("grower@example.com");

    const [url, options] = fetchMock.mock.calls[0];

    expect(url).toBe(
      "https://api.beehiiv.com/v2/publications/pub_test/subscriptions",
    );
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body).email).toBe("grower@example.com");
  });

  it("authenticates with the api key as a bearer token", async () => {
    const fetchMock = mockFetch({ ok: true });

    await addSubscriberToBeehiiv("grower@example.com");

    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe(
      "Bearer test-key",
    );
  });

  it("tells beehiiv not to send a welcome email", async () => {
    const fetchMock = mockFetch({ ok: true });

    await addSubscriberToBeehiiv("grower@example.com");

    expect(JSON.parse(fetchMock.mock.calls[0][1].body).send_welcome_email).toBe(
      false,
    );
  });

  it("reports success when beehiiv accepts the address", async () => {
    mockFetch({ ok: true });

    await expect(addSubscriberToBeehiiv("grower@example.com")).resolves.toBe(
      true,
    );
  });

  it("reports failure when beehiiv rejects the request", async () => {
    mockFetch({
      ok: false,
      status: 422,
      text: jest.fn().mockResolvedValue("invalid email"),
    });

    await expect(addSubscriberToBeehiiv("grower@example.com")).resolves.toBe(
      false,
    );
  });

  it("reports failure rather than throwing when the request itself fails", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error("network down")) as unknown as typeof fetch;

    await expect(addSubscriberToBeehiiv("grower@example.com")).resolves.toBe(
      false,
    );
  });

  it("makes no request at all when beehiiv is not configured", async () => {
    delete process.env.BEEHIIV_API_KEY;
    const fetchMock = mockFetch({ ok: true });

    await expect(addSubscriberToBeehiiv("grower@example.com")).resolves.toBe(
      false,
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

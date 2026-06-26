import { test, expect } from "@playwright/test";

test.describe("Playwright.dev API & Endpoint Verification", () => {
  test("ai-1. Verify site metadata and main documentation bundle accessibility", async ({
    request,
  }) => {
    // Verify the core static documentation JSON/JS layout registry is active and returning a 200 OK
    const response = await request.get(
      "https://playwright.dev/assets/js/main.8b9f84e8.js",
    );

    // Assert status code
    expect(response.status()).toBe(200);

    // Verify headers contain correct cache controls and content-types
    const headers = response.headers();
    expect(headers["content-type"]).toContain("application/javascript");
  });

  test.fixme("ai-2. Validate Algolia Search API query returns proper structure", async ({
    request,
  }) => {
    // Playwright uses Algolia DocSearch. We simulate a client query search directly to their API app backend
    const algoliaUrl = "https://DSN792M11M.algolia.net/1/indexes/*/queries";

    const queryData = {
      requests: [
        {
          indexName: "playwright",
          query: "Trace Viewer",
          params: "hitsPerPage=3",
        },
      ],
    };

    const response = await request.post(algoliaUrl, {
      data: queryData,
      // Algolia requires application-specific public credentials sent via headers or query parameters
      headers: {
        "X-Algolia-API-Key": "259d456d2d194fc94da23ab1321feab3",
        "X-Algolia-Application-Id": "DSN792M11M",
      },
    });

    // Check successful query execution
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    // Validate schema definitions and structured response guarantees
    expect(responseBody.results[0]).toHaveProperty("hits");
    expect(responseBody.results[0].hits.length).toBeGreaterThan(0);

    // Verify the top hit is relevant to our search query
    expect(responseBody.results[0].hits[0].hierarchy.lvl0).toContain(
      "Playwright",
    );
  });

  test("ai-3. Verify sitemap.xml exists and contains valid structural paths", async ({
    request,
  }) => {
    // Sitemaps are critical data endpoints for search engines and scrapers
    const response = await request.get("https://playwright.dev/sitemap.xml");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/xml");

    const bodyText = await response.text();

    // Assert the XML structure contains root index tags and points to internal valid endpoints
    expect(bodyText).toContain("<urlset");
    expect(bodyText).toContain("https://playwright.dev/docs/intro");
  });
});

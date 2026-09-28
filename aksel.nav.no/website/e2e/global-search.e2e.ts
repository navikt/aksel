import AxeBuilder from "@axe-core/playwright";
import { type Page, expect, test } from "@playwright/test";
import type { GlobalSearchResultT } from "../app/_ui/global-search/server/GlobalSearch.config";

const PAGE_URL = "/designsystemet";

/* Fail fast instead of waiting for the (long) local test timeout. */
test.use({ actionTimeout: 10_000 });

function getSearch(page: Page) {
  const dialog = page.getByRole("dialog", { name: "Søk" });

  return {
    trigger: page.getByRole("button", { name: "Åpne søk" }),
    dialog,
    input: dialog.getByRole("searchbox", { name: "Globalt søk" }),
    closeButton: dialog.getByRole("button", { name: "Lukk" }),
    results: dialog.getByRole("region", { name: "Søkeresultater" }),
  };
}

/* Retries until hydrated, since clicks before hydration are no-ops. */
async function openSearch(page: Page) {
  const { trigger, dialog, input } = getSearch(page);

  await expect(async () => {
    if (!(await dialog.isVisible())) {
      await trigger.click({ timeout: 2000 });
    }
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 15_000 });
  await expect(input).toBeFocused();
}

async function openWithShortcut(page: Page, shortcut: string) {
  const { dialog } = getSearch(page);

  await expect(async () => {
    if (!(await dialog.isVisible())) {
      await page.keyboard.press(shortcut);
    }
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 15_000 });
}

type MockResponse = { status?: number; body?: unknown; delay?: number };

/* Replaces `/api/search` so UI states can be tested without depending on CMS content. */
async function mockSearchApi(
  page: Page,
  respond: (query: string) => MockResponse,
) {
  await page.route(
    (url) => url.pathname === "/api/search",
    async (route) => {
      const query = new URL(route.request().url()).searchParams.get("q") ?? "";
      const { status = 200, body = null, delay = 0 } = respond(query);

      if (delay) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      /* The page may abort superseded requests while we wait. */
      await route.fulfill({ status, json: body }).catch(() => undefined);
    },
  );
}

function searchResult(query: string): GlobalSearchResultT {
  return {
    query,
    result: {
      totalHits: 3,
      topResults: [],
      groupedHits: [
        {
          type: "komponent_artikkel",
          total: 12,
          hits: [
            {
              heading: "Button",
              slug: "komponenter/core/button",
              type: "komponent_artikkel",
              description: "Button lar brukeren utføre handlinger.",
            },
            {
              heading: "TextField",
              slug: "komponenter/core/textfield",
              type: "komponent_artikkel",
              description: "TextField lar brukeren skrive inn tekst.",
              anchor: "fixture-anchor",
              sectionHeading: "Bredde",
              statusTag: "beta",
            },
          ],
        },
        {
          type: "aksel_artikkel",
          total: 1,
          hits: [
            {
              heading: "Knapper i skjema",
              slug: "god-praksis/artikler/knapper-i-skjema",
              type: "aksel_artikkel",
              description: "Hvordan bruke knapper i skjema.",
            },
          ],
        },
      ],
    },
  };
}

function emptyResult(query: string): GlobalSearchResultT {
  return { query, result: { totalHits: 0, topResults: [], groupedHits: [] } };
}

test.beforeEach(async ({ page }) => {
  await page.goto(PAGE_URL);
});

test.describe("Global search: open and close", () => {
  test("opens from the search button with focus in the input", async ({
    page,
  }) => {
    const { dialog, input, results } = getSearch(page);

    await openSearch(page);

    await expect(dialog).toBeVisible();
    await expect(input).toBeFocused();
    await expect(input).toHaveValue("");
    await expect(results).toHaveCount(0);
  });

  test("closes from the close button and returns focus to the trigger", async ({
    page,
  }) => {
    const { trigger, dialog, closeButton } = getSearch(page);

    await openSearch(page);
    await closeButton.click();

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("closes on Escape when the input is empty", async ({ page }) => {
    const { trigger, dialog } = getSearch(page);

    await openSearch(page);
    await page.keyboard.press("Escape");

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("first Escape clears the input, second Escape closes", async ({
    page,
  }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input, results } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await expect(results).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeVisible();
    await expect(input).toHaveValue("");
    await expect(results).toBeHidden();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("closes when clicking the backdrop", async ({ page, isMobile }) => {
    test.skip(isMobile, "Dialog covers most of the viewport on mobile");
    const { dialog } = getSearch(page);

    await openSearch(page);
    await page.mouse.click(5, 5);

    await expect(dialog).toBeHidden();
  });

  test("resets query and results when reopened", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input, results, closeButton } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await expect(results).toBeVisible();
    await closeButton.click();
    await expect(dialog).toBeHidden();

    await openSearch(page);
    await expect(input).toHaveValue("");
    await expect(results).toHaveCount(0);
  });
});

test.describe("Global search: keyboard shortcuts", () => {
  test.skip(({ isMobile }) => isMobile, "No hardware keyboard on mobile");

  for (const key of ["k", "b"]) {
    test(`Cmd/Ctrl+${key.toUpperCase()} opens search`, async ({ page }) => {
      const { input } = getSearch(page);

      await openWithShortcut(page, `ControlOrMeta+${key}`);
      await expect(input).toBeFocused();
    });
  }

  test("Cmd/Ctrl+K while open selects the current query", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input } = getSearch(page);

    await openWithShortcut(page, "ControlOrMeta+k");
    await input.fill("button");
    await input.press("End");
    await page.keyboard.press("ControlOrMeta+k");

    await expect(dialog).toBeVisible();
    const selection = await input.evaluate((el: HTMLInputElement) => [
      el.selectionStart,
      el.selectionEnd,
    ]);
    expect(selection).toEqual([0, "button".length]);
  });
});

test.describe("Global search: searching", () => {
  test("debounces typing into a single request", async ({ page }) => {
    const queries: string[] = [];
    await mockSearchApi(page, (q) => {
      queries.push(q);
      return { body: searchResult(q) };
    });
    const { input, results } = getSearch(page);

    await openSearch(page);
    await input.pressSequentially("button", { delay: 20 });

    await expect(results).toBeVisible();
    expect(queries).toEqual(["button"]);
  });

  test("does not render results for queries shorter than 2 characters", async ({
    page,
  }) => {
    await mockSearchApi(page, (q) => ({
      body: q.length < 2 ? null : searchResult(q),
    }));
    const { dialog, input, results } = getSearch(page);

    await openSearch(page);
    await input.fill("b");
    await page.waitForTimeout(500);

    await expect(results).toHaveCount(0);
    await expect(dialog.getByText("Ingen resultater")).toBeHidden();
  });

  test("shows empty state when nothing matches", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: emptyResult(q) }));
    const { dialog, input, results } = getSearch(page);

    await openSearch(page);
    await input.fill("finnesikke");

    await expect(dialog.getByText("Ingen resultater")).toBeVisible();
    await expect(results).toHaveCount(0);
  });

  test("clearing the input removes results", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { input, results } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await expect(results).toBeVisible();

    await input.fill("");
    await expect(results).toBeHidden();
  });

  test("aborts a superseded request and shows the latest results", async ({
    page,
  }) => {
    await mockSearchApi(page, (q) =>
      q === "slow"
        ? { body: searchResult(q), delay: 5000 }
        : { body: searchResult(q) },
    );
    const { dialog, input } = getSearch(page);

    await openSearch(page);

    const slowRequest = page.waitForRequest((r) => r.url().includes("q=slow"));
    await input.fill("slow");
    await slowRequest;

    const aborted = page.waitForEvent("requestfailed", (r) =>
      r.url().includes("q=slow"),
    );
    await input.fill("fast");
    await aborted;

    await expect(dialog.getByText('3 treff på "fast"')).toBeAttached();
    await expect(dialog.getByText('3 treff på "slow"')).toHaveCount(0);
  });

  test("keeps previous results when a request fails", async ({ page }) => {
    await mockSearchApi(page, (q) =>
      q === "boom"
        ? { status: 500, body: { error: "fail" } }
        : { body: searchResult(q) },
    );
    const { dialog, input, results } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await expect(results).toBeVisible();

    const failed = page.waitForResponse((r) => r.url().includes("q=boom"));
    await input.fill("boom");
    expect((await failed).status()).toBe(500);

    await expect(dialog).toBeVisible();
    await expect(results).toBeVisible();
    await expect(dialog.getByText('3 treff på "button"')).toBeAttached();
  });
});

test.describe("Global search: URL state", () => {
  test("mirrors the query to ?query= and clears it on close", async ({
    page,
  }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input, closeButton } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await expect(page).toHaveURL(/[?&]query=button/);

    await closeButton.click();
    await expect(dialog).toBeHidden();
    await expect(page).not.toHaveURL(/query=/);
  });

  test("opens and prefills from a ?query= deep link", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input, results } = getSearch(page);

    await page.goto(`${PAGE_URL}?query=button`);

    await expect(dialog).toBeVisible();
    await expect(input).toHaveValue("button");
    await expect(results).toBeVisible();
  });
});

test.describe("Global search: result links", () => {
  test("navigates to the result, closes search and drops ?query=", async ({
    page,
  }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await dialog.getByRole("link", { name: "Button", exact: true }).click();

    await expect(page).toHaveURL(/\/komponenter\/core\/button$/);
    await expect(dialog).toBeHidden();
  });

  test("links anchor hits to the matched section", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input } = getSearch(page);

    await openSearch(page);
    await input.fill("tekstfelt");
    const link = dialog.getByRole("link", { name: "TextField", exact: true });

    await expect(link).toHaveAttribute(
      "href",
      "/komponenter/core/textfield#fixture-anchor",
    );
    await link.click();

    await expect(page).toHaveURL(
      /\/komponenter\/core\/textfield#fixture-anchor$/,
    );
    await expect(dialog).toBeHidden();
  });

  test("Cmd/Ctrl+click opens a new tab and keeps search open", async ({
    page,
    context,
    isMobile,
  }) => {
    test.skip(isMobile, "No modifier clicks on mobile");
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { dialog, input } = getSearch(page);

    await openSearch(page);
    await input.fill("button");

    const newPage = context.waitForEvent("page");
    await dialog
      .getByRole("link", { name: "Button", exact: true })
      .click({ modifiers: ["ControlOrMeta"] });

    await expect(await newPage).toHaveURL(/\/komponenter\/core\/button$/);
    await expect(dialog).toBeVisible();
  });
});

test.describe("Global search: index preload", () => {
  test("clicking the search button calls the preload action", async ({
    page,
  }) => {
    const action = page.waitForRequest(
      (r) => r.method() === "POST" && !!r.headers()["next-action"],
    );

    await openSearch(page);
    await action;
  });

  test("Cmd/Ctrl+K calls the preload action", async ({ page, isMobile }) => {
    test.skip(isMobile, "No hardware keyboard on mobile");
    const action = page.waitForRequest(
      (r) => r.method() === "POST" && !!r.headers()["next-action"],
    );

    await openWithShortcut(page, "ControlOrMeta+k");
    await action;
  });
});

test.describe("Global search: accessibility", () => {
  test("open dialog with results has no axe violations", async ({ page }) => {
    await mockSearchApi(page, (q) => ({ body: searchResult(q) }));
    const { input, results } = getSearch(page);

    await openSearch(page);
    await input.fill("button");
    await expect(results).toBeVisible();

    const scan = await new AxeBuilder({ page })
      .include('[role="dialog"]')
      .analyze();

    expect(scan.violations).toEqual([]);
  });
});

test.describe("Global search: end-to-end with real index", () => {
  test("finds and opens the Button page", async ({ page }) => {
    const { dialog, input } = getSearch(page);

    await openSearch(page);
    await input.fill("button");

    /* First query may build the index on a cold server. */
    const link = dialog.getByRole("link", { name: "Button", exact: true });
    await expect(link.first()).toBeVisible({ timeout: 30_000 });
    await link.first().click();

    await expect(page).toHaveURL(/\/komponenter\/core\/button/);
    await expect(dialog).toBeHidden();
  });
});

test.describe("Search API", () => {
  test.skip(({ isMobile }) => isMobile, "API tests run once");

  test("rejects a missing query", async ({ request }) => {
    const res = await request.get("/api/search");
    expect(res.status()).toBe(400);
  });

  test("rejects a query longer than 100 characters", async ({ request }) => {
    const res = await request.get(`/api/search?q=${"a".repeat(101)}`);
    expect(res.status()).toBe(400);
  });

  test("returns null for queries shorter than 2 characters", async ({
    request,
  }) => {
    const res = await request.get("/api/search?q=%20b%20");
    expect(res.status()).toBe(200);
    expect(await res.json()).toBeNull();
  });
});

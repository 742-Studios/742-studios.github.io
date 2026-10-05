import { expect, test } from "@playwright/test";

const SECTIONS = ["About", "Services", "Projects", "Contact"];

test.describe("Home page sections", () => {
  test("Verify each section renders with its heading", async ({ page }) => {
    await page.goto("/");

    for (const name of SECTIONS) {
      await expect(
        page.getByRole("region", { name }).getByRole("heading", {
          level: 2,
          name,
        })
      ).toBeVisible();
    }
  });

  test("Verify the NextStarter case study links to its site", async ({
    page,
  }) => {
    await page.goto("/");

    const projects = page.getByRole("region", { name: "Projects" });
    await expect(
      projects.getByRole("article", { name: "NextStarter" })
    ).toBeVisible();
    await expect(
      projects.getByRole("link", { name: "Visit nextstarter.app" })
    ).toHaveAttribute("href", "https://www.nextstarter.app/");
  });

  test("Verify header navigation scrolls to its section", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Desktop navigation is hidden on mobile");
    await page.goto("/");

    await page
      .getByRole("navigation", { name: "Main" })
      .getByRole("button", { name: "Contact" })
      .click();

    await expect(
      page.getByRole("region", { name: "Contact" })
    ).toBeInViewport();
  });
});

/**
 * The form posts to whatever NEXT_PUBLIC_CONTACT_FORM_ENDPOINT points at. These
 * specs never let a submission reach it: when it is set, every request to it
 * is intercepted and answered here, so a test run never sends a real email.
 */
const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "";

test.describe("Contact form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    const contact = page.getByRole("region", { name: "Contact" });
    await contact.getByLabel("Name").fill("Ada Lovelace");
    await contact.getByLabel("Email").fill("ada@example.com");
    await contact.getByLabel("About your project").fill("A new website.");
  });

  test("Verify it says it is not connected when no endpoint is set", async ({
    page,
  }) => {
    test.skip(Boolean(formEndpoint), "An endpoint is configured");

    const contact = page.getByRole("region", { name: "Contact" });
    await contact.getByRole("button", { name: "Send enquiry" }).click();

    await expect(contact.getByRole("status")).toContainText(
      "isn’t connected yet"
    );
  });

  test("Verify a successful submission is confirmed and clears the form", async ({
    page,
  }) => {
    test.skip(!formEndpoint, "No endpoint is configured");

    let postedBody = "";
    await page.route(formEndpoint, async (route) => {
      postedBody = route.request().postData() ?? "";
      await route.fulfill({ json: { ok: true }, status: 200 });
    });

    const contact = page.getByRole("region", { name: "Contact" });
    await contact.getByRole("button", { name: "Send enquiry" }).click();

    await expect(contact.getByRole("status")).toHaveText(
      "Enquiry sent. I’ll reply within two working days."
    );
    expect(postedBody).toContain("ada@example.com");
    await expect(contact.getByLabel("Name")).toHaveValue("");
  });

  test("Verify a failed submission keeps the message and offers email", async ({
    page,
  }) => {
    test.skip(!formEndpoint, "No endpoint is configured");

    await page.route(formEndpoint, (route) =>
      route.fulfill({ json: { error: "Server error" }, status: 500 })
    );

    const contact = page.getByRole("region", { name: "Contact" });
    await contact.getByRole("button", { name: "Send enquiry" }).click();

    await expect(contact.getByRole("status")).toContainText("wasn’t sent");
    await expect(contact.getByLabel("About your project")).toHaveValue(
      "A new website."
    );
  });
});

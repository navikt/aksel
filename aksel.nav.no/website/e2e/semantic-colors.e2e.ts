import { test } from "@playwright/test";

test("Semantic-colors", async ({ page }) => {
  await page.goto("http://localhost:3000/designsystem/side/color");

  await page.getByText("Interaction-primary").nth(1).click();

  await page.getByText("Interaction-primary-hover").first().click();

  await page.getByText("Interaction-primary-selected").click();

  await page.getByText("Interaction-primary-hover-subtle").click();

  await page.getByText("Interaction-danger").first().click();

  await page.getByText("Interaction-danger-hover").click();

  await page.getByText("Interaction-danger-selected").click();

  await page.getByText("kopier tokenFocus-invertedblue-200#99C3FF").click();

  await page.getByText("Focus").nth(2).click();

  await page.getByText("Feedback-success-background").click();

  await page.getByText("Feedback-success-border").click();

  await page.getByText("Feedback-success-icon").click();

  await page.getByText("Feedback-danger-background").click();

  await page.getByText("Feedback-danger-border").click();

  await page.getByText("Feedback-danger-icon").click();

  await page.getByText("Feedback-warning-background").click();

  await page
    .getByText(
      "kopier tokenFeedback-warning-backgroundorange-50#FFF9F0kopier tokenFeedback-warn"
    )
    .click();

  await page.getByText("Feedback-warning-border").click();

  await page.getByText("Feedback-warning-icon").click();

  await page.getByText("Feedback-info-background").click();

  await page.getByText("Feedback-info-border").click();

  await page.getByText("Feedback-info-icon").click();

  await page.getByText("Canvas-background").first().click();

  await page.getByText("Canvas-background-inverted").click();

  await page.getByText("Canvas-background-light").click();

  await page.locator('p:has-text("Divider")').click();

  await page.getByText("Border-muted").click();

  await page.getByText("Border-inverted").click();

  await page.locator('p:has-text("Text")').first().click();

  await page.getByText("Text-muted").click();

  await page.getByText("Text-inverted").click();

  await page.getByText("Feedback-danger-text").click();

  await page.getByText("Link").nth(2).click();

  await page.getByText("Link-visited").click();

  await page.getByText("Component-background-alternate").click();

  await page.getByText("Component-background-light").click();

  await page.getByText("Component-background-inverted").click();
});

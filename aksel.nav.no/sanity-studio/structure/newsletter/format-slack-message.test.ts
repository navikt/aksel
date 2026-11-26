import { describe, expect, test } from "vitest";
import {
  formatSlackMessage,
  toSlackHtml,
  toSlackMrkdwn,
} from "./format-slack-message";

const period = { from: new Date(2026, 10, 16), to: new Date(2026, 10, 20) };

describe("formatSlackMessage", () => {
  test("groups articles and changelog entries into sections with links", () => {
    const message = formatSlackMessage(
      {
        articles: [
          {
            _id: "1",
            _type: "komponent_artikkel",
            heading: "Dialog",
            slug: { current: "komponenter/core/dialog" },
            date: "2026-11-17T10:00:00Z",
          },
        ],
        changelog: [
          {
            _id: "2",
            _type: "ds_endringslogg_artikkel",
            heading: "ds-react 8.1.0",
            slug: { current: "ds-react-8-1-0" },
            endringstype: "kode",
            date: "2026-11-18T10:00:00Z",
          },
          {
            _id: "3",
            _type: "gp_endringslogg_artikkel",
            heading: "Oppdatert skjemaveiledning",
            slug: { current: "skjema" },
            date: "2026-11-19T10:00:00Z",
          },
        ],
      },
      period,
    );

    expect(message).toContain("Nytt fra Aksel (uke 47)");
    expect(message).toContain(
      "*Designsystemkomponenter*\n• [Dialog](https://aksel.nav.no/komponenter/core/dialog)",
    );
    expect(message).toContain(
      "*Kode*\n• [ds-react 8.1.0](https://aksel.nav.no/grunnleggende/endringslogg/ds-react-8-1-0)",
    );
    expect(message).toContain(
      "*Endringer i dokumentasjonen*\n• [Oppdatert skjemaveiledning](https://aksel.nav.no/god-praksis/endring/skjema)",
    );
    expect(message).not.toContain("*Design*");
  });

  test("uses full dates when the period spans more than one week", () => {
    expect(
      formatSlackMessage(
        { articles: [], changelog: [] },
        { from: new Date(2026, 5, 1), to: new Date(2026, 10, 25) },
      ),
    ).toContain("Nytt fra Aksel (01.06.2026–25.11.2026)");
  });

  test("says so when nothing was published", () => {
    expect(
      formatSlackMessage({ articles: [], changelog: [] }, period),
    ).toContain("Ingen nye publiseringer");
  });
});

describe("toSlackHtml", () => {
  test("converts links, bold text and line breaks, and escapes HTML", () => {
    expect(
      toSlackHtml(
        "*Komponenter*\n• [Dialog <ny>](https://aksel.nav.no/a?b=1&c=2)",
      ),
    ).toBe(
      '<b>Komponenter</b><br>• <a href="https://aksel.nav.no/a?b=1&amp;c=2">Dialog &lt;ny&gt;</a>',
    );
  });
});

describe("toSlackMrkdwn", () => {
  test("converts links and escapes Slack control characters", () => {
    expect(
      toSlackMrkdwn(
        "*Komponenter*\n• [Dialog <ny>](https://aksel.nav.no/a?b=1&c=2)",
      ),
    ).toBe(
      "*Komponenter*\n• <https://aksel.nav.no/a?b=1&amp;c=2|Dialog &lt;ny&gt;>",
    );
  });
});

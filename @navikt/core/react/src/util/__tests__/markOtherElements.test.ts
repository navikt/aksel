import { beforeEach, describe, expect, test } from "vitest";
import { markOtherElements } from "../markOtherElements";

describe("markOtherElements util", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("marks non-avoided siblings with marker and cleans up on undo", () => {
    document.body.innerHTML = `
      <div id="root">
        <div id="target"></div>
        <div id="hidden-1"></div>
        <div aria-live="polite" id="live-region"></div>
        <script id="script-el"></script>
      </div>
    `;
    const target = document.getElementById("target") as Element;
    const hidden1 = document.getElementById("hidden-1") as Element;
    const live = document.getElementById("live-region") as Element;
    const script = document.getElementById("script-el") as Element;

    const undo = markOtherElements([target]);

    expect(hidden1.hasAttribute("data-aksel-hidden")).toBe(true);
    expect(live.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(script.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(target.hasAttribute("data-aksel-hidden")).toBe(false);

    undo();

    expect(hidden1.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(live.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(script.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(target.hasAttribute("data-aksel-hidden")).toBe(false);
  });

  test("applies aria-hidden when requested and restores previous state", () => {
    document.body.innerHTML = `
      <div id="root">
        <div id="target"></div>
        <div id="hidden-2"></div>
        <div id="pre-hidden" aria-hidden="true"></div>
      </div>
    `;
    const target = document.getElementById("target") as Element;
    const hidden2 = document.getElementById("hidden-2") as Element;
    const preHidden = document.getElementById("pre-hidden") as Element;

    const undo = markOtherElements([target]);

    expect(hidden2.getAttribute("aria-hidden")).toBe("true");
    expect(preHidden.getAttribute("aria-hidden")).toBe("true");
    expect(hidden2.hasAttribute("data-aksel-hidden")).toBe(true);
    expect(preHidden.hasAttribute("data-aksel-hidden")).toBe(true);

    undo();

    expect(hidden2.hasAttribute("aria-hidden")).toBe(false);
    expect(preHidden.getAttribute("aria-hidden")).toBe("true");
    expect(hidden2.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(preHidden.hasAttribute("data-aksel-hidden")).toBe(false);
  });

  test("treats shadow-hosted avoid elements as connected to host", () => {
    document.body.innerHTML = `
      <div id="root"></div>
    `;
    const root = document.getElementById("root") as HTMLElement;

    const host = document.createElement("div");
    host.id = "shadow-host";
    const shadow = host.attachShadow({ mode: "open" });
    const shadowTarget = document.createElement("button");
    shadowTarget.id = "shadow-target";
    shadow.appendChild(shadowTarget);

    const sibling = document.createElement("div");
    sibling.id = "outside";

    root.append(host, sibling);

    const undo = markOtherElements([shadowTarget]);

    expect(sibling.hasAttribute("data-aksel-hidden")).toBe(true);
    expect(host.hasAttribute("data-aksel-hidden")).toBe(false);

    undo();

    expect(sibling.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(host.hasAttribute("data-aksel-hidden")).toBe(false);
  });

  test("maintains counters across nested calls until final undo", () => {
    document.body.innerHTML = `
      <div id="root">
        <div id="target-a"></div>
        <div id="target-b"></div>
        <div id="shared"></div>
      </div>
    `;
    const targetA = document.getElementById("target-a") as Element;
    const targetB = document.getElementById("target-b") as Element;
    const shared = document.getElementById("shared") as Element;

    const undoA = markOtherElements([targetA]);
    expect(shared.hasAttribute("data-aksel-hidden")).toBe(true);

    const undoB = markOtherElements([targetB]);
    expect(shared.hasAttribute("data-aksel-hidden")).toBe(true);

    undoB();
    expect(shared.hasAttribute("data-aksel-hidden")).toBe(true);
    expect(shared.getAttribute("aria-hidden")).toBe("true");

    undoA();
    expect(shared.hasAttribute("data-aksel-hidden")).toBe(false);
    expect(shared.hasAttribute("aria-hidden")).toBe(false);
  });
});

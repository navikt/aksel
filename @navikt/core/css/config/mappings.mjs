export const typoCss = "typography.css";
export const formCss = "form.css";
export const componentsCss = "Components.css";

export const StyleMappings = {
  prioritzedCss: [typoCss, formCss],
  baseline: [
    {
      main: "fonts.css",
      optional: false,
    },
    {
      main: "tokens.css",
      optional: false,
    },
    {
      main: "reset.css",
      optional: true,
    },
    {
      main: "baseline.css",
      optional: false,
    },
    {
      main: "print.css",
      optional: true,
    },
  ],
  components: [
    {
      component: "Accordion",
      main: "accordion.css",
      dependencies: [typoCss],
    },
    { component: "Alert", main: "alert.css", dependencies: [typoCss] },
    {
      component: "BodyLong",
      main: typoCss,
    },
    {
      component: "BodyShort",
      main: typoCss,
      dependencies: [typoCss],
    },
    {
      component: "Button",
      main: "button.css",
      dependencies: [typoCss, "loader.css"],
    },
    { component: "Cell", main: "grid.css" },
    { component: "Chat", main: "chat.css", dependencies: [typoCss] },
    { component: "Checkbox", main: formCss, dependencies: [typoCss] },
    { component: "CheckboxGroup", main: formCss, dependencies: [typoCss] },
    { component: "Chips", main: "chips.css", dependencies: [typoCss] },
    {
      component: "ConfirmationPanel",
      main: formCss,
      dependencies: [typoCss],
    },
    {
      component: "ContentContainer",
      main: "content-container.css",
    },
    { component: "Detail", main: typoCss },
    { component: "ErrorMessage", main: typoCss },
    { component: "ErrorSummary", main: formCss, dependencies: [typoCss] },
    {
      component: "ExpansionCard",
      main: "expansion-card.css",
      dependencies: [typoCss],
    },
    { component: "Fieldset", main: formCss, dependencies: [typoCss] },
    { component: "Grid", main: "grid.css", dependencies: [typoCss] },
    {
      component: "GuidePanel",
      main: "guide-panel.css",
      dependencies: [typoCss],
    },
    { component: "Heading", main: typoCss, dependencies: [typoCss] },
    {
      component: "HelpText",
      main: "help-text.css",
      dependencies: ["popover.css"],
    },
    { component: "Ingress", main: typoCss },
    { component: "Label", main: typoCss },
    { component: "Link", main: "link.css", dependencies: [typoCss] },
    {
      component: "LinkPanel",
      main: "link-panel.css",
      dependencies: [typoCss, "panel.css"],
    },
    { component: "List", main: "list.css", dependencies: [typoCss] },
    { component: "Loader", main: "loader.css" },
    {
      component: "Modal",
      main: "modal.css",
      dependencies: ["button.css"],
    },
    {
      component: "Pagination",
      main: "pagination.css",
      dependencies: [typoCss, "button.css"],
    },
    { component: "Panel", main: "panel.css" },
    { component: "Popover", main: "popover.css" },
    { component: "Provider", main: "" },
    { component: "Radio", main: formCss, dependencies: [typoCss] },
    { component: "RadioGroup", main: formCss, dependencies: [typoCss] },
    { component: "ReadMore", main: "read-more.css", dependencies: [typoCss] },
    { component: "Search", main: formCss, dependencies: [typoCss] },
    { component: "Select", main: formCss, dependencies: [typoCss] },
    { component: "Stepper", main: "stepper.css", dependencies: [typoCss] },
    { component: "Switch", main: formCss, dependencies: [typoCss] },
    { component: "Table", main: "table.css", dependencies: [typoCss] },
    { component: "Tabs", main: "tabs.css", dependencies: [typoCss] },
    { component: "Tag", main: "tag.css", dependencies: [typoCss] },
    { component: "TextField", main: formCss, dependencies: [typoCss] },
    { component: "Textarea", main: formCss, dependencies: [typoCss] },
    {
      component: "ToggleGroup",
      main: "toggle-group.css",
      dependencies: [typoCss],
    },
    { component: "Tooltip", main: "tooltip.css", dependencies: [typoCss] },
    {
      component: "UNSAFE_DatePicker",
      main: "date.css",
      dependencies: [typoCss, "button.css", "popover.css"],
    },
    {
      component: "UNSAFE_MonthPicker",
      main: "date.css",
      dependencies: [typoCss, "button.css", "popover.css"],
    },
  ],
};

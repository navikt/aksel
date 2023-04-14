type StyleMap = {
  component: string;
  main: string;
  sideEffects?: string[];
};

const typoCss = "typography.css";
const formCss = "form.css";

export const StyleMappings: StyleMap[] = [
  {
    component: "Accordion",
    main: "accordion.css",
    sideEffects: [typoCss],
  },
  { component: "Alert", main: "", sideEffects: [typoCss] },
  {
    component: "BodyLong",
    main: typoCss,
  },
  {
    component: "BodyShort",
    main: typoCss,
    sideEffects: [typoCss],
  },
  { component: "Button", main: "button.css", sideEffects: [typoCss] },
  { component: "Cell", main: "grid.css" },
  { component: "Chat", main: "chat.css", sideEffects: [typoCss] },
  { component: "Checkbox", main: formCss, sideEffects: [typoCss] },
  { component: "CheckboxGroup", main: formCss, sideEffects: [typoCss] },
  { component: "Chips", main: "chips.css", sideEffects: [typoCss] },
  {
    component: "ConfirmationPanel",
    main: formCss,
    sideEffects: [typoCss],
  },
  {
    component: "ContentContainer",
    main: "content-container.css",
  },
  { component: "Detail", main: typoCss },
  { component: "ErrorMessage", main: typoCss },
  { component: "ErrorSummary", main: formCss, sideEffects: [typoCss] },
  {
    component: "ExpansionCard",
    main: "expansion-card.css",
    sideEffects: [typoCss],
  },
  { component: "Fieldset", main: formCss, sideEffects: [typoCss] },
  { component: "Grid", main: "grid.css", sideEffects: [typoCss] },
  { component: "GuidePanel", main: "guide-panel.css", sideEffects: [typoCss] },
  { component: "Heading", main: typoCss, sideEffects: [typoCss] },
  {
    component: "HelpText",
    main: "help-text.css",
    sideEffects: ["popover.css"],
  },
  { component: "Ingress", main: typoCss },
  { component: "Label", main: typoCss },
  { component: "Link", main: "link.css", sideEffects: [typoCss] },
  { component: "LinkPanel", main: "link-panel.css", sideEffects: [typoCss] },
  { component: "List", main: "list.css", sideEffects: [typoCss] },
  { component: "Loader", main: "loader.css" },
  {
    component: "Modal",
    main: "modal.css",
    sideEffects: ["button.css"],
  },
  {
    component: "Pagination",
    main: "pagination.css",
    sideEffects: [typoCss, "button.css"],
  },
  { component: "Panel", main: "panel.css" },
  { component: "Popover", main: "popover.css" },
  { component: "Provider", main: "" },
  { component: "Radio", main: formCss, sideEffects: [typoCss] },
  { component: "RadioGroup", main: formCss, sideEffects: [typoCss] },
  { component: "ReadMore", main: "read-more.css", sideEffects: [typoCss] },
  { component: "Search", main: formCss, sideEffects: [typoCss] },
  { component: "Select", main: formCss, sideEffects: [typoCss] },
  { component: "Stepper", main: "stepper.css", sideEffects: [typoCss] },
  { component: "Switch", main: formCss, sideEffects: [typoCss] },
  { component: "Table", main: "table.css", sideEffects: [typoCss] },
  { component: "Tabs", main: "tabs.css", sideEffects: [typoCss] },
  { component: "Tag", main: "tag.css", sideEffects: [typoCss] },
  { component: "TextField", main: formCss, sideEffects: [typoCss] },
  { component: "Textarea", main: formCss, sideEffects: [typoCss] },
  {
    component: "ToggleGroup",
    main: "toggle-group.css",
    sideEffects: [typoCss],
  },
  { component: "Tooltip", main: "tooltip.css", sideEffects: [typoCss] },
  {
    component: "UNSAFE_DatePicker",
    main: "date.css",
    sideEffects: [typoCss, "button.css"],
  },
  {
    component: "UNSAFE_MonthPicker",
    main: "date.css",
    sideEffects: [typoCss, "button.css"],
  },
];

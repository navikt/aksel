import { getFrameworkRegexes } from "./token-regex";
import { generateBgTwTags, generateRoundedTwTags } from "./token.utils";

type ColorObjType = {
  ref: string;
  raw: `rgba(${string})`;
  replacement: string;
  comment?: string;
};

const colors = {
  "purple-900": {
    ref: "",
    raw: "rgba(31, 20, 47, 1)",
    replacement: "meta-purple-1000",
  },
  "purple-800": {
    ref: "",
    raw: "rgba(48, 31, 70, 1)",
    replacement: "meta-purple-900",
  },
  "purple-700": {
    ref: "",
    raw: "rgba(65, 43, 93, 1)",
    replacement: "meta-purple-800",
  },
  "purple-600": {
    ref: "",
    raw: "rgba(82, 56, 116, 1)",
    replacement: "meta-purple-700",
  },
  "purple-500": {
    ref: "",
    raw: "rgba(99, 70, 137, 1)",
    replacement: "meta-purple-600",
  },
  "purple-400": {
    ref: "",
    raw: "rgba(130, 105, 162, 1)",
    replacement: "meta-purple-500",
  },
  "purple-300": {
    ref: "",
    raw: "rgba(161, 141, 187, 1)",
    replacement: "meta-purple-400",
  },
  "purple-200": {
    ref: "",
    raw: "rgba(192, 178, 210, 1)",
    replacement: "meta-purple-300",
  },
  "purple-100": {
    ref: "",
    raw: "rgba(224, 216, 233, 1)",
    replacement: "meta-purple-200",
  },
  "purple-50": {
    ref: "",
    raw: "rgba(239, 236, 244, 1)",
    replacement: "meta-purple-100",
  },
  "orange-900": {
    ref: "",
    raw: "rgba(82, 51, 0, 1)",
    replacement: "warning-1000",
  },
  "orange-800": {
    ref: "",
    raw: "rgba(125, 76, 0, 1)",
    replacement: "warning-900",
  },
  "orange-700": {
    ref: "",
    raw: "rgba(168, 100, 0, 1)",
    replacement: "warning-800",
  },
  "orange-600": {
    ref: "",
    raw: "rgba(199, 115, 0, 1)",
    replacement: "warning-700",
  },
  "orange-500": {
    ref: "",
    raw: "rgba(255, 145, 0, 1)",
    replacement: "warning-600",
  },
  "orange-400": {
    ref: "",
    raw: "rgba(255, 170, 51, 1)",
    replacement: "warning-500",
  },
  "orange-300": {
    ref: "",
    raw: "rgba(255, 193, 102, 1)",
    replacement: "warning-400",
  },
  "orange-200": {
    ref: "",
    raw: "rgba(255, 215, 153, 1)",
    replacement: "warning-300",
  },
  "orange-100": {
    ref: "",
    raw: "rgba(255, 236, 204, 1)",
    replacement: "warning-200",
  },
  "orange-50": {
    ref: "",
    raw: "rgba(255, 249, 240, 1)",
    replacement: "warning-100",
  },
  "limegreen-900": {
    ref: "",
    raw: "rgba(71, 78, 0, 1)",
    replacement: "meta-lime-1000",
  },
  "limegreen-800": {
    ref: "",
    raw: "rgba(102, 110, 0, 1)",
    replacement: "meta-lime-900",
  },
  "limegreen-700": {
    ref: "",
    raw: "rgba(127, 137, 0, 1)",
    replacement: "meta-lime-800",
  },
  "limegreen-600": {
    ref: "",
    raw: "rgba(147, 158, 0, 1)",
    replacement: "meta-lime-700",
  },
  "limegreen-500": {
    ref: "",
    raw: "rgba(162, 173, 0, 1)",
    replacement: "meta-lime-600",
  },
  "limegreen-400": {
    ref: "",
    raw: "rgba(193, 203, 51, 1)",
    replacement: "meta-lime-500",
  },
  "limegreen-300": {
    ref: "",
    raw: "rgba(217, 227, 102, 1)",
    replacement: "meta-lime-400",
  },
  "limegreen-200": {
    ref: "",
    raw: "rgba(236, 243, 153, 1)",
    replacement: "meta-lime-300",
  },
  "limegreen-100": {
    ref: "",
    raw: "rgba(249, 252, 204, 1)",
    replacement: "meta-lime-200",
  },
  "limegreen-50": {
    ref: "",
    raw: "rgba(253, 255, 230, 1)",
    replacement: "meta-lime-100",
  },
  "lightblue-900": {
    ref: "",
    raw: "rgba(19, 72, 82, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-800": {
    ref: "",
    raw: "rgba(35, 107, 125, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-700": {
    ref: "",
    raw: "rgba(54, 141, 168, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-600": {
    ref: "",
    raw: "rgba(76, 173, 205, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-500": {
    ref: "",
    raw: "rgba(102, 203, 236, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-400": {
    ref: "",
    raw: "rgba(124, 218, 248, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-300": {
    ref: "",
    raw: "rgba(151, 230, 255, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-200": {
    ref: "",
    raw: "rgba(181, 241, 255, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-100": {
    ref: "",
    raw: "rgba(216, 249, 255, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "lightblue-50": {
    ref: "",
    raw: "rgba(235, 252, 255, 1)",
    replacement: "",
    comment:
      "Lightblue is now info and brand-blue color. Consider using those colors.",
  },
  "green-900": {
    ref: "",
    raw: "rgba(0, 59, 15, 1)",
    replacement: "success-1000",
  },
  "green-800": {
    ref: "",
    raw: "rgba(0, 85, 25, 1)",
    replacement: "success-900",
  },
  "green-700": {
    ref: "",
    raw: "rgba(0, 106, 35, 1)",
    replacement: "success-800",
  },
  "green-600": {
    ref: "",
    raw: "rgba(0, 124, 46, 1)",
    replacement: "success-700",
  },
  "green-500": {
    ref: "",
    raw: "rgba(6, 137, 58, 1)",
    replacement: "success-600",
  },
  "green-400": {
    ref: "",
    raw: "rgba(42, 167, 88, 1)",
    replacement: "success-500",
  },
  "green-300": {
    ref: "",
    raw: "rgba(102, 199, 134, 1)",
    replacement: "success-400",
  },
  "green-200": {
    ref: "",
    raw: "rgba(153, 222, 173, 1)",
    replacement: "success-300",
  },
  "green-100": {
    ref: "",
    raw: "rgba(204, 241, 214, 1)",
    replacement: "success-200",
  },
  "green-50": {
    ref: "",
    raw: "rgba(243, 252, 245, 1)",
    replacement: "success-100",
  },
  "deepblue-900": {
    ref: "",
    raw: "rgba(0, 36, 58, 1)",
    replacement: "brand-blue-1000",
  },
  "deepblue-800": {
    ref: "",
    raw: "rgba(0, 52, 83, 1)",
    replacement: "brand-blue-900",
  },
  "deepblue-700": {
    ref: "",
    raw: "rgba(0, 67, 103, 1)",
    replacement: "brand-blue-800",
  },
  "deepblue-600": {
    ref: "",
    raw: "rgba(0, 80, 119, 1)",
    replacement: "brand-blue-700",
  },
  "deepblue-500": {
    ref: "",
    raw: "rgba(0, 91, 130, 1)",
    replacement: "brand-blue-600",
  },
  "deepblue-400": {
    ref: "",
    raw: "rgba(51, 128, 165, 1)",
    replacement: "brand-blue-500",
  },
  "deepblue-300": {
    ref: "",
    raw: "rgba(102, 163, 196, 1)",
    replacement: "brand-blue-400",
  },
  "deepblue-200": {
    ref: "",
    raw: "rgba(153, 196, 221, 1)",
    replacement: "brand-blue-300",
  },
  "deepblue-100": {
    ref: "",
    raw: "rgba(204, 226, 240, 1)",
    replacement: "brand-blue-200",
  },
  "deepblue-50": {
    ref: "",
    raw: "rgba(230, 241, 248, 1)",
    replacement: "brand-blue-100",
  },
  "red-900": {
    ref: "",
    raw: "rgba(38, 0, 0, 1)",
    replacement: "danger-1000",
  },
  "red-800": {
    ref: "",
    raw: "rgba(92, 0, 0, 1)",
    replacement: "danger-900",
  },
  "red-700": {
    ref: "",
    raw: "rgba(140, 0, 0, 1)",
    replacement: "danger-800",
  },
  "red-600": {
    ref: "",
    raw: "rgba(173, 0, 0, 1)",
    replacement: "danger-700",
  },
  "red-500": {
    ref: "",
    raw: "rgba(195, 0, 0, 1)",
    replacement: "danger-600",
  },
  "red-400": {
    ref: "",
    raw: "rgba(222, 46, 46, 1)",
    replacement: "danger-500",
  },
  "red-300": {
    ref: "",
    raw: "rgba(242, 92, 92, 1)",
    replacement: "danger-400",
  },
  "red-200": {
    ref: "",
    raw: "rgba(246, 130, 130, 1)",
    replacement: "danger-300",
  },
  "red-100": {
    ref: "",
    raw: "rgba(255, 194, 194, 1)",
    replacement: "danger-200",
  },
  "red-50": {
    ref: "",
    raw: "rgba(255, 230, 230, 1)",
    replacement: "danger-100",
  },
  "blue-900": {
    ref: "",
    raw: "rgba(0, 34, 82, 1)",
    replacement: "accent-1000",
  },
  "blue-800": {
    ref: "",
    raw: "rgba(0, 52, 125, 1)",
    replacement: "accent-900",
  },
  "blue-700": {
    ref: "",
    raw: "rgba(0, 69, 156, 1)",
    replacement: "accent-800",
  },
  "blue-600": {
    ref: "",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "accent-700",
  },
  "blue-500": {
    ref: "",
    raw: "rgba(0, 103, 197, 1)",
    replacement: "accent-600",
  },
  "blue-400": {
    ref: "",
    raw: "rgba(51, 134, 224, 1)",
    replacement: "accent-500",
  },
  "blue-300": {
    ref: "",
    raw: "rgba(102, 165, 244, 1)",
    replacement: "accent-400",
  },
  "blue-200": {
    ref: "",
    raw: "rgba(153, 195, 255, 1)",
    replacement: "accent-300",
  },
  "blue-100": {
    ref: "",
    raw: "rgba(204, 225, 255, 1)",
    replacement: "accent-200",
  },
  "blue-50": {
    ref: "",
    raw: "rgba(230, 240, 255, 1)",
    replacement: "accent-100",
  },
  "grayalpha-900": {
    ref: "",
    raw: "rgba(2, 5, 9, 0.87)",
    replacement: "",
    comment:
      "No replacement available. Use neutral-1000 of you don't need opacity.",
  },
  "grayalpha-800": {
    ref: "",
    raw: "rgba(3, 11, 22, 0.75)",
    replacement: "",
    comment:
      "No replacement available. Use neutral-900 of you don't need opacity.",
  },
  "grayalpha-700": {
    ref: "",
    raw: "rgba(1, 11, 24, 0.68)",
    replacement: "",
    comment:
      "No replacement available. Use neutral-800 of you don't need opacity.",
  },
  "grayalpha-600": {
    ref: "",
    raw: "rgba(2, 15, 34, 0.6)",
    replacement: "",
    comment:
      "No replacement available. Use neutral-700 of you don't need opacity.",
  },
  "grayalpha-500": {
    ref: "",
    raw: "rgba(2, 20, 49, 0.49)",
    replacement: "",
    comment:
      "No replacement available. Use neutral-600 of you don't need opacity.",
  },
  "grayalpha-400": {
    ref: "",
    raw: "rgba(5, 23, 51, 0.34)",
    replacement: "",
    comment:
      "No replacement available. Use neutral-500 of you don't need opacity.",
  },
  "grayalpha-300": {
    ref: "",
    raw: "rgba(7, 26, 54, 0.21)",
    replacement: "neutral-400A",
  },
  "grayalpha-200": {
    ref: "",
    raw: "rgba(17, 41, 64, 0.13)",
    replacement: "neutral-300A",
  },
  "grayalpha-100": {
    ref: "",
    raw: "rgba(18, 43, 68, 0.08)",
    replacement: "neutral-200A",
  },
  "grayalpha-50": {
    ref: "",
    raw: "rgba(38, 55, 89, 0.06)",
    replacement: "neutral-100A",
  },
  "gray-900": {
    ref: "",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "neutral-1000",
  },
  "gray-800": {
    ref: "",
    raw: "rgba(66, 71, 79, 1)",
    replacement: "neutral-900",
  },
  "gray-700": {
    ref: "",
    raw: "rgba(82, 89, 98, 1)",
    replacement: "neutral-800",
  },
  "gray-600": {
    ref: "",
    raw: "rgba(103, 111, 123, 1)",
    replacement: "neutral-700",
  },
  "gray-500": {
    ref: "",
    raw: "rgba(131, 140, 154, 1)",
    replacement: "neutral-600",
  },
  "gray-400": {
    ref: "",
    raw: "rgba(170, 176, 186, 1)",
    replacement: "neutral-500",
  },
  "gray-300": {
    ref: "",
    raw: "rgba(203, 207, 213, 1)",
    replacement: "neutral-400",
  },
  "gray-200": {
    ref: "",
    raw: "rgba(224, 227, 230, 1)",
    replacement: "neutral-300",
  },
  "gray-100": {
    ref: "",
    raw: "rgba(236, 238, 240, 1)",
    replacement: "neutral-200",
  },
  "gray-50": {
    ref: "",
    raw: "rgba(242, 243, 245, 1)",
    replacement: "neutral-100",
  },
  "data-border-6": {
    ref: "purple-400",
    raw: "rgba(130, 105, 162, 1)",
    replacement: "border-meta-purple",
  },
  "data-border-5": {
    ref: "green-400",
    raw: "rgba(42, 167, 88, 1)",
    replacement: "border-success",
  },
  "data-border-4": {
    ref: "lightblue-700",
    raw: "rgba(54, 141, 168, 1)",
    replacement: "",
    comment: "Lightblue is now info and brand-blue color.",
  },
  "data-border-3": {
    ref: "orange-600",
    raw: "rgba(199, 115, 0, 1)",
    replacement: "border-warning",
  },
  "data-border-2": {
    ref: "deepblue-500",
    raw: "rgba(0, 91, 130, 1)",
    replacement: "border-brand-blue",
  },
  "data-border-1": {
    ref: "blue-400",
    raw: "rgba(51, 134, 224, 1)",
    replacement: "border-accent",
  },
  "data-surface-6-subtle": {
    ref: "purple-200",
    raw: "rgba(192, 178, 210, 1)",
    replacement: "meta-purple-300",
  },
  "data-surface-6": {
    ref: "purple-400",
    raw: "rgba(130, 105, 162, 1)",
    replacement: "meta-purple-500",
  },
  "data-surface-5-subtle": {
    ref: "green-200",
    raw: "rgba(153, 222, 173, 1)",
    replacement: "success-300",
  },
  "data-surface-5": {
    ref: "green-400",
    raw: "rgba(42, 167, 88, 1)",
    replacement: "success-500",
  },
  "data-surface-4-subtle": {
    ref: "lightblue-500",
    raw: "rgba(102, 203, 236, 1)",
    replacement: "",
    comment: "Lightblue is now info and brand-blue color.",
  },
  "data-surface-4": {
    ref: "lightblue-700",
    raw: "rgba(54, 141, 168, 1)",
    replacement: "",
    comment: "Lightblue is now info and brand-blue color.",
  },
  "data-surface-3-subtle": {
    ref: "orange-300",
    raw: "rgba(255, 193, 102, 1)",
    replacement: "warning-400",
  },
  "data-surface-3": {
    ref: "orange-600",
    raw: "rgba(199, 115, 0, 1)",
    replacement: "warning-700",
  },
  "data-surface-2-subtle": {
    ref: "deepblue-200",
    raw: "rgba(153, 196, 221, 1)",
    replacement: "brand-blue-300",
  },
  "data-surface-2": {
    ref: "deepblue-500",
    raw: "rgba(0, 91, 130, 1)",
    replacement: "brand-blue-600",
  },
  "data-surface-1-subtle": {
    ref: "blue-100",
    raw: "rgba(204, 225, 255, 1)",
    replacement: "accent-200",
  },
  "data-surface-1": {
    ref: "blue-400",
    raw: "rgba(51, 134, 224, 1)",
    replacement: "accent-500",
  },
  "text-on-alt-3": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-brand-blue-contrast",
  },
  "text-on-alt-2": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-meta-lime-contrast",
  },
  "text-on-alt-1": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-meta-purple-contrast",
  },
  "text-on-info": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-info-contrast",
  },
  "text-on-warning": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-warning-contrast",
  },
  "text-on-danger": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-danger-contrast",
  },
  "text-on-success": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-success-contrast",
  },
  "text-on-action": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-accent-contrast",
  },
  "text-on-neutral": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-neutral-contrast",
  },
  "text-on-inverted": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-neutral-contrast",
  },
  "text-action": {
    ref: "blue-500",
    raw: "rgba(0, 103, 197, 1)",
    replacement: "text-accent-subtle",
  },
  "text-action-on-action-subtle": {
    ref: "blue-600",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "text-accent-subtle",
  },
  "text-action-hover": {
    ref: "blue-600",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "text-accent-subtle",
  },
  "text-action-selected": {
    ref: "blue-700",
    raw: "rgba(0, 69, 156, 1)",
    replacement: "text-accent-subtle",
  },
  "text-danger": {
    ref: "red-500",
    raw: "rgba(195, 0, 0, 1)",
    replacement: "text-danger-subtle",
  },
  "text-visited": {
    ref: "purple-500",
    raw: "rgba(99, 70, 137, 1)",
    replacement: "text-meta-purple-subtle",
  },
  "text-subtle": {
    ref: "grayalpha-700",
    raw: "rgba(1, 11, 24, 0.68)",
    replacement: "text-neutral-subtle",
  },
  "text-default": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-neutral",
  },
  "surface-alt-3": {
    ref: "deepblue-500",
    raw: "rgba(0, 91, 130, 1)",
    replacement: "bg-brand-blue-strong",
  },
  "surface-alt-3-strong": {
    ref: "deepblue-800",
    raw: "rgba(0, 52, 83, 1)",
    replacement: "",
    comment: "Use 'bg-brand-blue-moderate' in theme 'dark'-mode.",
  },
  "surface-alt-3-moderate": {
    ref: "deepblue-200",
    raw: "rgba(153, 196, 221, 1)",
    replacement: "bg-brand-blue-moderate",
  },
  "surface-alt-3-subtle": {
    ref: "deepblue-100",
    raw: "rgba(204, 226, 240, 1)",
    replacement: "bg-brand-blue-soft",
  },
  "surface-alt-2": {
    ref: "limegreen-400",
    raw: "rgba(193, 203, 51, 1)",
    replacement: "bg-meta-lime-strong",
  },
  "surface-alt-2-moderate": {
    ref: "limegreen-200",
    raw: "rgba(236, 243, 153, 1)",
    replacement: "bg-meta-lime-moderate",
  },
  "surface-alt-2-subtle": {
    ref: "limegreen-100",
    raw: "rgba(249, 252, 204, 1)",
    replacement: "bg-meta-lime-soft",
  },
  "surface-alt-1": {
    ref: "purple-400",
    raw: "rgba(130, 105, 162, 1)",
    replacement: "bg-meta-purple-strong",
  },
  "surface-alt-1-moderate": {
    ref: "purple-200",
    raw: "rgba(192, 178, 210, 1)",
    replacement: "bg-meta-purple-moderate",
  },
  "surface-alt-1-subtle": {
    ref: "purple-100",
    raw: "rgba(224, 216, 233, 1)",
    replacement: "bg-meta-purple-soft",
  },
  "surface-info": {
    ref: "lightblue-500",
    raw: "rgba(102, 203, 236, 1)",
    replacement: "bg-info-strong",
  },
  "surface-info-moderate": {
    ref: "lightblue-200",
    raw: "rgba(181, 241, 255, 1)",
    replacement: "bg-info-moderate",
  },
  "surface-info-subtle": {
    ref: "lightblue-100",
    raw: "rgba(216, 249, 255, 1)",
    replacement: "bg-info-soft",
  },
  "surface-warning": {
    ref: "orange-500",
    raw: "rgba(255, 145, 0, 1)",
    replacement: "bg-warning-strong",
  },
  "surface-warning-moderate": {
    ref: "orange-200",
    raw: "rgba(255, 215, 153, 1)",
    replacement: "bg-warning-moderate",
  },
  "surface-warning-subtle": {
    ref: "orange-100",
    raw: "rgba(255, 236, 204, 1)",
    replacement: "bg-warning-soft",
  },
  "surface-danger": {
    ref: "red-500",
    raw: "rgba(195, 0, 0, 1)",
    replacement: "bg-danger-strong",
  },
  "surface-danger-moderate": {
    ref: "red-200",
    raw: "rgba(246, 130, 130, 1)",
    replacement: "bg-danger-moderate",
  },
  "surface-danger-subtle": {
    ref: "red-100",
    raw: "rgba(255, 194, 194, 1)",
    replacement: "bg-danger-soft",
  },
  "surface-success": {
    ref: "green-500",
    raw: "rgba(6, 137, 58, 1)",
    replacement: "bg-success-strong",
  },
  "surface-success-moderate": {
    ref: "green-200",
    raw: "rgba(153, 222, 173, 1)",
    replacement: "bg-success-moderate",
  },
  "surface-success-subtle": {
    ref: "green-100",
    raw: "rgba(204, 241, 214, 1)",
    replacement: "bg-success-soft",
  },
  "surface-neutral": {
    ref: "gray-700",
    raw: "rgba(82, 89, 98, 1)",
    replacement: "bg-neutral-strong",
  },
  "surface-neutral-selected": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "bg-neutral-strong-pressed",
  },
  "surface-neutral-moderate": {
    ref: "grayalpha-200",
    raw: "rgba(17, 41, 64, 0.13)",
    replacement: "bg-neutral-moderate",
  },
  "surface-neutral-subtle": {
    ref: "grayalpha-100",
    raw: "rgba(18, 43, 68, 0.08)",
    replacement: "bg-neutral-soft",
  },
  "surface-action": {
    ref: "blue-500",
    raw: "rgba(0, 103, 197, 1)",
    replacement: "bg-accent-strong",
  },
  "surface-action-selected": {
    ref: "blue-700",
    raw: "rgba(0, 69, 156, 1)",
    replacement: "bg-accent-strong-pressed",
  },
  "surface-action-subtle": {
    ref: "blue-50",
    raw: "rgba(230, 240, 255, 1)",
    replacement: "bg-accent-soft",
  },
  "surface-inverted": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    comment: "Use 'bg-default' or 'bg-raised' in theme 'dark'-mode.",
    replacement: "",
  },
  "surface-backdrop": {
    ref: "grayalpha-500",
    raw: "rgba(2, 20, 49, 0.49)",
    replacement: "bg-overlay",
  },
  "surface-transparent": {
    ref: "transparent",
    raw: "rgba(255, 255, 255, 0)",
    comment: "Can use regular 'transparent' CSS color.",
    replacement: "",
  },
  "surface-subtle": {
    ref: "gray-50",
    raw: "rgba(242, 243, 245, 1)",
    replacement: "bg-neutral-soft",
  },
  "surface-selected": {
    ref: "blue-50",
    raw: "rgba(230, 240, 255, 1)",
    replacement: "bg-accent-soft",
  },
  "surface-default": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "bg-default",
  },
  "surface-info-subtle-hover": {
    ref: "lightblue-200",
    raw: "rgba(181, 241, 255, 1)",
    replacement: "bg-info-moderate-hover",
  },
  "surface-warning-subtle-hover": {
    ref: "orange-200",
    raw: "rgba(255, 215, 153, 1)",
    replacement: "bg-warning-moderate-hover",
  },
  "surface-danger-active": {
    ref: "red-700",
    raw: "rgba(140, 0, 0, 1)",
    replacement: "bg-danger-strong-pressed",
  },
  "surface-danger-hover": {
    ref: "red-600",
    raw: "rgba(173, 0, 0, 1)",
    replacement: "bg-danger-strong-hover",
  },
  "surface-danger-subtle-hover": {
    ref: "red-200",
    raw: "rgba(246, 130, 130, 1)",
    replacement: "bg-danger-moderate-hover",
  },
  "surface-success-hover": {
    ref: "green-600",
    raw: "rgba(0, 124, 46, 1)",
    replacement: "bg-success-strong-hover",
  },
  "surface-success-subtle-hover": {
    ref: "green-200",
    raw: "rgba(153, 222, 173, 1)",
    replacement: "bg-success-moderate-hover",
  },
  "surface-neutral-hover": {
    ref: "gray-800",
    raw: "rgba(66, 71, 79, 1)",
    replacement: "bg-neutral-strong-hover",
  },
  "surface-neutral-active": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "bg-neutral-strong-pressed",
  },
  "surface-neutral-subtle-hover": {
    ref: "grayalpha-200",
    raw: "rgba(17, 41, 64, 0.13)",
    replacement: "bg-neutral-moderate-hover",
  },
  "surface-action-selected-hover": {
    ref: "blue-800",
    raw: "rgba(0, 52, 125, 1)",
    replacement: "bg-accent-strong-hover",
  },
  "surface-action-active": {
    ref: "blue-700",
    raw: "rgba(0, 69, 156, 1)",
    replacement: "bg-accent-strong-pressed",
  },
  "surface-action-hover": {
    ref: "blue-600",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "bg-accent-strong-hover",
  },
  "surface-action-subtle-hover": {
    ref: "blue-100",
    raw: "rgba(204, 225, 255, 1)",
    replacement: "bg-accent-moderate-hover",
  },
  "surface-inverted-active": {
    ref: "gray-700",
    raw: "rgba(82, 89, 98, 1)",
    comment: "Use 'bg-neutral-strong-pressed' for similar color.",
    replacement: "",
  },
  "surface-inverted-hover": {
    ref: "gray-800",
    raw: "rgba(66, 71, 79, 1)",
    comment: "Use 'bg-neutral-moderate-hover' in theme 'dark'-mode.",
    replacement: "",
  },
  "surface-active": {
    ref: "grayalpha-200",
    raw: "rgba(17, 41, 64, 0.13)",
    replacement: "bg-neutral-moderate-pressedA",
  },
  "surface-hover": {
    ref: "grayalpha-100",
    raw: "rgba(18, 43, 68, 0.08)",
    replacement: "bg-neutral-moderate-hoverA",
  },
  "icon-on-info": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-info-contrast",
  },
  "icon-on-warning": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-warning-contrast",
  },
  "icon-on-danger": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-danger-contrast",
  },
  "icon-on-success": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-success-contrast",
  },
  "icon-on-action": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-accent-contrast",
  },
  "icon-on-inverted": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-neutral-contrast",
  },
  "icon-on-neutral": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "text-neutral-contrast",
  },
  "icon-alt-3": {
    ref: "deepblue-500",
    raw: "rgba(0, 91, 130, 1)",
    replacement: "text-brand-blue-decoration",
  },
  "icon-alt-2": {
    ref: "limegreen-700",
    raw: "rgba(127, 137, 0, 1)",
    replacement: "text-meta-lime-decoration",
  },
  "icon-alt-1": {
    ref: "purple-500",
    raw: "rgba(99, 70, 137, 1)",
    replacement: "text-meta-purple-decoration",
  },
  "icon-info": {
    ref: "lightblue-800",
    raw: "rgba(35, 107, 125, 1)",
    replacement: "text-info-decoration",
  },
  "icon-warning": {
    ref: "orange-600",
    raw: "rgba(199, 115, 0, 1)",
    replacement: "text-warning-decoration",
  },
  "icon-danger": {
    ref: "red-500",
    raw: "rgba(195, 0, 0, 1)",
    replacement: "text-danger-decoration",
  },
  "icon-success": {
    ref: "green-500",
    raw: "rgba(6, 137, 58, 1)",
    replacement: "text-success-decoration",
  },
  "icon-action": {
    ref: "blue-500",
    raw: "rgba(0, 103, 197, 1)",
    replacement: "text-accent-decoration",
  },
  "icon-action-on-action-subtle": {
    ref: "blue-600",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "text-accent-subtle",
  },
  "icon-action-hover": {
    ref: "blue-600",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "text-accent-subtle",
  },
  "icon-action-selected": {
    ref: "blue-700",
    raw: "rgba(0, 69, 156, 1)",
    replacement: "text-accent-subtle",
  },
  "icon-subtle": {
    ref: "grayalpha-700",
    raw: "rgba(1, 11, 24, 0.68)",
    replacement: "text-neutral-subtle",
  },
  "icon-default": {
    ref: "gray-900",
    raw: "rgba(35, 38, 42, 1)",
    replacement: "text-neutral",
  },
  "border-alt-3": {
    ref: "deepblue-500",
    raw: "rgba(0, 91, 130, 1)",
    replacement: "border-brand-blue",
  },
  "border-alt-2": {
    ref: "limegreen-700",
    raw: "rgba(127, 137, 0, 1)",
    replacement: "border-meta-lime",
  },
  "border-alt-1": {
    ref: "purple-400",
    raw: "rgba(130, 105, 162, 1)",
    replacement: "border-meta-purple",
  },
  "border-on-inverted-subtle": {
    ref: "gray-700",
    raw: "rgba(82, 89, 98, 1)",
    comment: "Use 'border-neutral-subtle' in theme 'dark'-mode.",
    replacement: "",
  },
  "border-on-inverted": {
    ref: "gray-200",
    raw: "rgba(224, 227, 230, 1)",
    comment: "Use 'border-neutral' in theme 'dark'-mode.",
    replacement: "",
  },
  "border-focus": {
    ref: "blue-800",
    raw: "rgba(0, 52, 125, 1)",
    replacement: "border-focus",
  },
  "border-focus-on-inverted": {
    ref: "blue-200",
    raw: "rgba(153, 195, 255, 1)",
    comment: "Use 'border-focus' in theme 'dark'-mode.",
    replacement: "",
  },
  "border-info": {
    ref: "lightblue-700",
    raw: "rgba(54, 141, 168, 1)",
    replacement: "border-info",
  },
  "border-warning": {
    ref: "orange-600",
    raw: "rgba(199, 115, 0, 1)",
    replacement: "border-warning",
  },
  "border-danger": {
    ref: "red-500",
    raw: "rgba(195, 0, 0, 1)",
    replacement: "border-danger",
  },
  "border-success": {
    ref: "green-500",
    raw: "rgba(6, 137, 58, 1)",
    replacement: "border-success",
  },
  "border-selected": {
    ref: "blue-500",
    raw: "rgba(0, 103, 197, 1)",
    replacement: "border-accent",
  },
  "border-action": {
    ref: "blue-500",
    raw: "rgba(0, 103, 197, 1)",
    replacement: "border-accent",
  },
  "border-action-hover": {
    ref: "blue-600",
    raw: "rgba(0, 86, 180, 1)",
    replacement: "border-accent",
  },
  "border-action-selected": {
    ref: "blue-700",
    raw: "rgba(0, 69, 156, 1)",
    replacement: "border-accent-strong",
  },
  "border-subtle": {
    ref: "grayalpha-300",
    raw: "rgba(7, 26, 54, 0.21)",
    replacement: "border-neutral-subtle",
  },
  "border-divider": {
    ref: "grayalpha-300",
    raw: "rgba(7, 26, 54, 0.21)",
    replacement: "border-neutral-subtle",
  },
  "border-strong": {
    ref: "grayalpha-700",
    raw: "rgba(1, 11, 24, 0.68)",
    replacement: "border-neutral-strong",
  },
  "border-default": {
    ref: "grayalpha-500",
    raw: "rgba(2, 20, 49, 0.49)",
    replacement: "border-neutral",
  },
  "border-subtle-hover": {
    ref: "grayalpha-400",
    raw: "rgba(5, 23, 51, 0.34)",
    replacement: "border-neutral",
  },
  "bg-subtle": {
    ref: "gray-100",
    raw: "rgba(236, 238, 240, 1)",
    replacement: "bg-neutral-soft",
  },
  "bg-default": {
    ref: "white",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "bg-default",
  },
  "nav-red": {
    ref: "",
    raw: "rgba(195, 0, 0, 1)",
    replacement: "text-logo",
  },
  white: {
    ref: "",
    raw: "rgba(255, 255, 255, 1)",
    replacement: "",
    comment: "Use 'white' CSS color.",
  },
  transparent: {
    ref: "",
    raw: "rgba(255, 255, 255, 0)",
    comment: "Use 'transparent' CSS color.",
    replacement: "",
  },
} satisfies {
  [key: string]: ColorObjType;
};

type ColorObjWithTwType = ColorObjType & {
  twOld: string;
  twNew: string;
};

const colorWithTailwindConversion = Object.entries(colors).reduce<
  Record<string, ColorObjWithTwType>
>((acc, [key, value]) => {
  const twOld = generateBgTwTags(key);
  const twNew =
    value.replacement.length > 0
      ? generateBgTwTags(value.replacement, true)
      : undefined;

  acc[key] = {
    ...value,
    twOld,
    twNew,
  };

  return acc;
}, {});

type LegacyTokenConfig = {
  ref: string;
  raw: `${string}rem` | `${string}px` | `${string} ${string}` | `${number}`; // Disallows empty string
  replacement: string;
  comment?: string;
  twOld?: string;
  twNew?: string;
  regexes: ReturnType<typeof getFrameworkRegexes>;
};

const tokensWithoutRegex: Record<string, Omit<LegacyTokenConfig, "regexes">> = {
  ...colorWithTailwindConversion,
  "space-128": { ref: "", replacement: "space-128", raw: "8rem" },
  "space-96": { ref: "", replacement: "space-96", raw: "6rem" },
  "space-80": { ref: "", replacement: "space-80", raw: "5rem" },
  "space-72": { ref: "", replacement: "space-72", raw: "4.5rem" },
  "space-64": { ref: "", replacement: "space-64", raw: "4rem" },
  "space-56": { ref: "", replacement: "space-56", raw: "3.5rem" },
  "space-48": { ref: "", replacement: "space-48", raw: "3rem" },
  "space-44": { ref: "", replacement: "space-44", raw: "2.75rem" },
  "space-40": { ref: "", replacement: "space-40", raw: "2.5rem" },
  "space-36": { ref: "", replacement: "space-36", raw: "2.25rem" },
  "space-32": { ref: "", replacement: "space-32", raw: "2rem" },
  "space-28": { ref: "", replacement: "space-28", raw: "1.75rem" },
  "space-24": { ref: "", replacement: "space-24", raw: "1.5rem" },
  "space-20": { ref: "", replacement: "space-20", raw: "1.25rem" },
  "space-16": { ref: "", replacement: "space-16", raw: "1rem" },
  "space-12": { ref: "", replacement: "space-12", raw: ".75rem" },
  "space-8": { ref: "", replacement: "space-8", raw: ".5rem" },
  "space-6": { ref: "", replacement: "space-6", raw: ".375rem" },
  "space-4": { ref: "", replacement: "space-4", raw: ".25rem" },
  "space-2": { ref: "", replacement: "space-2", raw: ".125rem" },
  "space-1": { ref: "", replacement: "space-1", raw: ".0625rem" },
  "space-0": { ref: "", replacement: "space-0", raw: "0rem" },
  "spacing-1-alt": {
    ref: "",
    raw: "0.375rem",
    replacement: "space-6",
  },
  "spacing-05": {
    ref: "",
    raw: "0.125rem",
    replacement: "space-2",
  },
  "spacing-32": {
    ref: "",
    raw: "8rem",
    replacement: "space-128",
  },
  "spacing-24": {
    ref: "",
    raw: "6rem",
    replacement: "space-96",
  },
  "spacing-20": {
    ref: "",
    raw: "5rem",
    replacement: "space-80",
  },
  "spacing-18": {
    ref: "",
    raw: "4.5rem",
    replacement: "space-72",
  },
  "spacing-16": {
    ref: "",
    raw: "4rem",
    replacement: "space-64",
  },
  "spacing-14": {
    ref: "",
    raw: "3.5rem",
    replacement: "space-56",
  },
  "spacing-12": {
    ref: "",
    raw: "3rem",
    replacement: "space-48",
  },
  "spacing-11": {
    ref: "",
    raw: "2.75rem",
    replacement: "space-44",
  },
  "spacing-10": {
    ref: "",
    raw: "2.5rem",
    replacement: "space-40",
  },
  "spacing-9": {
    ref: "",
    raw: "2.25rem",
    replacement: "space-36",
  },
  "spacing-8": {
    ref: "",
    raw: "2rem",
    replacement: "space-32",
  },
  "spacing-7": {
    ref: "",
    raw: "1.75rem",
    replacement: "space-28",
  },
  "spacing-6": {
    ref: "",
    raw: "1.5rem",
    replacement: "space-24",
  },
  "spacing-5": {
    ref: "",
    raw: "1.25rem",
    replacement: "space-20",
  },
  "spacing-4": {
    ref: "",
    raw: "1rem",
    replacement: "space-16",
  },
  "spacing-3": {
    ref: "",
    raw: "0.75rem",
    replacement: "space-12",
  },
  "spacing-2": {
    ref: "",
    raw: "0.5rem",
    replacement: "space-8",
  },
  "spacing-1": {
    ref: "",
    raw: "0.25rem",
    replacement: "space-4",
  },
  "spacing-0": {
    ref: "",
    raw: "0",
    replacement: "space-0",
  },
  "shadow-xlarge": {
    ref: "",
    raw: "0px 2px 5px 0px rgba(0, 0, 0, 0.15), 0px 10px 24px 0px rgba(0, 0, 0, 0.18), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)",
    replacement: "shadow-dialog",
    twOld: "shadow-xlarge",
  },
  "shadow-large": {
    ref: "",
    raw: "0px 2px 5px 0px rgba(0, 0, 0, 0.15), 0px 10px 16px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.12)",
    replacement: "",
    twOld: "shadow-large",
    comment:
      "New design-language has removed use of shadows besides on dialog, modal or popup elements where `shadow-dialog` is used.",
  },
  "shadow-medium": {
    ref: "",
    raw: "0px 5px 12px 0px rgba(0, 0, 0, 0.13), 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 0px 1px 0px rgba(0, 0, 0, 0.15)",
    replacement: "",
    twOld: "shadow-medium",
    comment:
      "New design-language has removed use of shadows besides on dialog, modal or popup elements where `shadow-dialog` is used.",
  },
  "shadow-small": {
    ref: "",
    raw: "0px 3px 8px 0px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 0px 1px 0px rgba(0, 0, 0, 0.18)",
    replacement: "",
    twOld: "shadow-small",
    comment:
      "New design-language has removed use of shadows besides on dialog, modal or popup elements where `shadow-dialog` is used.",
  },
  "shadow-xsmall": {
    ref: "",
    raw: "0px 1px 3px 0px rgba(0, 0, 0, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.20)",
    replacement: "",
    twOld: "shadow-xsmall",
    comment:
      "New design-language has removed use of shadows besides on dialog, modal or popup elements where `shadow-dialog` is used.",
  },
  "shadow-focus-inverted": {
    ref: "",
    raw: "0 0 0 3px rgba(153, 195, 255, 1)",
    replacement: "",
    twOld: "shadow-focus-inverted",
    comment: "This is now handled by light/dark theme.",
  },
  "shadow-focus": {
    ref: "",
    raw: "0 0 0 3px rgba(0, 52, 125, 1)",
    replacement: "",
    twOld: "shadow-focus",
    comment:
      "We now use `outline: 3px solid var(--ax-border-focus)` + `outline-offset: 3px`",
  },
  "border-radius-full": {
    ref: "",
    raw: "9999px",
    replacement: "radius-full",
    twOld: generateRoundedTwTags("full"),
    twNew: generateRoundedTwTags("full"),
  },
  "border-radius-xlarge": {
    ref: "",
    raw: "12px",
    replacement: "radius-12",
    twOld: generateRoundedTwTags("xlarge"),
    twNew: generateRoundedTwTags("xl"),
  },
  "border-radius-large": {
    ref: "",
    raw: "8px",
    replacement: "radius-8",
    twOld: generateRoundedTwTags("large"),
    twNew: generateRoundedTwTags("lg"),
  },
  "border-radius-medium": {
    ref: "",
    raw: "4px",
    replacement: "radius-4",
    twOld: generateRoundedTwTags("medium"),
    twNew: generateRoundedTwTags("sm"),
  },
  "border-radius-small": {
    ref: "",
    raw: "2px",
    replacement: "radius-2",
    twOld: generateRoundedTwTags("small"),
    twNew: generateRoundedTwTags("xs"),
  },
  "radius-full": {
    ref: "",
    raw: "9999px",
    replacement: "radius-full",
  },
  "radius-12": {
    ref: "",
    raw: "12px",
    replacement: "radius-12",
  },
  "radius-8": {
    ref: "",
    raw: "8px",
    replacement: "radius-8",
  },
  "radius-4": {
    ref: "",
    raw: "4px",
    replacement: "radius-4",
  },
  "radius-2": {
    ref: "",
    raw: "2px",
    replacement: "radius-2",
  },
  "z-index-tooltip": {
    ref: "",
    raw: "3000",
    replacement: "",
    comment: "Use `z-index: 3000` as replacement",
    twOld: "z-tooltip",
    twNew: "z-[3000]",
  },
  "z-index-focus": {
    ref: "",
    raw: "10",
    comment: "Use `z-index: 10` as replacement",
    replacement: "",
    twOld: "z-focus",
    twNew: "z-[10]",
  },
  "z-index-popover": {
    ref: "",
    raw: "1000",
    comment: "Use `z-index: 1000` as replacement",
    replacement: "",
    twOld: "z-popover",
    twNew: "z-[1000]",
  },
  "font-weight-regular": {
    ref: "",
    raw: "400",
    replacement: "font-weight-regular",
    twOld: "font-regular",
    twNew: "font-ax-regular",
  },
  "font-weight-bold": {
    ref: "",
    raw: "600",
    replacement: "font-weight-bold",
    twOld: "font-bold",
    twNew: "font-ax-bold",
  },
  "font-size-small": {
    ref: "",
    raw: "0.875rem",
    replacement: "font-size-small",
    twOld: "text-small",
    twNew: "text-ax-small",
  },
  "font-size-medium": {
    ref: "",
    raw: "1rem",
    replacement: "font-size-medium",
    twOld: "text-medium",
    twNew: "text-ax-medium",
  },
  "font-size-large": {
    ref: "",
    raw: "1.125rem",
    replacement: "font-size-large",
    twOld: "text-large",
    twNew: "text-ax-large",
  },
  "font-size-xlarge": {
    ref: "",
    raw: "1.25rem",
    replacement: "font-size-xlarge",
    twOld: "text-xlarge",
    twNew: "text-ax-xlarge",
  },
  "font-size-heading-xsmall": {
    ref: "",
    raw: "1.125rem",
    replacement: "font-size-heading-xsmall",
    twOld: "text-xsmall",
    twNew: "text-ax-xsmall",
  },
  "font-size-heading-small": {
    ref: "",
    raw: "1.25rem",
    replacement: "font-size-heading-small",
    twOld: "text-heading-small",
    twNew: "text-ax-heading-small",
  },
  "font-size-heading-medium": {
    ref: "",
    raw: "1.5rem",
    replacement: "font-size-heading-medium",
    twOld: "text-heading-medium",
    twNew: "text-ax-heading-medium",
  },
  "font-size-heading-large": {
    ref: "",
    raw: "1.75rem",
    replacement: "font-size-heading-large",
    twOld: "text-heading-large",
    twNew: "text-ax-heading-large",
  },
  "font-size-heading-xlarge": {
    ref: "",
    raw: "2rem",
    replacement: "font-size-heading-xlarge",
    twOld: "text-heading-xlarge",
    twNew: "text-ax-heading-xlarge",
  },
  "font-size-heading-2xlarge": {
    ref: "",
    raw: "2.5rem",
    replacement: "font-size-heading-2xlarge",
    twOld: "text-heading-2xlarge",
    twNew: "text-ax-heading-2xlarge",
  },
  "font-line-height-medium": {
    ref: "",
    raw: "1.25rem",
    replacement: "font-line-height-medium",
    twOld: "leading-medium",
    twNew: "leading-ax-medium",
  },
  "font-line-height-large": {
    ref: "",
    raw: "1.5rem",
    replacement: "font-line-height-large",
    twOld: "leading-large",
    twNew: "leading-ax-large",
  },
  "font-line-height-xlarge": {
    ref: "",
    raw: "1.75rem",
    replacement: "font-line-height-xlarge",
    twOld: "leading-xlarge",
    twNew: "leading-ax-xlarge",
  },
  "font-line-height-heading-xsmall": {
    ref: "",
    raw: "1.5rem",
    replacement: "font-line-height-heading-xsmall",
    twOld: "leading-heading-xsmall",
    twNew: "leading-ax-heading-xsmall",
  },
  "font-line-height-heading-small": {
    ref: "",
    raw: "1.75rem",
    replacement: "font-line-height-heading-small",
    twOld: "leading-heading-small",
    twNew: "leading-ax-heading-small",
  },
  "font-line-height-heading-medium": {
    ref: "",
    raw: "2rem",
    replacement: "font-line-height-heading-medium",
    twOld: "leading-heading-medium",
    twNew: "leading-ax-heading-medium",
  },
  "font-line-height-heading-large": {
    ref: "",
    raw: "2.25rem",
    replacement: "font-line-height-heading-large",
    twOld: "leading-heading-large",
    twNew: "leading-ax-heading-large",
  },
  "font-line-height-heading-xlarge": {
    ref: "",
    raw: "2.5rem",
    replacement: "font-line-height-heading-xlarge",
    twOld: "leading-heading-xlarge",
    twNew: "leading-ax-heading-xlarge",
  },
  "font-line-height-heading-2xlarge": {
    ref: "",
    raw: "3.25rem",
    replacement: "font-line-height-heading-2xlarge",
    twOld: "leading-heading-2xlarge",
    twNew: "leading-ax-heading-2xlarge",
  },
  "font-family": {
    ref: "",
    raw: "'Source Sans 3', 'Source Sans Pro', Arial, sans-serif",
    replacement: "font-family",
    twOld: "font-font-family",
    twNew: "font-ax-font-family",
  },
  "text-width-max": {
    ref: "",
    raw: "576px",
    replacement: "",
    comment: "Use `max-width: 576px` as replacement",
    twOld: "max-w-text",
  },
  "breakpoint-2xl-down": {
    ref: "",
    raw: "1439px",
    replacement: "breakpoint-2xl-down",
  },
  "breakpoint-2xl": {
    ref: "",
    raw: "1440px",
    replacement: "breakpoint-2xl",
    twOld: "2xl",
    twNew: "ax-2xl",
  },
  "breakpoint-xl-down": {
    ref: "",
    raw: "1279px",
    replacement: "breakpoint-xl-down",
  },
  "breakpoint-xl": {
    ref: "",
    raw: "1280px",
    replacement: "breakpoint-xl",
    twOld: "xl",
    twNew: "ax-xl",
  },
  "breakpoint-lg-down": {
    ref: "",
    raw: "1023px",
    replacement: "breakpoint-lg-down",
  },
  "breakpoint-lg": {
    ref: "",
    raw: "1024px",
    replacement: "breakpoint-lg",
    twOld: "lg",
    twNew: "ax-lg",
  },
  "breakpoint-md-down": {
    ref: "",
    raw: "767px",
    replacement: "breakpoint-md-down",
  },
  "breakpoint-md": {
    ref: "",
    raw: "768px",
    replacement: "breakpoint-md",
    twOld: "md",
    twNew: "ax-md",
  },
  "breakpoint-sm-down": {
    ref: "",
    raw: "479px",
    replacement: "breakpoint-sm-down",
  },
  "breakpoint-sm": {
    ref: "",
    raw: "480px",
    replacement: "breakpoint-sm",
    twOld: "sm",
    twNew: "ax-sm",
  },
  "breakpoint-xs": {
    ref: "",
    raw: "0",
    replacement: "breakpoint-xs",
  },
};

const legacyTokenConfig = Object.entries(tokensWithoutRegex).reduce<
  Record<string, LegacyTokenConfig>
>((acc, [key, value]) => {
  acc[key] = {
    ...value,
    regexes: getFrameworkRegexes({
      legacy: true,
      token: `--a-${key}`,
      twString: value.twOld,
    }),
  };

  return acc;
}, {});

export { legacyTokenConfig };
export type { LegacyTokenConfig };

const legacyComponentTokenList = [
  "--ac-alert-error-border",
  "--ac-alert-error-bg",
  "--ac-alert-icon-error-color",
  "--ac-alert-warning-border",
  "--ac-alert-warning-bg",
  "--ac-alert-icon-warning-color",
  "--ac-alert-info-border",
  "--ac-alert-info-bg",
  "--ac-alert-icon-info-color",
  "--ac-alert-success-border",
  "--ac-alert-success-bg",
  "--ac-alert-icon-success-color",
  "--ac-accordion-header-bg",
  "--ac-accordion-header-bg-hover",
  "--ac-accordion-header-text-hover",
  "--ac-accordion-header-border",
  "--ac-accordion-item-bg-open",
  "--ac-accordion-neutral-item-bg-open",
  "--ac-accordion-header-icon-bg-hover",
  "--ac-button-border-radius",
  "--ac-button-padding",
  "--ac-button-padding-small",
  "--ac-button-padding-xsmall",
  "--ac-button-padding-icon-only",
  "--ac-button-padding-icon-only-small",
  "--ac-button-padding-icon-only-xsmall",
  "--ac-button-primary-bg",
  "--ac-button-primary-text",
  "--ac-button-primary-hover-bg",
  "--ac-button-primary-active-bg",
  "--ac-button-primary-focus-border",
  "--ac-button-secondary-text",
  "--ac-button-secondary-bg",
  "--ac-button-secondary-border",
  "--ac-button-secondary-hover-text",
  "--ac-button-secondary-hover-bg",
  "--ac-button-secondary-hover-border",
  "--ac-button-secondary-focus-border",
  "--ac-button-secondary-active-text",
  "--ac-button-secondary-active-bg",
  "--ac-button-secondary-active-focus-border",
  "--ac-button-tertiary-text",
  "--ac-button-tertiary-bg",
  "--ac-button-tertiary-hover-text",
  "--ac-button-tertiary-hover-bg",
  "--ac-button-tertiary-focus-border",
  "--ac-button-tertiary-active-text",
  "--ac-button-tertiary-active-bg",
  "--ac-button-tertiary-active-hover-bg",
  "--ac-button-danger-bg",
  "--ac-button-danger-text",
  "--ac-button-danger-hover-bg",
  "--ac-button-danger-active-bg",
  "--ac-button-loader-stroke",
  "--ac-button-primary-loader-stroke-bg",
  "--ac-button-primary-neutral-bg",
  "--ac-button-primary-neutral-text",
  "--ac-button-primary-neutral-hover-bg",
  "--ac-button-primary-neutral-active-bg",
  "--ac-button-primary-neutral-focus-border",
  "--ac-button-secondary-neutral-text",
  "--ac-button-secondary-neutral-bg",
  "--ac-button-secondary-neutral-border",
  "--ac-button-secondary-neutral-hover-bg",
  "--ac-button-secondary-neutral-focus-border",
  "--ac-button-secondary-neutral-active-text",
  "--ac-button-secondary-neutral-active-bg",
  "--ac-button-secondary-neutral-active-focus-border",
  "--ac-button-tertiary-neutral-text",
  "--ac-button-tertiary-neutral-hover-text",
  "--ac-button-tertiary-neutral-hover-bg",
  "--ac-button-tertiary-neutral-focus-border",
  "--ac-button-tertiary-neutral-active-text",
  "--ac-button-tertiary-neutral-active-bg",
  "--ac-button-tertiary-neutral-active-hover-bg",
  "--ac-chat-avatar-bg",
  "--ac-chat-avatar-color",
  "--ac-chat-bubble-bg",
  "--ac-chat-top-text",
  "--ac-chip-toggle-border",
  "--ac-chip-toggle-bg",
  "--ac-chip-toggle-text",
  "--ac-chip-toggle-hover-border",
  "--ac-chip-toggle-hover-bg",
  "--ac-chip-toggle-pressed-bg",
  "--ac-chip-toggle-pressed-text",
  "--ac-chip-toggle-pressed-hover-bg",
  "--ac-chip-toggle-neutral-border",
  "--ac-chip-toggle-neutral-bg",
  "--ac-chip-toggle-neutral-text",
  "--ac-chip-toggle-neutral-hover-border",
  "--ac-chip-toggle-neutral-hover-bg",
  "--ac-chip-toggle-neutral-pressed-bg",
  "--ac-chip-toggle-neutral-pressed-text",
  "--ac-chip-toggle-neutral-pressed-hover-bg",
  "--ac-chip-toggle-circle-border",
  "--ac-chip-toggle-focus",
  "--ac-chip-removable-action-bg",
  "--ac-chip-removable-action-text",
  "--ac-chip-removable-neutral-bg",
  "--ac-chip-removable-neutral-text",
  "--ac-chip-removable-neutral-border",
  "--ac-chip-removable-action-hover-bg",
  "--ac-chip-removable-neutral-hover-bg",
  "--ac-chip-removable-neutral-hover-border",
  "--ac-copybutton-border-radius",
  "--ac-copybutton-action-text",
  "--ac-copybutton-action-bg",
  "--ac-copybutton-action-hover-text",
  "--ac-copybutton-action-hover-bg",
  "--ac-copybutton-action-active-text",
  "--ac-copybutton-neutral-text",
  "--ac-copybutton-neutral-bg",
  "--ac-copybutton-neutral-hover-text",
  "--ac-copybutton-neutral-hover-bg",
  "--ac-copybutton-neutral-active-text",
  "--ac-copybutton-animation",
  "--ac-date-middle-text",
  "--ac-date-middle-bg",
  "--ac-date-week-text",
  "--ac-date-week-bg",
  "--ac-date-selected-text",
  "--ac-date-selected-bg",
  "--ac-date-disabled-bg",
  "--ac-date-disabled-text",
  "--ac-date-hover-bg",
  "--ac-date-today-border",
  "--ac-date-caption-text",
  "--ac-date-input-error-border",
  "--ac-date-input-button-text",
  "--ac-date-input-button-hover-text",
  "--ac-date-input-button-hover-bg",
  "--ac-expansioncard-bg",
  "--ac-expansioncard-header-bg",
  "--ac-expansioncard-header-bg-hover",
  "--ac-expansioncard-header-open-bg",
  "--ac-expansioncard-border-color",
  "--ac-expansioncard-border-open-color",
  "--ac-expansioncard-border-radius",
  "--ac-expansioncard-button-border-radius",
  "--ac-expansioncard-border-hover-color",
  "--ac-guide-panel-bg",
  "--ac-guide-panel-border",
  "--ac-guide-panel-illustration-bg",
  "--ac-help-text-popover-bg",
  "--ac-help-text-button-color",
  "--ac-help-text-button-hover-color",
  "--ac-help-text-button-active-color",
  "--ac-link-panel-text",
  "--ac-link-panel-hover-text",
  "--ac-link-panel-hover-border",
  "--ac-link-text",
  "--ac-link-focus-text",
  "--ac-link-focus-bg",
  "--ac-link-focus-border",
  "--ac-link-active-text",
  "--ac-link-active-bg",
  "--ac-link-active-border",
  "--ac-link-action-text",
  "--ac-link-neutral-text",
  "--ac-link-subtle-text",
  "--ac-list-marker-ul-color",
  "--ac-list-marker-icon-color",
  "--ac-list-marker-ol-color",
  "--ac-list-marker-color",
  "--ac-loader-stroke",
  "--ac-loader-stroke-bg",
  "--ac-loader-neutral-stroke",
  "--ac-loader-interaction-stroke",
  "--ac-loader-inverted-stroke",
  "--ac-loader-inverted-stroke-bg",
  "--ac-modal-bg",
  "--ac-modal-backdrop",
  "--ac-modal-width-small",
  "--ac-modal-width-medium",
  "--ac-pagination-text",
  "--ac-pagination-selected-bg",
  "--ac-pagination-selected-text",
  "--ac-panel-bg",
  "--ac-panel-border",
  "--ac-popover-bg",
  "--ac-popover-border",
  "--ac-progress-bar-fg",
  "--ac-read-more-text",
  "--ac-read-more-hover-bg",
  "--ac-read-more-hover-text",
  "--ac-read-more-active-bg",
  "--ac-read-more-line",
  "--ac-skeleton-bg",
  "--ac-stepper-text",
  "--ac-stepper-line",
  "--ac-stepper-line-completed",
  "--ac-stepper-non-interactive",
  "--ac-stepper-active",
  "--ac-stepper-active-bg",
  "--ac-stepper-active-border",
  "--ac-stepper-active-text",
  "--ac-stepper-hover-active",
  "--ac-stepper-hover-bg",
  "--ac-stepper-non-interactive-completed-bg",
  "--ac-stepper-non-interactive-line-completed",
  "--ac-stepper-non-interactive-active",
  "--ac-stepper-non-interactive-active-bg",
  "--ac-stepper-non-interactive-active-border",
  "--ac-stepper-non-interactive-active-text",
  "--ac-stepper-active-completed",
  "--ac-stepper-non-interactive-active-completed",
  "--ac-table-row-hover",
  "--ac-table-row-selected",
  "--ac-table-row-selected-hover",
  "--ac-table-row-zebra",
  "--ac-table-row-border",
  "--ac-table-row-hover-border",
  "--ac-table-sort-button-text",
  "--ac-table-sort-button-hover-bg",
  "--ac-table-sort-button-sorted-bg",
  "--ac-table-sort-button-sorted-text",
  "--ac-tabs-border",
  "--ac-tabs-text",
  "--ac-tabs-hover-border",
  "--ac-tabs-selected-border",
  "--ac-tabs-selected-text",
  "--ac-tabs-focus-text",
  "--ac-tag-error-border",
  "--ac-tag-error-bg",
  "--ac-tag-error-text",
  "--ac-tag-error-filled-bg",
  "--ac-tag-error-filled-text",
  "--ac-tag-error-moderate-bg",
  "--ac-tag-error-moderate-text",
  "--ac-tag-success-border",
  "--ac-tag-success-bg",
  "--ac-tag-success-text",
  "--ac-tag-success-filled-bg",
  "--ac-tag-success-filled-text",
  "--ac-tag-success-moderate-bg",
  "--ac-tag-success-moderate-text",
  "--ac-tag-warning-border",
  "--ac-tag-warning-bg",
  "--ac-tag-warning-text",
  "--ac-tag-warning-filled-bg",
  "--ac-tag-warning-filled-text",
  "--ac-tag-warning-moderate-bg",
  "--ac-tag-warning-moderate-text",
  "--ac-tag-info-border",
  "--ac-tag-info-bg",
  "--ac-tag-info-text",
  "--ac-tag-info-filled-bg",
  "--ac-tag-info-filled-text",
  "--ac-tag-info-moderate-bg",
  "--ac-tag-info-moderate-text",
  "--ac-tag-neutral-border",
  "--ac-tag-neutral-bg",
  "--ac-tag-neutral-text",
  "--ac-tag-neutral-filled-bg",
  "--ac-tag-neutral-filled-text",
  "--ac-tag-neutral-moderate-bg",
  "--ac-tag-neutral-moderate-text",
  "--ac-tag-alt-1-border",
  "--ac-tag-alt-1-bg",
  "--ac-tag-alt-1-text",
  "--ac-tag-alt-1-filled-bg",
  "--ac-tag-alt-1-filled-text",
  "--ac-tag-alt-1-moderate-bg",
  "--ac-tag-alt-1-moderate-text",
  "--ac-tag-alt-2-border",
  "--ac-tag-alt-2-bg",
  "--ac-tag-alt-2-text",
  "--ac-tag-alt-2-filled-bg",
  "--ac-tag-alt-2-filled-text",
  "--ac-tag-alt-2-moderate-bg",
  "--ac-tag-alt-2-moderate-text",
  "--ac-tag-alt-3-border",
  "--ac-tag-alt-3-bg",
  "--ac-tag-alt-3-text",
  "--ac-tag-alt-3-filled-bg",
  "--ac-tag-alt-3-filled-text",
  "--ac-tag-alt-3-moderate-bg",
  "--ac-tag-alt-3-moderate-text",
  "--ac-toggle-group-bg",
  "--ac-toggle-group-border",
  "--ac-toggle-group-button-bg",
  "--ac-toggle-group-button-text",
  "--ac-toggle-group-button-hover-bg",
  "--ac-toggle-group-button-hover-text",
  "--ac-toggle-group-selected-bg",
  "--ac-toggle-group-selected-text",
  "--ac-toggle-group-button-neutral-bg",
  "--ac-toggle-group-button-neutral-text",
  "--ac-toggle-group-button-neutral-hover-bg",
  "--ac-toggle-group-button-neutral-hover-text",
  "--ac-toggle-group-neutral-selected-bg",
  "--ac-toggle-group-neutral-selected-text",
  "--ac-tooltip-bg",
  "--ac-tooltip-text",
  "--ac-tooltip-key-bg",
  "--ac-tooltip-key-text",
  "--ac-typo-error-text",
  "--ac-confirmation-panel-border",
  "--ac-confirmation-panel-bg",
  "--ac-confirmation-panel-checked-border",
  "--ac-confirmation-panel-checked-bg",
  "--ac-confirmation-panel-error-border",
  "--ac-confirmation-panel-error-bg",
  "--ac-error-summary-bg",
  "--ac-error-summary-border",
  "--ac-error-summary-list-dot",
  "--ac-radio-checkbox-bg",
  "--ac-radio-checkbox-border",
  "--ac-radio-checkbox-action",
  "--ac-radio-checkbox-action-hover-bg",
  "--ac-radio-checkbox-error-border",
  "--ac-radio-checkbox-error-hover-bg",
  "--ac-form-description",
  "--ac-form-subdescription",
  "--ac-search-button-border",
  "--ac-search-button-border-hover",
  "--ac-search-clear-icon",
  "--ac-search-clear-icon-hover",
  "--ac-search-button-focus-active-border",
  "--ac-search-error-border",
  "--ac-combobox-list-bg",
  "--ac-combobox-list-text",
  "--ac-combobox-list-border-color",
  "--ac-combobox-list-item-bg",
  "--ac-combobox-list-item-hover-bg",
  "--ac-combobox-list-item-selected-bg",
  "--ac-combobox-list-item-selected-hover-bg",
  "--ac-combobox-list-item-loading-bg",
  "--ac-combobox-list-item-hover-border-left",
  "--ac-combobox-list-item-selected-hover-border-left",
  "--ac-combobox-list-item-max-selected-bg",
  "--ac-combobox-list-item-max-selected-border",
  "--ac-combobox-error-border",
  "--ac-select-bg",
  "--ac-select-text",
  "--ac-select-border",
  "--ac-select-hover-border",
  "--ac-select-active-border",
  "--ac-select-error-border",
  "--ac-switch-action",
  "--ac-switch-bg",
  "--ac-switch-checked-bg",
  "--ac-switch-hover-bg",
  "--ac-switch-checked-hover-bg",
  "--ac-switch-thumb-bg",
  "--ac-switch-thumb-icon",
  "--ac-switch-thumb-icon-checked",
  "--ac-textfield-bg",
  "--ac-textfield-border",
  "--ac-textfield-text",
  "--ac-textfield-placeholder",
  "--ac-textfield-hover-border",
  "--ac-textfield-active-border",
  "--ac-textfield-error-border",
  "--ac-textarea-bg",
  "--ac-textarea-border",
  "--ac-textarea-text",
  "--ac-textarea-placeholder",
  "--ac-textarea-hover-border",
  "--ac-textarea-active-border",
  "--ac-textarea-counter-text",
  "--ac-textarea-counter-error-text",
  "--ac-textarea-error-border",
  "--ac-dropdown-text",
  "--ac-dropdown-item-text",
  "--ac-dropdown-item-hover-bg",
  "--ac-dropdown-item-hover-text",
  "--ac-dropdown-item-active-bg",
  "--ac-dropdown-item-active-text",
  "--ac-internalheader-bg",
  "--ac-internalheader-divider",
  "--ac-internalheader-text",
  "--ac-internalheader-hover-bg",
  "--ac-internalheader-active-bg",
  "--ac-timeline-row-bg",
  "--ac-timeline-row-active-bg",
  "--ac-timeline-period-success-bg",
  "--ac-timeline-period-success-border",
  "--ac-timeline-period-success-bg-hover",
  "--ac-timeline-period-warning-bg",
  "--ac-timeline-period-warning-border",
  "--ac-timeline-period-warning-bg-hover",
  "--ac-timeline-period-danger-bg",
  "--ac-timeline-period-danger-border",
  "--ac-timeline-period-danger-bg-hover",
  "--ac-timeline-period-info-bg",
  "--ac-timeline-period-info-border",
  "--ac-timeline-period-info-bg-hover",
  "--ac-timeline-period-neutral-bg",
  "--ac-timeline-period-neutral-border",
  "--ac-timeline-period-neutral-bg-hover",
  "--ac-timeline-period-selected-border",
  "--ac-timeline-pin-bg",
  "--ac-timeline-pin-bg-hover",
  "--ac-timeline-zoom-border",
  "--ac-timeline-zoom-bg",
  "--ac-timeline-zoom-bg-hover",
  "--ac-timeline-zoom-selected-bg",
  "--ac-timeline-zoom-selected-text",
  "--ac-timeline-axislabel-text",
];

export { legacyComponentTokenList };

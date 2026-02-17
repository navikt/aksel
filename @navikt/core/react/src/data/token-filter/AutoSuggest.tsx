import React, { forwardRef } from "react";
import { cl } from "../../utils/helpers";

interface AutoSuggestOption {
  value: string;
  label: string;
  tags?: string[];
  filteringTags?: string[];
  description?: string;
}

interface AutoSuggestGroup {
  label: string;
  options: AutoSuggestOption[];
}

interface AutoSuggestProps {
  options: AutoSuggestGroup[];
  filterText: string;
  onSelect: (value: string) => void;
  className?: string;
}

const AutoSuggest = forwardRef<HTMLDivElement, AutoSuggestProps>(
  ({ options, onSelect, className }, ref) => {
    /* const filterValue = (value || "").toLowerCase();

    const filteredGroups = options
      .map((group) => ({
        ...group,
        options: group.options.filter((option) => {
          const searchableText = [
            option.label,
            option.description,
            ...(option.filteringTags ?? []),
            ...(option.tags ?? []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return searchableText.includes(filterValue);
        }),
      }))
      .filter((group) => group.options.length > 0); */

    return (
      <div ref={ref} className={cl("aksel-auto-suggest", className)}>
        {options.map((group) => (
          <div key={group.label} className="aksel-auto-suggest__group">
            <div className="aksel-auto-suggest__group-label">{group.label}</div>
            <ul className="aksel-auto-suggest__list">
              {group.options.map((option) => (
                <li key={option.value} className="aksel-auto-suggest__item">
                  <button
                    type="button"
                    className="aksel-auto-suggest__button"
                    onClick={() => onSelect(option.value)}
                  >
                    <span className="aksel-auto-suggest__label">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="aksel-auto-suggest__description">
                        {option.description}
                      </span>
                    )}
                    {option.tags && option.tags.length > 0 && (
                      <div className="aksel-auto-suggest__tags">
                        {option.tags.map((tag) => (
                          <span key={tag} className="aksel-auto-suggest__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  },
);

export { AutoSuggest };

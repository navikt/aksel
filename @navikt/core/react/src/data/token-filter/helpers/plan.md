## Plan: generateAutoCompleteOptions v2 (Revised)

**TL;DR:** Implement v2 to strictly follow the specification (fixing the step logic inversion), with operator prefix filtering, case-insensitive string matching on label/description/tags/filteringTags, and removal of null-property options and empty groups. Skip the "properties shown in operator step" anti-pattern from v1, and add operator prefix matching for multi-char operators.

**Steps**

1. **Create string-matching helper**
   - Function `matchesFilterText(searchFieldValues: string[], filterText: string): boolean`
   - Case-insensitive substring matching across all provided field values
   - Splits filterText by whitespace and matches all parts (all must be found)
   - Used universally for filtering properties and values

2. **Create operator filtering helpers**
   - Function `getValidOperatorsForProperty(property: ParsedProperty): QueryFilterOperator[]`
   - For now, returns all QUERY_OPERATORS (property type validation can be added later)
   - Function `filterOperatorsByPrefix(operators: QueryFilterOperator[], prefix: string): QueryFilterOperator[]`
   - Returns only operators that start with the given prefix (e.g., `"!"` → `["!=", "!:", "!^"]`)

3. **Refactor `generateAutoCompleteOptions` into strict step-based logic**:
   - **"free-text" step**:
     - Empty value: return "Properties" group (all properties)
     - Non-empty value: return filtered "Properties" + filtered "Values" (using "=" operator only)
     - Special case: skip property suggestions if `operator === "!:"`

   - **"property" step** (FIX v1 inversion):
     - Empty value: return "Operators" group (valid operators for selected property)
     - Non-empty value: return filtered "Operators" + filtered "Values" (using "=" operator only)

   - **"operator" step** (FIX v1 inversion):
     - Return "<Property> values" group only (no more property suggestions)
     - Filter operators by `operatorPrefix` using newly created helper
     - Filter values by `queryState.value` using string matching

4. **Update helper functions**:
   - `generatePropertySuggestions`: Add optional `filterText?: string` parameter for filtering by string match
   - `generateOperatorSuggestions` (new): Return OptionGroup for operators with OPERATOR_LABELS descriptions, optionally filtered by prefix
   - `generateValueSuggestions` (new): Filter options by property and value text, create group with specified operator only (not all operators)
   - All helpers should exclude empty option lists from results

5. **Filter out invalid data**:
   - Skip ParsedOptions where `property === null` (per decision)
   - Remove empty OptionGroups from final `options` array

**Verification**

- Unit tests for all 6 combinations: (free-text|property|operator) × (empty|non-empty value)
- Test operator prefix filtering: typing `"status !"` should show `["!=", "!:", "!^"]` not all operators
- Test case-insensitive matching: `"STATUS"` filter should match property `propertyLabel: "Status"`
- Test tag/filteringTag inclusion in matching
- Storybook: verify operators appear _before_ values in the "property" step (reversed from v1)
- Run `yarn test` for TokenFilter workspace

**Decisions**

- Fix step inversion: property→operators, operator→values (per spec)
- Filter operators by prefix in "operator" step
- Case-insensitive, whitespace-aware string matching
- Search across label, description, tags, and filteringTags
- Skip null-property options, filter empty groups
- Values in all steps use "=" operator only (except in "operator" step where they use selected operator)

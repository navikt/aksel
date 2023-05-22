import { Button, Heading, Search, ToggleGroup } from "@navikt/ds-react";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import * as Icons from "../../../";
import meta from "../../../dist/metadata";
import "./app.css";
import { categorizeIcons, getFillIcon } from "./utils";

const fuseStroke = new Fuse(
  Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke"),
  {
    threshold: 0.2,
    keys: [
      { name: "name", weight: 3 },
      { name: "category", weight: 2 },
      { name: "sub_category", weight: 2 },
      { name: "keywords", weight: 3 },
      { name: "variant", weight: 1 },
    ],
    shouldSort: false,
  }
);

const fuseFill = new Fuse(getFillIcon(Object.values(meta)), {
  threshold: 0.2,
  keys: [
    { name: "name", weight: 3 },
    { name: "category", weight: 2 },
    { name: "sub_category", weight: 2 },
    { name: "keywords", weight: 3 },
    { name: "variant", weight: 1 },
  ],
  shouldSort: false,
});

const App = () => {
  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState<"stroke" | "fill">("stroke");

  const [strokeIcons] = useState(
    Object.values(meta).filter((x) => x.variant.toLowerCase() === "stroke")
  );

  const [fillIcons] = useState(getFillIcon(Object.values(meta)));

  const categories = useMemo(() => {
    if (toggle === "fill") {
      return categorizeIcons(
        query
          ? fuseFill.search(query).map((result) => result.item as any)
          : fillIcons
      );
    }
    return categorizeIcons(
      query
        ? fuseStroke.search(query).map((result) => result.item as any)
        : strokeIcons
    );
  }, [toggle, query, strokeIcons, fillIcons]);

  const onCreate = (id: string, name: string) => {
    let svg = document.getElementById(id)?.outerHTML;
    let size = 24;
    // eslint-disable-next-line no-restricted-globals
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-icon",
          svg,
          size,
          name,
        },
      },
      "*"
    );
  };

  return (
    <main tabIndex={-1} className="wrapper">
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <div className="min-w-40">
          <ToggleGroup
            value={toggle}
            onChange={(v) => setToggle(v as any)}
            variant="neutral"
          >
            <ToggleGroup.Item value="stroke">Stroke</ToggleGroup.Item>
            <ToggleGroup.Item value="fill">Fill</ToggleGroup.Item>
          </ToggleGroup>
        </div>
        <div className="form-search">
          <Search
            variant="simple"
            label="Ikonsøk"
            style={{ border: "none" }}
            placeholder="Søk"
            autoComplete="off"
            onChange={setQuery}
            value={query}
            clearButton={false}
          />
        </div>
      </form>
      <div className="categories">
        {categories.map((cat) => {
          return (
            <div key={cat.category}>
              <Heading level="2" size="small" spacing>
                {cat.category}
              </Heading>
              <div className="sub-categories">
                {cat.sub_categories.map((sub) => {
                  return (
                    <div key={sub.sub_category}>
                      <Heading level="3" size="xsmall" className="sub-heading">
                        {sub.sub_category}
                      </Heading>
                      <div className="icons-wrapper">
                        {sub.icons.map((i) => {
                          const T = Icons[`${i.id}Icon`];
                          if (T === undefined) {
                            console.log(i);
                            return null;
                          }
                          return (
                            <Button
                              key={i.id}
                              variant="tertiary-neutral"
                              icon={
                                <T
                                  font-size="2rem"
                                  aria-hidden
                                  title={i.id}
                                  id={`icon-id-${i.id}`}
                                />
                              }
                              onClick={() => {
                                onCreate(`icon-id-${i.id}`, `${i.id}Icon`);
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default App;

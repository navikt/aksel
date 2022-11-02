import { isNew } from "@/utils";
import { Heading, Detail } from "@navikt/ds-react";
import * as Icons from "@navikt/ds-icons";
import { CategoryT } from "./iconCategories";

const getName = (name: string) => {
  return name
    .replace("Filled", "")
    .replace("Outline", "")
    .replace("Stroke", "");
};

const IconView = ({
  categories,
  handleSelect,
}: {
  categories: CategoryT[];
  handleSelect: (icon: string) => void;
}) => {
  return (
    <div className="animate-fadeIn pt-8">
      {categories.map((cat) => {
        return (
          <div key={cat.category}>
            <Heading level="3" size="small" spacing>
              {cat.category}
            </Heading>
            <div className="grid content-start justify-start gap-x-4 gap-y-6 pb-8 [grid-template-columns:repeat(auto-fit,12rem)]">
              {cat.icons.map((i) => {
                const T = Icons[i.name];
                return (
                  <button
                    key={i.created_at}
                    onClick={() => handleSelect(i.name)}
                    className="vk-icon_button shadow-medium focus-visible:shadow-focus group relative h-32 w-48 shrink rounded ring-1 ring-gray-900/20 hover:shadow-[0_0_0_2px_theme(colors.link)] focus:outline-none"
                  >
                    {isNew(i.created_at) && (
                      <Detail
                        size="small"
                        className="bg-lightblue-200 absolute top-0 right-0 rounded-tr rounded-bl-md py-1 px-2 "
                      >
                        Ny!
                      </Detail>
                    )}
                    <div className="flex h-full w-full flex-col items-center justify-end gap-2 p-4">
                      <div>
                        <T
                          title={i.name}
                          className="mb-2 text-[2rem] transition-all group-hover:text-[2.4rem]"
                        />
                      </div>
                      <div className="text-center">
                        <Detail
                          size="small"
                          className="vk-icon_button-detail text-text-muted"
                        >
                          {" "}
                          {getName(i.name)}
                        </Detail>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IconView;

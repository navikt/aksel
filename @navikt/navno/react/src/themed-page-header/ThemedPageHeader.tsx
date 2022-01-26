import React from "react";
import { Heading, BodyLong } from "@navikt/ds-react";
import Animation from "../animation/Animation";

type PageTypes = "situation" | "product" | "guide";
interface ThemedPageHeaderProps {
  title: string;
  subTitle: string;
  illustration: any; //change type
  pageType: PageTypes;
  modifiedTime: string;
}
const ThemedPageHeader = ({
  title,
  subTitle,
  illustration,
  pageType,
  modifiedTime,
}: ThemedPageHeaderProps) => {
  return (
    <header className={`themed-page-header ${pageType}`}>
      <Animation
        className="themed-page-header__illustration"
        hoverAnimation={illustration}
        activeAnimation={illustration}
        isActive={false}
        isHovering={false}
      />
      <div className="themed-page-header__text">
        <Heading size="2xlarge">{title}</Heading>
        <BodyLong size="small" className="themed-page-header__label">
          {subTitle.toUpperCase()}
          <span aria-hidden="true" className={"page-modified-info divider"}>
            |
          </span>
          <span className={"page-modified-info"}>{modifiedTime}</span>
        </BodyLong>
      </div>
    </header>
  );
};
export default ThemedPageHeader;

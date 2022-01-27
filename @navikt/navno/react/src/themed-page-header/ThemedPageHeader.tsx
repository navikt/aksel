import React from "react";
import { Heading, BodyShort } from "@navikt/ds-react";
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
        <div className="themed-page-header__tagline-wrapper">
          <BodyShort size="small" className="themed-page-header__tagline-label">
            {subTitle.toUpperCase()}
          </BodyShort>
          <span aria-hidden="true" className={"page-modified-info__divider"}>
            |
          </span>
          <BodyShort className="themed-page-header__modified-label">
            <span className={"page-modified-info"}>{modifiedTime}</span>
          </BodyShort>
        </div>
      </div>
    </header>
  );
};
export default ThemedPageHeader;

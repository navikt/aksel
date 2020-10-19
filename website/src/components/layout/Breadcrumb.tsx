import React from "react";
import { Link } from "gatsby";
import { useBreadcrumb } from "../../useSiteStructure";

const Breadcrumb = (props) => {
  const breadcrumb = useBreadcrumb(props.location);
  const current = breadcrumb[breadcrumb.length - 1];

  return (
    <nav className="breadcrumbs" aria-label="breadcrumbs">
      <ul>
        {breadcrumb.slice(0, -1).map(({ link, title }, i) => (
          <li key={i}>
            <Link to={link} className="lenke">
              {title}
            </Link>
            <span className="breadcrumbs__divider" aria-hidden="true">
              /
            </span>
          </li>
        ))}
        <li aria-current="page">{current?.title}</li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;

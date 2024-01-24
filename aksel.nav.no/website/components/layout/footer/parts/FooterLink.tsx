import { Link } from "@navikt/ds-react";
import { amplitudeLogNavigation } from "@/logging";

function FooterLink({ children, href }) {
  return (
    <li>
      <Link
        className="flex w-fit items-center gap-1 text-text-on-inverted underline hover:no-underline focus:bg-blue-200 focus:text-text-default focus:shadow-focus focus:shadow-blue-200"
        href={href}
        onClick={(e) =>
          amplitudeLogNavigation("footer", e.currentTarget.getAttribute("href"))
        }
      >
        {children}
      </Link>
    </li>
  );
}
export default FooterLink;

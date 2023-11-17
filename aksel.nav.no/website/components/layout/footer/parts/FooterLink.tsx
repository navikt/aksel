import { amplitudeLogNavigation } from "@/logging";
import { Link } from "@navikt/ds-react";

function FooterLink({ children, href }) {
  return (
    <li>
      <Link
        className="text-text-on-inverted focus:shadow-focus focus:text-text-default flex w-fit items-center gap-1 underline hover:no-underline focus:bg-blue-200 focus:shadow-blue-200"
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

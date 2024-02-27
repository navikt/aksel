import { Link } from "@navikt/ds-react";
import { amplitudeLogNavigation } from "@/logging";

function FooterLink({ children, href }) {
  return (
    <li>
      <Link
        className="flex w-fit items-center gap-1 text-text-on-inverted underline hover:no-underline focus:bg-blue-200 focus:text-text-default focus:shadow-focus focus:shadow-blue-200"
        href={href}
        onClick={(e) => {
          const target = e.currentTarget.getAttribute("href");
          target && amplitudeLogNavigation("footer", target);
        }}
      >
        {children}
      </Link>
    </li>
  );
}
export default FooterLink;

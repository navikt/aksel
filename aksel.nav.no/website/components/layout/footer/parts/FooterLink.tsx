import { Link } from "@navikt/ds-react";

function FooterLink({ children, href }) {
  return (
    <li>
      <Link
        className="flex w-fit items-center gap-1 text-text-on-inverted underline hover:no-underline focus:bg-blue-200 focus:text-text-default focus:shadow-focus focus:shadow-blue-200"
        href={href}
        data-umami-event="navigere"
        data-umami-event-kilde="footer"
      >
        {children}
      </Link>
    </li>
  );
}
export default FooterLink;

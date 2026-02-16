import Link from "next/link";

const Example = ({ children, ...rest }) => {
  return (
    <Link href="/some/route" passHref legacyBehavior>
      <a {...rest}>{children}</a>
    </Link>
  );
};

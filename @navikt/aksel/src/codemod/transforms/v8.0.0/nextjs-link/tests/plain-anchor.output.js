import Link from "next/link";

const Example = ({ children, ...rest }) => {
  return (
    <a {...rest} as={Link} href="/some/route">
      {children}
    </a>
  );
};

"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { forwardRef } from "react";

type LinkProps = ComponentProps<typeof Link>;

// https://github.com/vercel/next.js/issues/85604
// https://github.com/vercel/next.js/issues/85470
const NextLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ prefetch, ...rest }: LinkProps, forwardedRef) => {
    return <Link {...rest} ref={forwardedRef} prefetch={prefetch ?? false} />;
  },
);

export { NextLink };

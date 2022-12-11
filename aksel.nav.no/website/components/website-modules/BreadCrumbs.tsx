import { AkselArrow } from "components/website-modules/AkselArrow";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const BreadCrumbs = ({
  href,
  text,
  auto = false,
}: {
  href?: string;
  text?: string;
  auto?: boolean;
}) => {
  const router = useRouter();

  if (!router.query?.tema && auto) {
    return null;
  }

  return (
    <NextLink href={href ?? `/god-praksis/${router.query.tema}`} passHref>
      <a className="text-deepblue-500 hover:text-deepblue-800 group mb-1 flex w-fit items-center justify-start focus:underline focus:outline-none">
        <AkselArrow />

        {text ??
          (router.query.tema as string).replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase()
          )}
      </a>
    </NextLink>
  );
};

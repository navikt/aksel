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
    <NextLink href={href ?? `/tema/${router.query.tema}`} passHref>
      <a className="group mb-1 flex w-fit items-center justify-start text-deepblue-500 hover:text-deepblue-800 focus:underline focus:outline-none">
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-[20px] w-[10px] transition-all group-hover:w-[16px]"
          aria-hidden
        >
          <path
            d="M8 17.5L2.12132 11.6213C0.949744 10.4497 0.949746 8.55025 2.12132 7.37868L8 1.5"
            className="stroke-deepblue-500 group-hover:stroke-deepblue-800"
            strokeWidth="1.5"
          />
          <path
            d="M16 9.72266L8 9.72266"
            strokeWidth="1.5"
            className="hidden stroke-deepblue-500 group-hover:block group-hover:stroke-deepblue-800"
          />
        </svg>

        {text ??
          (router.query.tema as string).replace(/(^\w|\s\w)/g, (m) =>
            m.toUpperCase()
          )}
      </a>
    </NextLink>
  );
};

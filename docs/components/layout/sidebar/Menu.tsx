import Pages, { NavdsPage } from "../../../src/pages";
import Link from "next/link";

/* TODO: Replace with accordion-menu when ready */
const subLinks = (page: NavdsPage) => {
  return (
    <div key={page.title}>
      <span>{page.title}</span>
      <ul id={"collapse " + page.title}>{parsePages(page.children)}</ul>
    </div>
  );
};

const parsePages = (pages) => {
  return pages?.map((page) => {
    if (page.pathName) {
      return (
        <li key={page.pathName}>
          <Link href={page.pathName}>
            {page.title ? page.title : parseTitle(page.pathName)}
          </Link>
        </li>
      );
    } else if (page.title && page.children) {
      return subLinks(page);
    } else {
      return null;
    }
  });
};

const parseTitle = (path: string) =>
  path
    .split("/")
    .pop()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace("-", " ") || "ERR: Default Title";

const Menu = ({ menu }) => {
  return (
    <nav>
      <ul>{parsePages(menu)}</ul>
    </nav>
  );
};

export default Menu;

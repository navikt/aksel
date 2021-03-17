import Pages, { NavdsPage } from "../../../src/pages";
import Link from "next/link";

/* TODO: Replace with accordion-menu when ready */
const subLinks = (page: NavdsPage) => {
  return (
    <div key={page.title}>
      <span>{page.title}</span>
      <ul id={"collapse " + page.title}>
        {page.children.map((child) => {
          if (child.pathName) {
            return (
              <li key={child.pathName}>
                <Link href={child.pathName}>
                  {child.title ? child.title : parseTitle(child.pathName)}
                </Link>
              </li>
            );
          } else if (child.children && child.title) {
            return subLinks(child);
          }
          return null;
        })}
      </ul>
    </div>
  );
};

const parseTitle = (path: string) =>
  path
    .split("/")
    .pop()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace("-", " ") || "ERR: Default Title";

const Menu = () => {
  return (
    <nav>
      {Pages.map((page) => {
        if (page.pathName) {
          return (
            <Link key={page.pathName} href={page.pathName}>
              {page.title ? page.title : parseTitle(page.pathName)}
            </Link>
          );
        } else if (page.title && page.children) {
          return subLinks(page);
        } else {
          return null;
        }
      })}
    </nav>
  );
};

export default Menu;

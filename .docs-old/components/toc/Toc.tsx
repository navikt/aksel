import style from "./toc.module.css";
interface TocProps {
  className?: string;
}

const Header = ({ className, ...props }: TocProps) => {
  return <nav className={style.toc}></nav>;
};

export default Header;

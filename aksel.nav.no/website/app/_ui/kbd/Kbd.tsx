import styles from "./Kbd.module.css";

type KbdProps = {
  children: React.ReactNode;
};

function Kbd({ children }: KbdProps) {
  return <kbd className={styles.kbd}>{children}</kbd>;
}

export { Kbd };

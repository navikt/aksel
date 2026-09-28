import styles from "./Kbd.module.css";

type KbdProps = {
  children: React.ReactNode;
};

function Kbd({ children }: KbdProps) {
  return <kbd className={styles.kbd}>{children}</kbd>;
}

/* Runs before paint so `ModKbd` renders the right label without hydration mismatch or layout shift. */
const PLATFORM_SCRIPT = `if(/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent))document.documentElement.dataset.platform="mac"`;

/* Modifier key: ⌘ on Apple platforms, Ctrl elsewhere. Requires `PLATFORM_SCRIPT` in the root layout. */
function ModKbd() {
  return (
    <Kbd>
      <span className={styles.mac}>⌘</span>
      <span className={styles.nonMac}>Ctrl</span>
    </Kbd>
  );
}

export { Kbd, ModKbd, PLATFORM_SCRIPT };

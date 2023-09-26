import { TestComponent } from "@/components/TestComponent";
import styles from "./page.module.css";
import { InteractiveComponent } from "@/components/InteractiveComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <TestComponent />
      <InteractiveComponent />
    </main>
  );
}

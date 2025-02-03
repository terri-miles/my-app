import NursePage from "@/components/nursePage/nursePage";
import styles from "./page.module.css";
import HeroPage from "@/components/heroPage/heroPage";
import { Suspense } from "react";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div className={styles.page}>
      {session ? (
        <Suspense fallback={<div>Loading...</div>}>
          <NursePage />
        </Suspense>
      ) : (
        <HeroPage />
      )}
    </div>
  );
}

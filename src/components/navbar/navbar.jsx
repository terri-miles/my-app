import Link from "next/link";
import Links from "./links/links";
import styles from "./navbar.module.css";
import { auth } from "@/lib/auth";

export default async function NavBar() {
  const session = await auth();
  return (
    <>
      <div className={styles.container}>
        <Link href={"/"} className={styles.logo}>
          Nurse<span className={styles.logoSpan}>link</span>
        </Link>
        <Links session={session} />
      </div>
    </>
  );
}

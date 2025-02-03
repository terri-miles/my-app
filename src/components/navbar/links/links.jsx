"use client";

import Image from "next/image";
import styles from "./links.module.css";
import NavLink from "./navlink/navlink";
import { useState } from "react";
import { handleLogout } from "@/lib/action";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Profile",
    path: "/profile",
  },
];

export default function Links({ session }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session ? (
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        width={30}
        height={30}
        alt="menu-btn"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          <div className={styles.close} onClick={() => setOpen(!open)}>
            X
          </div>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
          {session ? (
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          ) : (
            <NavLink item={{ title: "Login", path: "/login" }} />
          )}
        </div>
      )}
    </div>
  );
}

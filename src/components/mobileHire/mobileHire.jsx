"use client"

import { useRouter } from "next/navigation";
import styles from "./mobileHire.module.css";
import { useState } from "react";
import { hireNurse } from "@/lib/action";

export default function MobileHire({ nurse }) {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nurseId = nurse.id;

    try {
      const res = await hireNurse(nurseId);
      if (!res.success) {
        setError("Failed to hire the nurse!");
        clearErrorTimeout();
      }

      if (res.success) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while hiring the nurse!");
      clearErrorTimeout();
    }
  };
  const clearErrorTimeout = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };
  return (
    <form action="" className={styles.button} onSubmit={handleSubmit}>
      <button>Hire</button>
    </form>
  );
}

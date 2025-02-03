"use client";

import Link from "next/link";
import styles from "./loginForm.module.css";
import { useState } from "react";
import { loginCredentials } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData(e.target);
      const result = await loginCredentials(formData);
      
      if (!result) {
        setError("Unexpected error occurred. Please try again.");
        clearErrorTimeout();
        return;
      }

      if (result?.error) {
        setError(result?.error);
        clearErrorTimeout();
        return;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const clearErrorTimeout = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };
  return (
    <div className={styles.formDetails}>
      <h2>Login</h2>
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <input type="email" name="email" placeholder="Email*" />
        <input type="password" name="password" placeholder="Password*" />
        {error && <p className={styles.error}>{error}</p>}
        <button>Login</button>
        <Link href="/register" className={styles.register}>
          Don't have an account? <b>Register</b>
        </Link>
        <div className={styles.options}>
          <div className={styles.line}></div>
          <p>Or</p>
          <div className={styles.line}></div>
        </div>
      </form>
    </div>
  );
}

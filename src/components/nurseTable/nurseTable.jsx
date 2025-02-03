"use client";

import { useState } from "react";
import styles from "./nurseTable.module.css";
import { hireNurse } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function NurseTable({ nurse }) {
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
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Field</th>
            <th className={styles.header}>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.cell}>ID</td>
            <td className={styles.cell}>{nurse.id}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Name</td>
            <td className={styles.cell}>{nurse.name}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Status</td>
            <td className={styles.cell}>{nurse.status}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Qualifications</td>
            <td className={styles.cell}>{nurse.qualifications.join(", ")}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Experience</td>
            <td className={styles.cell}>{nurse.experience}years</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Specialties</td>
            <td className={styles.cell}>
              {nurse.specialties.map((specialty, index) => (
                <span key={index}>
                  {specialty}
                  {index < nurse.specialties.length - 1 ? ", " : ""}
                </span>
              ))}
            </td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Contact</td>
            <td className={styles.cell}>{nurse.contact}</td>
          </tr>
          <tr className={styles.row}>
            <td className={styles.cell}>Phone</td>
            <td className={styles.cell}>{nurse.phone}</td>
          </tr>
        </tbody>
      </table>
      {error && <p className={styles.error}>{error}</p>}
      <form action="" className={styles.button} onSubmit={handleSubmit}>
        <button>Hire</button>
      </form>
    </div>
  );
}

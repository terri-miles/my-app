"use client";

import { useState } from "react";
import styles from "./nurseHired.module.css";
import Image from "next/image";
import { deleteUser, terminateHiredNurse } from "@/lib/action";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";

export default function NurseHired({ nurses: InitialNurses }) {
  const itemsPerPage = 4; // Show 4 nurses per page
  const [currentPage, setCurrentPage] = useState(1);
  const [nurses, setNurses] = useState(InitialNurses);
  const router = useRouter();

  // Calculate total pages
  const totalPages = Math.ceil(nurses.length / itemsPerPage);

  // Get nurses for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedNurses = nurses.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleTerminateContract = async (nurseId) => {
    const res = await terminateHiredNurse(nurseId);

    if (res.success) {
      // Remove nurse from state
      setNurses((prevNurses) =>
        prevNurses.filter((nurse) => nurse.id !== nurseId)
      );
      alert(res.message);
    } else {
      alert(res.error);
    }
  };

  // const handleDeleteUser = async () => {
  //   const confirmation = confirm(
  //     "Are you sure you want to delete your account?"
  //   );
  //   if (!confirmation) return;

  //   const res = await deleteUser();
  //   if (res.success) {
  //     alert(res.message);
  //     await signOut();
  //     router.refresh();
  //   } else {
  //     alert(res.error);
  //   }
  // };

  const handleDeleteUser = async () => {
    const confirmation = confirm("Are you sure you want to delete your account?");
    if (!confirmation) return;

    const res = await deleteUser();
    
    if (res.success) {
      alert(res.message);

      // Ensure signOut completes before refreshing
      await signOut({ redirect: false });

      // Wait for session to be invalidated
      setTimeout(() => {
        router.push("/login"); // Redirect to login or home
        router.refresh(); // Ensure session is refreshed
      }, 1000);
    } else {
      alert(res.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.account}>
        <div className={styles.display}>
          <div className={styles.imgContainer}>
            <Image src="/nIMG.png" alt="nurse logo" fill />
          </div>
          <span>{nurses.length} Nurses Hired</span>
        </div>
        <form action="" onSubmit={handleDeleteUser}>
          <button>Deactivate account</button>
        </form>
      </div>
      <div className={styles.nurseList}>
        <div className={styles.wrapper}>
          <h2>Your Hired Nurses</h2>
          {nurses.length === 0 ? (
            <p>No nurses hired yet.</p>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.header}>S/N</th>
                    <th className={styles.header}>Name</th>
                    <th className={styles.header}>Qualifications</th>
                    <th className={styles.header}>Experience</th>
                    <th className={styles.header}>Contact</th>
                    <th className={styles.header}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedNurses.map((nurse, index) => (
                    <tr key={index} className={styles.row}>
                      <td className={styles.cell}>{startIndex + index + 1}</td>
                      <td className={styles.cell}>{nurse.name}</td>
                      <td className={styles.cell}>
                        {nurse.qualifications.join(", ")}
                      </td>
                      <td className={styles.cell}>{nurse.experience} years</td>
                      <td className={styles.cell}>{nurse.contact}</td>
                      <td className={styles.cell}>
                        <button
                          onClick={() => handleTerminateContract(nurse.id)}
                        >
                          Terminate contract
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`${styles.pageButton} ${
                      currentPage === i + 1 ? styles.active : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

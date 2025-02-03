"use client";

import { useState } from "react";
import styles from "./mobileNurseTable.module.css";
import { terminateHiredNurse } from "@/lib/action";

export default function MobileNurseTable({ nurses: InitialNurses }) {
  const itemsPerPage = 5; // Show 4 nurses per page
  const [currentPage, setCurrentPage] = useState(1);
  const [nurses, setNurses] = useState(InitialNurses);


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

  return (
    <>
      <div className={styles.container}>
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
                      <th className={styles.header}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedNurses.map((nurse, index) => (
                      <tr key={index} className={styles.row}>
                        <td className={styles.cell}>
                          {startIndex + index + 1}
                        </td>
                        <td className={styles.cell}>{nurse.name}</td>
                        <td className={styles.cell}>
                          {nurse.qualifications.join(", ")}
                        </td>
                        <td className={styles.cell}>
                          <button onClick={() => handleTerminateContract(nurse.id)}>Terminate contract</button>
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
    </>
  );
}

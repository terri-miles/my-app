"use client";

import { getNurses } from "@/lib/data";
import styles from "./nursePage.module.css";
import NurseCard from "../nurseCard/nurseCard";
import { useEffect, useState } from "react";

export default function NursePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Update itemsPerPage based on screen size
  const updateItemsPerPage = () => {
    if (window.innerWidth >= 768) {
      setItemsPerPage(8);
    } else{
      setItemsPerPage(2);
    }
  };

  useEffect(() => {
    updateItemsPerPage(); // Set initial items per page
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [updateItemsPerPage]);

  const nurses = getNurses();

  // Calculate total pages
  const totalPages = Math.ceil(nurses.length / itemsPerPage);

  // Get nurses for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNurses = nurses.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nurseWrapper}>
        {currentNurses.map((nurse) => (
          <div className={styles.nurseCard} key={nurse.id}>
            <NurseCard item={nurse} />
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`${currentPage === index + 1 ? styles.active : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

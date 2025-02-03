import Image from "next/image";
import styles from "./nurseCard.module.css";
import Link from "next/link";

export default function NurseCard({ item }) {
  const truncateText = (text, maxLength = 20) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  return (
    <Link href={`/nurse/${item.id}`}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src={item.image}
            fill
            alt="nurse-image"
            className={styles.img}
          />
        </div>
        <div className={styles.info}>
          <h3>{item.name}</h3>
          <div className={styles.specialties}>
            <p>Specialties:</p>
            <ul>
              {item.specialties.map((specialty, index) => (
                <li key={index}>{truncateText(specialty)}</li>
              ))}
            </ul>
          </div>
          <div className={styles.desc}>
            <p>Experience: {item.experience}years</p>
            <div className={styles.status}>
              <div
                className={`${
                  item.status === "Available"
                    ? styles.available
                    : styles.notAvailable
                }`}
              ></div>
              <p>{item.status}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

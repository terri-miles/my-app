import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h3 className={styles.subtitle}>About Us</h3>
        <h1 className={styles.title}>Compassionate Care, Anytime, Anywhere</h1>
        <p className={styles.desc}>
          At NurseLink, we are dedicated to connecting you with skilled and
          trusted nurses who provide personalized healthcare services right when
          you need them. Your well-being is our priority, and we strive to make
          professional care accessible, reliable, and tailored to your needs.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" fill alt="about-image" className={styles.img} />
      </div>
    </div>
  );
}

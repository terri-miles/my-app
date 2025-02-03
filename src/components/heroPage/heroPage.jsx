import Image from "next/image";
import styles from "./heroPage.module.css";

export default function HeroPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1><span>Find Trusted Nurses for Your Care,</span> Anytime, Anywhere!</h1>
        <p>
          Connecting you with professional caregivers who are passionate about
          providing personalized health support. Your well-being starts here.
        </p>
        <div className={styles.buttons}>
          <button>Get Started</button>
          <button>Contact</button>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image className={styles.img} src="/nurse-1.jpg" width={300} height={300} alt="hero-img" />
        <Image className={styles.img} src="/nurse-2.jpg" width={300} height={300} alt="hero-img" />
        <Image className={styles.img} src="/nurse-3.jpg" width={300} height={300} alt="hero-img" />
      </div>
    </div>
  );
}

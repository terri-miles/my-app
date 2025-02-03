import Image from "next/image";
import styles from "./userProfile.module.css";

export default function UserProfile({ user }) {
  const imageURL = user?.profileImage?.replace("http://", "https://");
  return (
    <>
    
    <div className={styles.userWrapper}>
      <div className={styles.imgContainer}>
        <Image
          src={imageURL || "/noavatar.png"}
          className={styles.img}
          fill
          alt="user image"
        />
      </div>
      <hr />
      <div className={styles.userDetails}>
        <div className={styles.texts}>
          <span>Name:</span>
          <span>{user?.name}</span>
        </div>
        <div className={styles.texts}>
          <span>Email:</span>
          <span>{user?.email}</span>
        </div>
        <div className={styles.texts}>
          <span>Phone:</span>
          <span>{user?.phone}</span>
        </div>
        <div className={styles.texts}>
          <span>Address:</span>
          <span>{user?.address}</span>
        </div>
        <div className={styles.texts}>
          <span>Country:</span>
          <span>{user?.country}</span>
        </div>
      </div>
    </div>
    </>
  );
}

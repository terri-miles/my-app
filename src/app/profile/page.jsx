import UserProfile from "@/components/userProfile/userProfile";
import styles from "./profile.module.css";
import NurseHired from "@/components/nurseHired/nurseHired";
import { getHiredNurses } from "@/lib/action";
import { Suspense } from "react";
import Image from "next/image";
import MobileNurseTable from "@/components/mobileNurseTable/mobileNuresTable";

export const metadata = {
  title: "Profile Page",
  description: "Profile description",
};

export default async function Profile() {
  const { success, nurses, error, user } = await getHiredNurses();
  const imageURL = user?.profileImage ? user.profileImage.replace("http://", "https://") : "/noavatar";

  return (
    <div className={styles.container}>
      <div className={styles.userProfile}>
        <UserProfile user={user} />
      </div>
      <div className={styles.mobileUserProfile}>
        <div className={styles.imgContainer}>
          <Image src={imageURL || "/noavatar"} alt="user image" fill className={styles.img} />
        </div>
        <div className={styles.texts}>
          <span>Welcome {user?.name}</span>
          <h3>{user?.email}</h3>
        </div>
      </div>
      <div className={styles.hiredNurses}>
        <Suspense fallback={<div>Loading...</div>}>
          <NurseHired nurses={nurses} />
        </Suspense>
      </div>
      <div className={styles.mobileHiredNurse}>
        <MobileNurseTable nurses={nurses} />
      </div>
    </div>
  );
}

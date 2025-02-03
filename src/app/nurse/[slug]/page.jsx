import Image from "next/image";
import styles from "./nurse.module.css";
import { getNurse } from "@/lib/data";
import NurseTable from "@/components/nurseTable/nurseTable";
import { hireNurse } from "@/lib/action";
import MobileHire from "@/components/mobileHire/mobileHire";

export const generateMetadata = async ({ params }) => {
  const id = Number(params.slug);
  const nurse = getNurse(id);

  return {
    title: nurse.name,
    description: nurse.specialties,
  };
};

export default async function singlePage({ params }) {
  const id = Number(params.slug);
  const nurse = getNurse(id);

  return (
    <div className={styles.container}>
      <div className={styles.breadCrumbs}>Nurses &gt; Nurse</div>
      <h1>Nurse Details</h1>
      <div className={styles.details}>
        <div className={styles.imgContainer}>
          <Image
            src={nurse.image}
            fill
            alt="nurse-image"
            className={styles.img}
          />
          <div className={styles.mobileDetails}>
            <MobileHire nurse={nurse}/>
          </div>
        </div>
        <div className={styles.table}>
          <NurseTable nurse={nurse} />
        </div>
      </div>
    </div>
  );
}

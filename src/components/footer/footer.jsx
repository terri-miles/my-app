import styles from "./footer.module.css"

export default function Footer() {
    return (
        <div className={styles.container}>
        <div className={styles.logo}>Terri_milesDev</div>
        <div className={styles.text}>
          Terri_miles creative thoughts agency © All rights reserved.
        </div>
      </div>
    )
}


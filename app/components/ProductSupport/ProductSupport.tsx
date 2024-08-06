import { FunctionComponent } from "react";
import styles from "./ProductSupport.module.css";

export type ProductSupportType = {
  className?: string;
};

const ProductSupport: FunctionComponent<ProductSupportType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.productSupport, className].join(" ")}>
      <div className={styles.productSupportContent}>
        <h3 className={styles.haveQuestionsAboutContainer}>
          <p className={styles.haveQuestionsAbout}>
            Have questions about our products, support services, or
          </p>
          <p className={styles.anythingElseLet}>
            anything else? Let us know and we'll get back to you.
          </p>
        </h3>
      </div>
      <div className={styles.contactInfo}>
        <div className={styles.corporateAddressMyeasypharmContainer}>
          <p className={styles.corporateAddressMyeasypharm}>{`Corporate Address:
Myeasypharma Pvt Ltd`}</p>
          <p className={styles.unit101Oxford}>
            Unit 101, Oxford Towers 139, HAL Old Airport Rd H.A.L II Stage
            Bangalore, Karnataka, India, 560008
          </p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.blankLine1}>&nbsp;</p>
          <p className={styles.operationsAddress}>Operations Address:</p>
          <p className={styles.upperGroundFloor}>
            252, Upper Ground Floor. Deepali, Pitampura,
          </p>
          <p className={styles.delhi110034}>Delhi-110034</p>
        </div>
        <div className={styles.contactEmailInfomyeasyphaContainer}>
          <p className={styles.contact}>Contact:</p>
          <p className={styles.emailInfomyeasypharmain}>
            Email: info@myeasypharma.in
          </p>
          <p className={styles.phone919315909654}>Phone: +91-9315909654</p>
        </div>
      </div>
    </div>
  );
};


export default ProductSupport;


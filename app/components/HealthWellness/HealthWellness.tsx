import PropTypes from "prop-types";
import styles from "./HealthWellness.module.css";

const HealthWellness = ({ className = "" }) => {
  return (
    <div className={[styles.healthWellness, className].join(" ")}>
      <div className={styles.employeeHealth}>
        <div className={styles.personalizedPlan}>
          <div className={styles.personalizedPlanChild} />
          <div className={styles.planHeading}>
            <div className={styles.deliveringHealthAndContainer}>
              <p
                className={styles.deliveringHealthAnd}
              >{`Delivering Health and wellness `}</p>
              <p className={styles.byAyush}>by AYUSH</p>
            </div>
          </div>
          <img
            className={styles.personalizedPlanItem}
            loading="lazy"
            alt=""
            src="/arrow-2.svg"
          />
        </div>
        <div className={styles.personalizedPlan1}>
          <div className={styles.personalizedPlanInner} />
          <div className={styles.personalisedHealthPlan}>
            Personalised Health
             Plan for Employees!
          </div>
          <div className={styles.frameDiv}>
            <img
              className={styles.frameChild}
              loading="lazy"
              alt=""
              src="/arrow-2.svg"
            />
          </div>
        </div>
        <div className={styles.productiveCorporates}>
          <div className={styles.corporateDescription}>
            <div className={styles.corporateDescriptionChild} />
            <div className={styles.enableProductiveHealthierWrapper}>
              <div
                className={styles.enableProductive}
              >{`Enable Productive & Healthier Corporates!`}</div>
            </div>
            <img
              className={styles.corporateDescriptionItem}
              loading="lazy"
              alt=""
              src="/arrow-2.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.socialContainer}>
        <div className={styles.socialContainer1}>
        <div className={styles.socialIcons}>
          <img
            className={styles.socialIcon}
            loading="lazy"
            alt=""
            src="/social.svg"
          />
        </div>
          <div className={styles.socialIconTwo}>
            <img
              className={styles.socialIcon1}
              loading="lazy"
              alt=""
              src="/social-1.svg"
            />
          </div>
          <img
            className={styles.socialIcon2}  
            loading="lazy"
            alt=""
            src="/social-2@2x.png"
          />
          <img
            className={styles.socialIcon3}
            loading="lazy"
            alt=""
            src="/social-3@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

HealthWellness.propTypes = {
  className: PropTypes.string,
};

export default HealthWellness;

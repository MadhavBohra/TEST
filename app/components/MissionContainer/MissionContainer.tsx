import { FunctionComponent } from "react";
import styles from "./MissionContainer.module.css";

export type MissionContainerType = {
  className?: string;
};

const MissionContainer: FunctionComponent<MissionContainerType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.missionContainer, className].join(" ")}>
      <div className={styles.missionDetails}>
        <div className={styles.missionElaboration}>
          <div className={styles.missionScope}>
            <div className={styles.whatWeDo}>What We Do</div>
            <div className={styles.whatWeDoDescription}>
              <div className={styles.weProvideComprehensive}>
                We provide comprehensive professional Health advice
                on parameters such as diet, physical activity, ideal screen time
                and others which reducing susceptibility to Workplace-induced
                lifestyle disorders.
              </div>
            </div>
          </div>
        </div>
        <img
          className={styles.image8Icon}
          loading="lazy"
          alt=""
          src="/image-8@2x.png"
        />
        <div className={styles.socialImpact}>
          <div className={styles.socialProofContainer}>
            <img
              className={styles.socialIcon}
              loading="lazy"
              alt=""
              src="/social.svg"
            />
            <div className={styles.testimonials}>
              <img
                className={styles.socialIcon1}
                loading="lazy"
                alt=""
                src="/social-1.svg"
              />
            </div>
            <div className={styles.testimonials1}>
              <img
                className={styles.socialIcon2}
                loading="lazy"
                alt=""
                src="/social-2@2x.png"
              />
            </div>
            <div className={styles.testimonials2}>
              <img
                className={styles.socialIcon3}
                loading="lazy"
                alt=""
                src="/social-3@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.visionContentWrapper}>
        <div className={styles.visionContent}>
          <div className={styles.visionStatement}>
            <div className={styles.throughOurEfforts}>
              Through our efforts, we aim to reduce the burden of chronic
              diseases and elevate public health standards through a specialised
              and well-curated corporate wellness. 
            </div>
          </div>
          <img
            className={styles.image12Icon}
            loading="lazy"
            alt=""
            src="/image-12@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default MissionContainer;
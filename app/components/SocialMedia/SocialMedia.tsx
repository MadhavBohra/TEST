import { FunctionComponent } from "react";
import styles from "./SocialMedia.module.css";

export type SocialMediaType = {
  className?: string;
};

const SocialMedia: FunctionComponent<SocialMediaType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.socialMedia, className].join(" ")}>
      <img
        className={styles.socialIcon}
        loading="lazy"
        alt=""
        src="/social.svg"
      />
      <div className={styles.socialIcons}>
        <img
          className={styles.socialIcon1}
          loading="lazy"
          alt=""
          src="/social-1.svg"
        />
      </div>
      <div className={styles.socialIcons1}>
        <img
          className={styles.socialIcon2}
          loading="lazy"
          alt=""
          src="/social-2@2x.png"
        />
      </div>
      <div className={styles.socialIcons2}>
        <img
          className={styles.socialIcon3}
          loading="lazy"
          alt=""
          src="/social-3@2x.png"
        />
      </div>
    </div>
  );
};


export default SocialMedia;


import React from "react";
import mainVideo from "../../../Img/mainVideo.mov";
import styles from "./AdminMain.module.scss";

const AdminMain = () => {
  return (
    <div>
      <video
        className={styles.mainVideo}
        controls
        autoPlay
        loop
        muted
        playsInline
        aria-current="false"
      >
        <source src={mainVideo} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default AdminMain;

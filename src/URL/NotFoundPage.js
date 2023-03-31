import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div>
      <div className={styles.errorPageDiv}>
        <h1>404 Not Found,,</h1>
        <p>
          Not found page, Please go back <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;

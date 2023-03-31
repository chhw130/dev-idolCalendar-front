import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpSuccess.module.scss";

const SignUpSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <p className={styles.modalTitle}>회원가입이 완료 되었습니다!</p>
      <div className={styles.buttonDiv}>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          아이돌 보러가기
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인하러가기
        </button>
      </div>
    </>
  );
};

export default SignUpSuccess;

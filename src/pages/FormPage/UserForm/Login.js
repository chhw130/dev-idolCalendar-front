import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import choeImg from "../../../Img/logo_main.png";
import { useNavigate } from "react-router-dom";
import Layout from "../../../UI/Layout";
import axios from "axios";
import { getCookie, setCookie } from "../../../cookie/cookie";
import { BASE_URL } from "../../../URL/url";

axios.defaults.withCredentials = true;

const LogIn = () => {
  const [isValid, setIsValid] = useState("");

  useEffect(() => {}, [isValid]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  /**로그인 form을 제출했을 때*/
  const onSubmit = async (data) => {
    await axios
      .post(`${BASE_URL}users/login/`, data, {
        withCredentials: true,
        headers : {
          "X-CSRFTOKEN" : getCookie("csrftoken") || "",
        }
      })
      .then((response) => {
        setIsValid(false);
        const responseData = response.data;
        setCookie("isLogin", responseData);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        setIsValid(error.response.data);
      });
  };

  return (
    <Layout>
      <div className={styles.logInDiv}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.logInForm}>
          <img className={styles.mainImg} src={choeImg} alt="" />
          <h1>로그인</h1>
          <input
            className={styles.logInInput}
            name="email"
            placeholder="UserEmail"
            {...register("email", {
              required: "ID를 입력해주세요.",
            })}
          />
          <input
            className={styles.logInInput}
            name="password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password를 입력해주세요.",
            })}
          />
          <div className={styles.errorMessage}>
            {(errors.email && <p>{errors.email.message}</p>) ||
              (errors.password && <p>{errors.password.message}</p>) ||
              (isValid.error && <p>비밀번호가 틀렸습니다.</p>) ||
              (isValid.detail && <p>계정이 없습니다.</p>)}
          </div>
          <div className={styles.goSignUp}>
            <button
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Not user?
            </button>
          </div>
          <div className={styles.buttonDiv}>
            <button
              onClick={() => {
                navigate("/");
              }}
              type="button"
            >
              홈으로
            </button>
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default LogIn;

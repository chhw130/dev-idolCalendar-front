import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../cookie/cookie";
import Layout from "../../../UI/Layout";
import { BASE_URL } from "../../../URL/url";
import styles from "./EditUser.module.scss";
import EditUserImg from "./EditUserImg.js";
import Option from "./Option";

const EditUser = () => {
  const userData = getCookie("isLogin");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  /**최애 선택 */
  const [selectValue, setSelectValue] = useState(userData.pick);

  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };

  /**회원정보 수정 */
  const onSubmit = (data) => {
    const changeData = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
    };

    axios
      .put(`${BASE_URL}users/edit/password`, changeData, {
        withCredentials: true,
      })
      .then((data) => data)
      .catch((res) => res);
  };

  return (
    <Layout>
      <h1 className={styles.title}>회원정보 수정</h1>
      <div className={styles.signUp}>
        <EditUserImg />
        <hr />
        <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.typeAbsoluteDiv}>
            <label>아이디</label>
            <div className={styles.absoluteInform}>{userData.email}</div>
          </div>
          <div className={styles.typeDiv}>
            <label>비밀번호</label>
            <input
              autoComplete="off"
              name="oldPassword"
              type="password"
              placeholder="기존 비밀번호를 입력해야 비밀번호 변경이 가능합니다!!"
              {...register("oldPassword", {
                required: {
                  value: true,
                  message: "비밀번호를 입력하세요.",
                },
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "비밀번호는 16자 이하로 입력하세요.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className={styles.typeDiv}>
            <label>새 비밀번호</label>
            <input
              name="newPassword"
              type="password"
              autoComplete="off"
              placeholder="새로운 비밀번호"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "비밀번호를 입력하세요.",
                },
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상 입력하세요.",
                },
                maxLength: {
                  value: 16,
                  message: "비밀번호는 16자 이하로 입력하세요.",
                },
                pattern: {
                  // eslint-disable-next-line
                  value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                  message: "비밀번호에 특수문자 1개 이상 넣어주세요.",
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className={styles.typeDiv}>
            <label>새 비밀번호 확인</label>
            <input
              name="passwordConfirm"
              type="password"
              autoComplete="off"
              placeholder="비밀번호 확인"
              {...register("passwordConfirm", {
                required: true,
                validate: {
                  check: (val) => {
                    if (getValues("newPassword") !== val) {
                      return "비밀번호가 일치하지 않습니다.";
                    }
                  },
                },
              })}
            />
          </div>
          <div className={styles.errorMessage}>
            {errors.passwordConfirm && errors.passwordConfirm.type === true && (
              <p>비밀번호를 입력하세요</p>
            )}
            {errors.passwordConfirm && <p>비밀번호가 다릅니다!!</p>}
          </div>

          <div className={styles.typeAbsoluteDiv}>
            <label>별명</label>
            <div className={styles.absoluteInform}>{userData.nickname}</div>
          </div>

          {/**보류,, */}
          {/* <div className={styles.typeDiv}> */}
          {/* <label>최애 변경</label>
            <input type="checkbox" name="onoff-switch" />
            <select value={selectValue} onChange={onChangeSelect}>
              <Option />
            </select> */}
          {/* </div> */}

          <div className={styles.buttonDiv}>
            <button
              onClick={() => {
                navigate(-1);
              }}
              type="button"
            >
              이전
            </button>
            <button>수정하기</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditUser;

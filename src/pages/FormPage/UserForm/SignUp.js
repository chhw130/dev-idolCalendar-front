import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../../UI/Layout";
import axios from "axios";
import { BASE_URL } from "../../../URL/url";
import Option from "./Option";
import Modal from "../../../UI/Modal";
import SignUpSuccess from "./SignUpSuccess";

const SignUp = () => {
  /**백에서 해준 유효성 테스트 */
  const [isEmailValid, setIsEmailValid] = useState();
  const [isPasswordValid, setIsPasswordValid] = useState();
  const [isNicknameValid, setIsNicknameValid] = useState();
  const [isPickValid, setIsPickValid] = useState();
  const [isAgeValid, setIsAgeValid] = useState();
  const [isError, setIsError] = useState([]);
  /**회원가입 확인 모달창 */
  const [signUpModal, setSignUpModal] = useState(false);

  /**옵션 선택 */
  const [selectValue, setSelectValue] = useState("");
  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  /**백 유효성검사 */
  useEffect(() => {
    isError.email ? setIsEmailValid(isError.email[0]) : setIsEmailValid(false);
    isError.password
      ? setIsPasswordValid(isError.password[0])
      : setIsPasswordValid(false);
    isError.pick ? setIsPickValid(isError.pick[0]) : setIsPickValid(false);
    isError.age ? setIsAgeValid(isError.age[0]) : setIsAgeValid(false);
    isError.nickname
      ? setIsNicknameValid(isError.nickname[0])
      : setIsNicknameValid(false);
  }, [isError]);

  /**링크 네비게이트 */
  const navigate = useNavigate();

  /**회원가입 form 제출시 */
  const onSubmit = async (data) => {
    const year = Number(data.birth.slice(0, 4));
    const date = new Date().getFullYear();
    const age = date - year + 1;

    const signUpInform = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      age: age,
      pick: Number(selectValue),
    };

    await axios
      .post(`${BASE_URL}users/`, signUpInform, {
        withCredentials: true,
      })
      .then((data) => {
        setSignUpModal(true);
      })

      .catch((data) => {
        setIsError(data.response.data);
      });
  };

  return (
    <>
      {signUpModal ? (
        <Modal>
          <SignUpSuccess />
        </Modal>
      ) : null}
      <Layout>
        <h1 className={styles.signUpTitle}>회원가입</h1>
        <div className={styles.signUp}>
          <img
            className={styles.signUpImg}
            alt=""
            src="https://velog.velcdn.com/images/view_coding/post/6e4d7220-8bc8-4e88-9d4b-f3dd9e09b523/image.png"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.typeDiv}>
              <label>아이디(Email)</label>
              <input
                name="email"
                placeholder="이메일을 입력하세요"
                {...register("email", {
                  required: "필수 정보입니다.",
                  pattern: {
                    // eslint-disable-next-line
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                  maxLength: {
                    value: 40,
                    message: "40자까지 입력가능합니다.",
                  },
                })}
              />
            </div>
            <div className={styles.errorMessage}>
              {(errors.email && <p>{errors.email.message}</p>) ||
                (isEmailValid && <p> {isEmailValid}</p>)}
            </div>

            <div className={styles.typeDiv}>
              <label>비밀번호</label>
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                autoComplete="off"
                {...register("password", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력하세요.",
                  },
                  maxLength: {
                    value: 16,
                    message: "16자까지 입력가능합니다.",
                  },
                  pattern: {
                    // eslint-disable-next-line
                    // value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,

                    value:
                      // eslint-disable-next-line
                      /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/,
                    // eslint-disable-next-line

                    message: "특수문자 1개 이상 넣어주세요.",
                  },
                })}
              />
            </div>
            <div className={styles.errorMessage}>
              {(errors.password && <p>{errors.password.message}</p>) ||
                (isPasswordValid && <p> {isPasswordValid}</p>)}
            </div>

            <div className={styles.typeDiv}>
              <label>비밀번호 재확인</label>
              <input
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 재확인"
                autoComplete="off"
                {...register("passwordConfirm", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  validate: {
                    check: (val) => {
                      if (getValues("password") !== val) {
                        return "비밀번호가 일치하지 않습니다.";
                      }
                    },
                  },
                })}
              />
            </div>
            <div className={styles.errorMessage}>
              {errors.passwordConfirm &&
                errors.passwordConfirm.type === true && (
                  <p>비밀번호를 입력하세요</p>
                )}
              {errors.passwordConfirm && <p>비밀번호가 다릅니다!!</p>}
            </div>

            <div className={styles.typeDiv}>
              <label>성명</label>
              <input
                name="name"
                placeholder="이름을 입력하세요"
                {...register("name", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  maxLength: {
                    value: 10,
                    message: "20자까지 입력 가능합니다.",
                  },
                  pattern: {
                    value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                    message:
                      "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)",
                  },
                })}
              />
            </div>
            <div className={styles.errorMessage}>
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className={styles.typeDiv}>
              <label>생년월일</label>
              <input
                name="birth"
                type="date"
                {...register("birth", {
                  validate: {
                    check: (val) => {
                      if (!val) {
                        return "필수 정보입니다.";
                      }
                    },
                  },
                })}
              />
            </div>
            <div className={styles.errorMessage}>
              {(errors.birth && <p>{errors.birth.message}</p>) ||
                (isAgeValid && <p>15세이상부터 회원가입이 가능합니다.</p>)}
            </div>

            <div className={styles.typeDiv}>
              <label>닉네임</label>
              <input
                name="nickname"
                placeholder="닉네임을 입력하세요."
                {...register("nickname", {
                  required: {
                    value: true,
                    message: "필수 정보입니다.",
                  },
                  maxLength: {
                    value: 15,
                    message: "15자까지 입력가능합니다.",
                  },
                  minLength: {
                    value: 3,
                    message: "2자 이상 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
                    message: "공백을 제거해 주세요.",
                  },
                })}
              />
            </div>
            <div className={styles.errorMessage}>
              {errors.nickname && <p>{errors.nickname.message}</p>}
              {isNicknameValid && <p>이미 사용 중인 닉네임입니다.</p>}
            </div>

            <div className={styles.typeDiv}>
              <label>최애 등록</label>
              <select value={selectValue} onChange={onChangeSelect}>
                <Option />
              </select>
            </div>
            <div className={styles.errorMessage}>
              {isPickValid && <p>당신의 pick을 입력해주세요</p>}
            </div>

            <div className={styles.buttonDiv}>
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                이전
              </button>

              <button>회원가입</button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default SignUp;

import React from "react";
import { useForm } from "react-hook-form";
import { postUserCalendar, putUserCalendar } from "../../../URL/url";
import styles from "./UserSchedule.module.scss";

const UserSchedule = ({ hideModalHandler, modifyScheduleModal }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let userFormData;
    if (modifyScheduleModal) {
      userFormData = {
        title: data.title,
      };
      putUserCalendar(userFormData, modifyScheduleModal);
      window.location.reload();
    } else {
      postUserCalendar(data);
      window.location.reload();
    }
  };

  return (
    <>
      {!modifyScheduleModal ? (
        <h1 className={styles.mainTitle}>일정 등록하기</h1>
      ) : (
        <h1 className={styles.mainTitle}>일정 수정하기</h1>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.userScheduleTitle}>스케줄 제목</label>
        <input
          className={styles.inputData}
          name="title"
          type="text"
          placeholder="제목"
          {...register("title")}
        />
        {!modifyScheduleModal ? (
          <>
            <label className={styles.userScheduleTitle}>날짜</label>
            <input
              className={styles.inputData}
              name="when"
              type="date"
              {...register("when")}
            />
          </>
        ) : null}

        <div className={styles.userBtnDiv}>
          <button type="button" onClick={() => hideModalHandler()}>
            취소하기
          </button>
          {!modifyScheduleModal ? (
            <button type="submit">등록하기</button>
          ) : (
            <button type="submit">수정하기</button>
          )}
        </div>
      </form>
    </>
  );
};

export default UserSchedule;

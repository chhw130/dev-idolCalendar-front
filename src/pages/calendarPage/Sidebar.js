import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import styles from "./Sidebar.module.scss";
import {
  faBroadcastTower,
  faCalendarCheck,
  faCalendarPlus,
  faCompactDisc,
  faGift,
  faPen,
  faStore,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSchedule from "./myschedule/UserSchedule";
import Modal from "../../UI/Modal";
import axios from "axios";
import { BASE_URL } from "../../URL/url";

const SidebarNav = styled.nav`
  background-color: #5b5be8;
  padding: 0 20px;
  width: 290px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 99;
  overflow: auto;
  opacity: ${({ sidebar }) => (sidebar ? "1" : "0")};

  @media (max-width: 768px) {
  }
  @media (max-width: 376px) {
    width: 60%;
    height: 70%;
    top: ${({ sidebar }) => (sidebar ? "50%" : "-100%")};
    right: ${({ sidebar }) => (sidebar ? "-20.7%" : "-100%")};
    transform: ${({ sidebar }) =>
      sidebar ? "translate(-50%, -50%)" : "translate(-50%, -150%)"};
    border-radius: 15px;
    transition: opacity 200ms ease-in-out;
  }
`;

const Sidebar = ({
  sidebar,
  setSidebarClose,
  todayDate,

  // 날짜

  newIdolDateSchedule,
  newUserDateSchedule,

  selectedDate,
  prevSelectedDate,
  nextSelectedDate,

  // 일정 데이터
  prevIdolDateSchedule,
  nextIdolDateSchedule,
}) => {
  // 사이드바 외부 클릭시 닫히는 함수
  const outside = useRef();
  const [userScheduleInput, setUserScheduleInput] = useState(false);
  const [modifyScheduleModal, setModifyScheduleModal] = useState();
  // 사이드바가 닫혔다가 다시 클릭되면 스크롤이 상단으로 이동
  const scrollToTop = () => {
    outside.current.scrollTo(0, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const handleClose = async (e) => {
    if (!outside.current.contains(e.target)) {
      //현재 클릭한 곳이 메뉴 컴포넌트 안이 아니면 닫기
      setSidebarClose(false);

      // 스크롤을 최상단으로
      scrollToTop();
      setDisplayedDay("today");
    }
  };

  const [displayedDay, setDisplayedDay] = useState("today");

  const changeDate = (direction) => {
    if (direction === "prev") {
      if (displayedDay === "today") {
        setDisplayedDay("prev");
      } else if (displayedDay === "next") {
        setDisplayedDay("today");
      }
    } else if (direction === "next") {
      if (displayedDay === "today") {
        setDisplayedDay("next");
      } else if (displayedDay === "prev") {
        setDisplayedDay("today");
      }
    }
  };

  /**유저 스케줄 추가 모달 */
  const hideModalHandler = () => {
    setUserScheduleInput(false);
  };

  /**유저일정 수정 함수 */
  const modifyUserSchedule = async (e) => {
    const userSchedulePk = e.target.value;
    console.log(userSchedulePk);
    setUserScheduleInput(true);
    setModifyScheduleModal(userSchedulePk);
  };

  /**유저일정 삭제 함수 */
  const deleteUserSchedule = async (e) => {
    const userSchedulePk = e.target.value;
    await axios.delete(`${BASE_URL}users_calendar/${userSchedulePk}/`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      <SidebarNav sidebar={sidebar} ref={outside}>
        <div className={styles.sidebarWrap}>
          <Link to="#" className={styles.navIcon}>
            <AiIcons.AiOutlineClose
              style={{ color: "white" }}
              onClick={() => {
                setSidebarClose(false);
              }}
            />
          </Link>
          <div className={styles.sideSchedule_top}>
            <div className={styles.topBtn}>
              <div className={styles.btnDiv}>
                <button
                  className={styles.prevBtn}
                  onClick={() => changeDate("prev")}
                >
                  <span>{"<"} 전날</span>
                </button>
                <button
                  className={styles.prevBtn}
                  onClick={() => changeDate("next")}
                >
                  <span>다음날 {">"}</span>
                </button>
              </div>
            </div>

            <h3 className={styles.todayTitle}>
              {displayedDay === "prev"
                ? prevSelectedDate
                : displayedDay === "next"
                ? nextSelectedDate
                : selectedDate}
              <br />
              스케줄을 놓치지 마세요
            </h3>
            <ul className={styles.todaySchedule_List}>
              {(displayedDay === "prev"
                ? prevIdolDateSchedule
                : displayedDay === "next"
                ? nextIdolDateSchedule
                : newIdolDateSchedule
              )?.map((item) => {
                const scheduleIcon =
                  item.ScheduleType.type === "broadcast" ? (
                    <FontAwesomeIcon
                      icon={faBroadcastTower}
                      style={{ color: "#443c68" }}
                    />
                  ) : item.ScheduleType.type === "event" ? (
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      style={{ color: "#537fe7" }}
                    />
                  ) : item.ScheduleType.type === "release" ? (
                    <FontAwesomeIcon
                      icon={faCompactDisc}
                      style={{ color: "#f16767" }}
                    />
                  ) : item.ScheduleType.type === "congrats" ? (
                    <FontAwesomeIcon
                      icon={faGift}
                      style={{ color: "#e7b10a" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStore}
                      style={{ color: "#609966" }}
                    />
                  );

                return (
                  <li className={styles.todaySchedule_Item} key={item.pk}>
                    {scheduleIcon} <p>{item.ScheduleTitle}</p>
                  </li>
                );
              })}

              {/* {newIdolDateSchedule?.map((item) => {
                const scheduleIcon =
                  item.ScheduleType.type === "broadcast" ? (
                    <FontAwesomeIcon
                      icon={faBroadcastTower}
                      style={{ color: "#443c68" }}
                    />
                  ) : item.ScheduleType.type === "event" ? (
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      style={{ color: "#537fe7" }}
                    />
                  ) : item.ScheduleType.type === "release" ? (
                    <FontAwesomeIcon
                      icon={faCompactDisc}
                      style={{ color: "#f16767" }}
                    />
                  ) : item.ScheduleType.type === "congrats" ? (
                    <FontAwesomeIcon
                      icon={faGift}
                      style={{ color: "#e7b10a" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faStore}
                      style={{ color: "#609966" }}
                    />
                  );

                return (
                  <li className={styles.todaySchedule_Item} key={item.pk}>
                    {scheduleIcon} <p>{item.ScheduleTitle}</p>
                  </li>
                );
              })} */}
            </ul>
          </div>
          <hr />
          <div className={styles.sideSchedule_bot}>
            <h3 className={styles.todayTitle}>
              나의 스케줄을
              <br />
              놓치지 마세요
            </h3>
            {!userScheduleInput ? (
              <button
                className={styles.Btn}
                onClick={() => setUserScheduleInput(true)}
              >
                <FontAwesomeIcon
                  icon={faCalendarPlus}
                  style={{ width: "20" }}
                />
              </button>
            ) : (
              <Modal hideCartHandler={hideModalHandler}>
                <UserSchedule
                  hideModalHandler={hideModalHandler}
                  modifyScheduleModal={modifyScheduleModal}
                />
              </Modal>
            )}
            <ul className={styles.todaySchedule_List}>
              {newUserDateSchedule?.map((item, index) => {
                const userScheduleDate = `${item.year}/${item.month}/${item.day}/${item.pk}`;
                return (
                  <li className={styles.todaySchedule_Item} key={index}>
                    <FontAwesomeIcon
                      icon={faCalendarCheck}
                      style={{ color: "skyblue" }}
                    />
                    <p className={styles.editDiv_le}>{item.title}</p>
                    <div className={styles.editDiv_ri}>
                      <button
                        value={userScheduleDate}
                        className={styles.Btn}
                        onClick={modifyUserSchedule}
                      >
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{ color: "green" }}
                        />
                      </button>
                      <button
                        value={userScheduleDate}
                        className={styles.Btn}
                        onClick={deleteUserSchedule}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ color: "red" }}
                        />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </SidebarNav>
    </>
  );
};

export default Sidebar;

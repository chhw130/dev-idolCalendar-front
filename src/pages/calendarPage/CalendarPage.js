import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CalendarPage.module.scss";
import Sidebar from "./Sidebar";
import { useQuery } from "react-query";
import { axiosIdolSchedule, axiosSchedule } from "../../api";
import Calendar from "./calendar/Calendar";

import {
  faBroadcastTower,
  faCompactDisc,
  faStore,
  faGift,
  faCalendarCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import Modal from "../../UI/Modal";
import ReportSchedule from "../FormPage/IdolForm/ReportSchedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CalendarData = () => {
  const { idolId } = useParams();
  const userPick = useSelector((state) => state.auth.authState.pick.idolPk);
  const [reportModal, setReportModal] = useState(false);
  const [idolName, setIdolName] = useState({});

  // 아이돌 데이터
  const { isLoding: idDataLoding, data: idData } = useQuery(
    ["info", idolId],
    () => {
      return axiosSchedule(idolId);
    }
  );

  // 스케줄 데이터
  useEffect(() => {
    axiosIdolSchedule(idolId).then((res) => {
      setIdolName({
        idolNameKr: res.idol_name_kr,
        group: res.Girl_group ? res.Girl_group : res.Boy_group,
      });
    });
  }, [idolId]);

  // 다가오는 스케줄
  // 3일 이후 날짜 구하기

  const today = new Date();

  const one_after = new Date(today);
  one_after.setDate(today.getDate() + 1);

  const two_after = new Date(today);
  two_after.setDate(today.getDate() + 2);

  const three_after = new Date(today);
  three_after.setDate(today.getDate() + 3);

  // 3일 이후 날짜 문자화해서 년,월,일 정보 슬라이스
  const one_after_slice = one_after.toISOString().slice(0, 10);
  const two_after_slice = two_after.toISOString().slice(0, 10);
  const three_after_slice = three_after.toISOString().slice(0, 10);

  const oneType = idData?.filter(
    (item) => item.when.slice(0, 10) === one_after_slice
  );

  const twoType = idData?.filter(
    (item) => item.when.slice(0, 10) === two_after_slice
  );

  const threeType = idData?.filter(
    (item) => item.when.slice(0, 10) === three_after_slice
  );

  const type = (type) => {
    for (var i = 0; i < type?.length; i++) {
      if (type[i].ScheduleTitle.length > 0) {
        const a = type[i];
        return a;
      }
    }
  };
  const nextDay = [];
  const dayType = [oneType, twoType, threeType];

  for (var i = 0; i < dayType.length; i++) {
    if (type(dayType[i])) {
      nextDay.push(type(dayType[i]));
    }
  }

  /**사이드바 */
  const [sidebar, setSidebar] = useState(false);
  /**아이돌 day데이터 */
  const [newIdolDateSchedule, setNewIdolDateSchedule] = useState([]);

  const [prevIdolDateSchedule, setPrevIdolDateSchedule] = useState([]);
  const [nextIdolDateSchedule, setNextIdolDateSchedule] = useState([]);

  const [selectedDate, setSelectedDate] = useState(0);
  const [newUserDateSchedule, setNewUserDateSchedule] = useState([]);

  const [prevSelectedDate, setPrevSelectedDate] = useState(0);
  const [nextSelectedDate, setNextSelectedDate] = useState(0);

  /**클릭한 날짜와 그 날짜의 스케줄 */
  const todayDate = (date, idolDateSchedule, userDateSchedule) => {
    setNewIdolDateSchedule(idolDateSchedule);
    setNewUserDateSchedule(userDateSchedule);
    setSelectedDate(date.format("M월 D일 (ddd)"));
  };

  const prevDate = (date, idolDateSchedule) => {
    setPrevIdolDateSchedule(idolDateSchedule);
    setPrevSelectedDate(date.format("M월 D일 (ddd)"));
  };

  const nextDate = (date, idolDateSchedule) => {
    setNextIdolDateSchedule(idolDateSchedule);
    setNextSelectedDate(date.format("M월 D일 (ddd)"));
  };

  const setSidebarOpen = (isSidebar) => {
    setSidebar(isSidebar);
  };

  const setSidebarClose = (isSidebar) => {
    setSidebar(isSidebar);
  };

  /**모달 숨기는 함수 */
  const hideModalHandler = () => {
    setReportModal(false);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendar}>
        <div className={styles.calendarWrap}>
          <div className={styles.idolName}>
            <p>{idolName.idolNameKr}</p>
            {idolName.group ? <p>{idolName.group}</p> : null}
          </div>
          <Calendar
            todayDate={todayDate}
            setSidebarOpen={setSidebarOpen}
            prevDate={prevDate}
            nextDate={nextDate}
          />
          <Sidebar
            sidebar={sidebar}
            setSidebarClose={setSidebarClose}
            selectedDate={selectedDate}
            prevSelectedDate={prevSelectedDate}
            nextSelectedDate={nextSelectedDate}
            newIdolDateSchedule={newIdolDateSchedule}
            prevIdolDateSchedule={prevIdolDateSchedule}
            nextIdolDateSchedule={nextIdolDateSchedule}
            newUserDateSchedule={newUserDateSchedule}
          />
        </div>
        {Number(idolId) === userPick ? (
          <button
            className={styles.reportBtn}
            onClick={() => {
              setReportModal(true);
            }}
          >
            제보하기
          </button>
        ) : null}
        {reportModal ? (
          <Modal hideCartHandler={hideModalHandler}>
            <ReportSchedule hideModalHandler={hideModalHandler} />
          </Modal>
        ) : null}
        <section className={styles.nextSchedule}>
          <div className={styles.nextSchedule_Title}>
            <h3 className={styles.nextSchedule_Content}>다가오는 스케줄</h3>
          </div>
          <ul className={styles.nextSchedule_List}>
            {nextDay?.map((day) => {
              const dateFormat = `${day.when.slice(5, 7)}월 ${day.when.slice(
                8,
                10
              )}일`;

              const { type: scheduleType } = day.ScheduleType;
              const scheduleIcon = {
                broadcast: faBroadcastTower,
                event: faCalendarCheck,
                release: faCompactDisc,
                congrats: faGift,
                buy: faStore,
              }[scheduleType];

              const scheduleIconColor = {
                broadcast: "#443c68",
                event: "#537fe7",
                release: "#f16767",
                congrats: "#e7b10a",
                buy: "#609966",
              }[scheduleType];

              return day.ScheduleTitle ? (
                <li className={styles.nextScheduleItem} key={day.pk}>
                  <div className={styles.nextSchedule_LeftWrapper}>
                    <FontAwesomeIcon icon={faCheck} />
                    <span className={styles.nextScheduleDay}>{dateFormat}</span>
                  </div>
                  <div className={styles.nextSchedule_LightWrapper}>
                    <ul className={styles.todaySchedule_List}>
                      <li className={styles.todaySchedule_Item} key={day.pk}>
                        <FontAwesomeIcon
                          icon={scheduleIcon}
                          color={scheduleIconColor}
                          className={styles.iconDIv}
                        />
                        <span className={styles.nextSchedule_ContentList}>
                          {day.ScheduleTitle}
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : null;
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};
export default CalendarData;

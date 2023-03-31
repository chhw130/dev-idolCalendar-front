import React, { useEffect, useState } from "react";
import styles from "./ReportTable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchingData } from "../../../store/reportSchedules-action";
import { reportSchedulesActions } from "../../../store/reportSchedules";
import Pagenation from "./Pagenation";
import Modal from "../../../UI/Modal";
import ReportSchedule from "../../FormPage/IdolForm/ReportSchedule";
import { authActions } from "../../../store/auth";
import SearchData from "./SearchData";
import {
  faBroadcastTower,
  faCalendarCheck,
  faCompactDisc,
  faFileArrowUp,
  faGift,
  faPenToSquare,
  faStore,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Confirm from "../table/Confirm";

const ReportTable = () => {
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.reportSchedule.searchData);
  const [upLoadData, setUpLoadData] = useState([]);
  const [idolPk, setIdolPk] = useState("");

  /**데이터 정렬을 위한 상태 */
  const [order, setOrder] = useState("DSC");
  /**페이지 네이션을 위한 상태 */
  const [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(0);
  const [scheduleModal, setScheduleModal] = useState(false);

  /**페이지당 목록 수 세팅 */
  const postPerPage = 10;

  /**제보받은 스케줄데이터 가져오기 */
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);

  const reportData = useSelector((state) => state.reportSchedule.reportData);

  /**페이지네이션 데이터 */
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPosts = searchData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setToggle(pageNumber);
  };

  /**테이블 정렬 함수 */
  const sortingTable = (data, col, sortType) => {
    const sorted = [...data].sort((a, b) => {
      if (sortType === "ASC") {
        setOrder("DSC");
        if (Number(a[col])) {
          return a[col] > b[col] ? 1 : -1;
        } else {
          return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
        }
      } else {
        setOrder("ASC");

        if (Number(a[col])) {
          return a[col] < b[col] ? 1 : -1;
        } else {
          return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
        }
      }
    });
    dispatch(reportSchedulesActions.searchSchedule(sorted));
  };

  const sorting = (col) => {
    sortingTable(searchData, col, order);
  };

  /**데이터 수정 */
  const modifyModalHandler = ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;

    const newIdolSchedule = searchData.filter((schedule) => {
      return schedule.id === Number(rowIndex);
    });

    const newData = {
      schedulePk: newIdolSchedule[0].id,
      idolPk: newIdolSchedule[0].pick,
    };
    dispatch(authActions.adminModify(newData));

    setScheduleModal("mod");
  };

  /**스케줄삭제하기*/
  const deleteModalHandler = ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;
    const newIdolSchedule = searchData.filter((schedule) => {
      return schedule.id === Number(rowIndex);
    });

    const newData = {
      schedulePk: newIdolSchedule[0].id,
      idolPk: newIdolSchedule[0].pick,
    };

    dispatch(authActions.adminModify(newData));
    setScheduleModal("del");
  };

  /**아이돌 스케줄에 제보받은 스케줄 등록하기 */
  const updateScheduleHandler = async ({ target }) => {
    const rowIndex = target.parentNode.parentNode.firstElementChild.innerText;
    const newIdolSchedule = searchData.filter((schedule) => {
      return schedule.id === Number(rowIndex);
    });

    const idolPk = newIdolSchedule[0].pick;

    const sendIdolData = {
      ScheduleTitle: newIdolSchedule[0].ScheduleTitle,
      ScheduleType: {
        type: newIdolSchedule[0].ScheduleType,
        content: newIdolSchedule[0].content,
      },
      location: newIdolSchedule[0].location,
      when: newIdolSchedule[0].when,
      ScheduleContent: newIdolSchedule[0].content,
      participant: [{ idol_name_kr: newIdolSchedule[0].name }],
    };
    const newData = {
      schedulePk: newIdolSchedule[0].id,
      idolPk: newIdolSchedule[0].pick,
    };

    dispatch(authActions.adminModify(newData));

    setIdolPk(idolPk);
    setUpLoadData(sendIdolData);
    setScheduleModal("upload");
  };

  /**모달 숨기는 함수 */
  const hideModalHandler = () => {
    setScheduleModal(false);
  };

  return (
    <>
      {scheduleModal === "mod" ? (
        <Modal hideCartHandler={hideModalHandler}>
          <ReportSchedule hideModalHandler={hideModalHandler} />
        </Modal>
      ) : scheduleModal === "del" || scheduleModal === "upload" ? (
        <Modal hideCartHandler={hideModalHandler}>
          <Confirm
            idolPk={idolPk}
            upLoadData={upLoadData}
            scheduleModal={scheduleModal}
            hideModalHandler={hideModalHandler}
          />
        </Modal>
      ) : null}

      {scheduleModal}
      <div className={styles.scheduleDiv}>
        <SearchData reportData={reportData} isReportTable={true} />
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th
                onClick={() => {
                  sorting("id");
                }}
              >
                Id
              </th>
              <th
                onClick={() => {
                  sorting("name");
                }}
              >
                Name
              </th>
              <th
                onClick={() => {
                  sorting("ScheduleTitle");
                }}
              >
                Title
              </th>
              <th
                onClick={() => {
                  sorting("content");
                }}
              >
                Content
              </th>
              <th
                onClick={() => {
                  sorting("when");
                }}
              >
                When
              </th>
              <th
                onClick={() => {
                  sorting("ScheduleType");
                }}
              >
                Type
              </th>
              <th
                onClick={() => {
                  sorting("reporter");
                }}
              >
                Reporter
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((schedule) => {
              const scheduleType = () => {
                const dataType = schedule.ScheduleType;
                return dataType === "broadcast" ? (
                  <td className={styles.broadcast}>
                    <FontAwesomeIcon icon={faBroadcastTower} />
                    {schedule.ScheduleType}
                  </td>
                ) : dataType === "buy" ? (
                  <td className={styles.buy}>
                    <FontAwesomeIcon icon={faStore} />
                    {schedule.ScheduleType}
                  </td>
                ) : dataType === "event" ? (
                  <td className={styles.event}>
                    <FontAwesomeIcon icon={faCalendarCheck} />
                    {schedule.ScheduleType}
                  </td>
                ) : dataType === "congrats" ? (
                  <td className={styles.congrats}>
                    <FontAwesomeIcon icon={faGift} />
                    {schedule.ScheduleType}
                  </td>
                ) : (
                  <td className={styles.release}>
                    <FontAwesomeIcon icon={faCompactDisc} />
                    {schedule.ScheduleType}
                  </td>
                );
              };
              return (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>
                    {schedule.name} ({schedule.pick})
                  </td>
                  <td>{schedule.ScheduleTitle}</td>
                  <td>{schedule.content}</td>
                  <td>{schedule.when.slice(0, 16)}</td>
                  {scheduleType()}
                  <td>{schedule.reporter}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={modifyModalHandler}
                      style={{ color: "red" }}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={deleteModalHandler}
                      style={{ color: "grey" }}
                    />

                    <FontAwesomeIcon
                      icon={faFileArrowUp}
                      onClick={updateScheduleHandler}
                      style={{ color: "skyblue" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagenation
          postPerPage={postPerPage}
          totalPosts={searchData.length}
          paginate={paginate}
          toggle={toggle}
        />
      </div>
    </>
  );
};

export default ReportTable;

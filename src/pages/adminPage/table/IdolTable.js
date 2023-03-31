import {
  faFileArrowUp,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { idolDataActions } from "../../../store/idolData";
import Pagenation from "./Pagenation";
import SearchData from "./SearchData";
import styles from "./ReportTable.module.scss";

const IdolTable = () => {
  const dispatch = useDispatch();
  const idolData = useSelector((state) => state.idolData.idolData);
  const searchData = useSelector((state) => state.idolData.searchIdolData);

  /**데이터 정렬을 위한 상태 */
  const [order, setOrder] = useState("DSC");
  /**페이지 네이션을 위한 상태 */
  const [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(0);

  /**페이지당 목록 수 세팅 */
  const postPerPage = 7;

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
    dispatch(idolDataActions.searchIdolData(sorted));
  };

  const sorting = (col) => {
    sortingTable(searchData, col, order);
  };
  return (
    <div className={styles.scheduleDiv}>
      <SearchData idolData={idolData} isIdolTable={true} />
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th
              onClick={() => {
                sorting("pk");
              }}
            >
              ID
            </th>
            <th>profile</th>
            <th
              onClick={() => {
                sorting("idol_name_kr");
              }}
            >
              Name
            </th>
            <th
              onClick={() => {
                sorting("idol_group");
              }}
            >
              Group
            </th>
            <th
              onClick={() => {
                sorting("idol_solo");
              }}
            >
              Solo
            </th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((idol) => {
            return (
              <tr key={idol.pk}>
                <td>{idol.pk}</td>
                <td>
                  <img src={idol.idol_profile} alt="" />
                </td>
                <td>
                  {idol.idol_name_kr}({idol.idol_name_en})
                </td>
                <td>{idol.idol_group}</td>
                <td>{idol.idol_solo}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "red" }}
                  />
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: "grey" }}
                  />

                  <FontAwesomeIcon
                    icon={faFileArrowUp}
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
  );
};

export default IdolTable;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { idolDataActions } from "../../../store/idolData";
import { reportSchedulesActions } from "../../../store/reportSchedules";
import { BASE_URL } from "../../../URL/url";
import styles from "./SearchData.module.scss";

const SearchData = ({ idolData, reportData, isReportTable, isIdolTable }) => {
  const dispatch = useDispatch();
  const [idolSearchName, setIdolSearchName] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  /**idolTable에서의 검색인지 reportTable에서의 검색인지 판단*/
  const newData = isReportTable ? reportData : isIdolTable ? idolData : null;
  const actionType = isReportTable
    ? reportSchedulesActions.searchSchedule
    : isIdolTable
    ? idolDataActions.searchIdolData
    : null;

  /**존재하는 아이돌목록 */
  useEffect(() => {
    axios.get(`${BASE_URL}idols`).then((res) => {
      setIdolSearchName(res.data.map((data) => data.idol_name));
    });
  }, []);

  /**검색하기 인풋의 값 */
  useEffect(() => {
    if (searchInput === "") {
      dispatch(actionType(newData));
    }
  }, [searchInput, dispatch, newData, actionType]);

  const searchHandler = ({ target }) => {
    setSearchInput(target.value);
  };

  /**검색하기 form 제출했을때 */
  const searchFormHandler = (e) => {
    e.preventDefault();
    const searchData = newData.filter((data) => {
      let isTrue = false;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          if (isNaN(value)) {
            if (value.includes(searchInput)) {
              return (isTrue = true);
            }
          }
        }
      }
      return isTrue;
    });
    dispatch(actionType(searchData));
  };
  return (
    <form className={styles.searchForm} onSubmit={searchFormHandler}>
      <label>🔍</label>
      <input
        className={styles.searchInput}
        list="data-options"
        name="searchSchedule"
        autoComplete="off"
        onChange={searchHandler}
        placeholder="search"
      />
      <datalist id="data-options" className={styles.searchInput}>
        {idolSearchName.map((schedule) => (
          <option key={Math.random()} value={schedule} />
        ))}
      </datalist>
      <button type="submit">검색</button>
      <input
        className={styles.resetBtn}
        type="reset"
        value="x"
        onClick={() => setSearchInput("")}
      />
    </form>
  );
};

export default SearchData;

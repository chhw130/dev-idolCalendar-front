import axios from "axios";
import { BASE_URL } from "../URL/url";
import { reportSchedulesActions } from "./reportSchedules";

export const fetchingData = () => {
  return async (dispatch) => {
    const res = await axios.get(`${BASE_URL}users/reports/`);
    const datas = await res.data;

    /**새로운 데이터 형식으로 바꿔주기 */
    const newData = [];
    for (let data in datas) {
      let nameData = "";
      if (!datas[data].whoes[0].idol_name_kr) {
        nameData = "";
      } else {
        nameData = datas[data].whoes[0].idol_name_kr;
      }

      newData.push({
        id: datas[data].id,
        ScheduleTitle: datas[data].title,
        pick: datas[data].owner.pick,
        reporter: datas[data].owner.nickname,
        name: nameData,
        when: datas[data].time,
        ScheduleType: datas[data].type,
        location: datas[data].location,
        content: datas[data].content,
      });
    }

    dispatch(reportSchedulesActions.updateSchedule(newData));
  };
};

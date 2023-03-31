import axios from "axios";
import { BASE_URL } from "../URL/url";
import { idolDataActions } from "./idolData";

export const fetchingIdolData = () => {
  return async (dispatch) => {
    const res = await axios.get(`${BASE_URL}idols/`);
    const datas = await res.data;

    dispatch(idolDataActions.updateIdolData(datas));
  };
};

import axios from "axios";
import { getCookie } from "../cookie/cookie";

// export const BASE_URL = "http://api.myfavor/api/v1/";
export const BASE_URL = "http://127.0.0.1:8000/api/v1/";
// https://api.myfavor.co.kr/api/v1/idols

/**사진을 업로드 할 url 가져오는 함수 */
export const getUploadUrl = async (img) => {
  let resData = "";
  await axios
    .post(`${BASE_URL}media/photos/get-url/`, img.file, {
      withCredentials: true,
    })
    .then((data) => {
      resData = uploadImg(data, img);
      return resData;
    })
    .catch(() => {
      resData = false;
      return resData;
    });

  return resData;
};

/**받아온 url에 img를 넣어주기 */
export const uploadImg = async (data, img) => {
  let resData = "";
  const form = new FormData();
  form.append("file", img.file[0]);
  await axios
    .post(data.data.uploadURL, form, {
      hedaers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: false,
    })
    .then((res) => {
      resData = res.data.result;
      return res.data.result;
    });

  return resData;
};

/**유저 이미지를 넣은 url post 하기 */
export const postProfileImg = async (profileImg) => {
  await axios
    .put(`${BASE_URL}users/mypage/`, profileImg, {
      withCredentials: true,
    })
    .then((res) => res)
    .catch((res) => res);
};

/**로그인 여부에 따라 데이터 받아옴 */
const loginUserData =
  typeof getCookie("isLogin") !== "undefined"
    ? getCookie("isLogin").pick
    : false;
const loginAdminData =
  typeof getCookie("isLogin") !== "undefined"
    ? getCookie("isLogin").is_admin
    : false;

/**특정 idol에 대한 스케줄 month데이터 불러오기 */
export const fetchMonthData = async (getMoment, activeButtons, idolId) => {
  const date = getMoment.format("YYYY/MM");

  const requests = activeButtons.map((category) =>
    axios
      .get(`${BASE_URL}idols/${idolId}/schedules/${category}/${date}/`)
      .then((res) => {
        const data = res.data.filter(
          (schedule, index) =>
            res.data.findIndex((item) => item.day === schedule.day) === index
        );
        return data;
      })
      .catch((data) => {
        const arr = [];
        return arr;
      })
  );

  let userData = [];
  if (loginUserData || loginAdminData) {
    if (activeButtons.includes("my")) {
      const requestsUserData = await axios
        .get(`${BASE_URL}users_calendar/${date}`)
        .then((res) => {
          const data = res.data.filter(
            (schedule, index) =>
              res.data.findIndex((item) => item.day === schedule.day) === index
          );
          return data;
        })
        .catch((res) => {
          const arr = [];
          return arr;
        });

      userData = requestsUserData;
    }
  }

  const responses = await Promise.all(requests);

  let newIdolData = responses.flat();

  const newUserData = userData.map((data) => {
    const userSchedule = {
      ScheduleTitle: data.title,
      ScheduleType: { type: "my" },
      day: data.day,
    };
    return userSchedule;
  });

  newIdolData = [...newIdolData, ...newUserData];

  return newIdolData;
};

/**특정 idol에 대한 day데이터 불러오기 */
export const fetchDayIdolSchedule = async (
  idolScheduleDate,
  newCategory,
  idolId
) => {
  const requests = newCategory.map((category) =>
    axios
      .get(
        `${BASE_URL}idols/${idolId}/schedules/${category}/${idolScheduleDate}/`
      )
      .then((res) => res.data)
      .catch((res) => {
        const arr = [];
        return arr;
      })
  );

  let newUserData = [];

  if (loginUserData || loginAdminData) {
    if (newCategory.includes("my")) {
      const requestsUserData = await axios
        .get(`${BASE_URL}users_calendar/${idolScheduleDate}/`)
        .then((res) => res.data)
        .catch((res) => {
          const arr = [];
          return arr;
        });

      newUserData = requestsUserData;
    }
  }

  const responses = await Promise.all(requests);

  let newIdolDateSchedule = responses.flat();

  newIdolDateSchedule = {
    idolDaySchdule: newIdolDateSchedule,
    newUserData: newUserData,
  };

  return newIdolDateSchedule;
};

/**유저 일정 등록 */

export const postUserCalendar = async (data) => {
  await axios
    .post(`${BASE_URL}users_calendar/`, data, {
      withCredentials: true,
    })
    .then((data) => {
      window.location.reload();
    })
    .catch((data) => {});
};

/**유저 일정 수정 */

export const putUserCalendar = async (data, schedulePk) => {
  await axios
    .put(`${BASE_URL}users_calendar/${schedulePk}/`, data, {
      withCredentials: true,
    })
    .then((res) => {})
    .catch((res) => {});
};

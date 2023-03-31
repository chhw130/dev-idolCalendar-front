import EditUser from "./pages/FormPage/UserForm/EditUser";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Home from "./pages/mainPage/Home";
import ScrollToTop from "./UI/ScrollUP";
import { getCookie } from "./cookie/cookie";
import AdminPage from "./pages/adminPage/AdminPage";
import Layout from "./UI/Layout";
import CalendarPage from "./pages/calendarPage/CalendarPage";
import axios from "axios";
import ReportTable from "./pages/adminPage/table/ReportTable";
import LogIn from "./pages/FormPage/UserForm/Login";
import SignUp from "./pages/FormPage/UserForm/SignUp";
import { fetchingIdolData } from "./store/idolData-action";
import IdolTable from "./pages/adminPage/table/IdolTable";
import AdminMain from "./pages/adminPage/table/AdminMain";
import NotFoundPage from "./URL/NotFoundPage";

function App() {
  const dispatch = useDispatch();

  /**전역에 토큰 허용 */
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";

  /**저장된 토큰을 가져와서 redux저장소에 넣어주기 */
  useEffect(() => {
    const isLoginCookie = getCookie("isLogin");

    if (isLoginCookie) {
      const loginData = {
        pick: { idolPk: isLoginCookie.pick, schedulePk: null },
        is_admin: isLoginCookie.is_admin,
      };

      dispatch(authActions.logIn(loginData));
    }
  }, [dispatch]);

  const isLogin =
    typeof getCookie("isLogin") !== "undefined"
      ? getCookie("isLogin").pick
      : false;
  const isAdmin =
    typeof getCookie("isLogin") !== "undefined"
      ? getCookie("isLogin").is_admin
      : false;

  useEffect(() => {
    dispatch(fetchingIdolData());
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        {/* 관리자페이지 */}
        <Route
          path="/admin/"
          element={isAdmin ? <AdminPage /> : <Navigate to="/" />}
        >
          <Route path="main" element={<AdminMain />} />
          <Route path="report" element={<ReportTable />} />
          <Route path="idollist" element={<IdolTable />} />
        </Route>

        {/* 메인페이지 */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* 회원가입페이지 */}
        <Route
          path="/signup"
          element={!isLogin ? <SignUp /> : <Navigate to="/" />}
        />

        {/* 로그인페이지 */}
        <Route
          path="/login"
          element={isLogin || isAdmin ? <Navigate to="/" /> : <LogIn />}
          // element={<LogIn />}
        />
        {/* 개인정보수정 */}
        <Route
          path="/edituser"
          element={!isLogin ? <Navigate to="/" /> : <EditUser />}
        />

        {/**아이돌 캘린더 페이지 */}
        <Route
          path=":idolId/calendar"
          element={
            <Layout>
              <CalendarPage />
            </Layout>
          }
        />

        <Route element={<NotFoundPage />} path="/*" />
      </Routes>
    </>
  );
}

export default App;

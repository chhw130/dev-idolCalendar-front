# 프로젝트 소개
### 프로젝트 기간 : 2023.03.06 ~ 2023.03.27 
---
# :hearts: MyFavor 

<https://myfavor.site>

최애인은 '내가 가장 사랑하는'이라는 의미의 '최애(最愛)'에 사람 '인(人)'을 합친 말로, 팬들이 가장 사랑하는 아이돌을 의미합니다. 

이 서비스는 아이돌 팬들을 위한 스케줄 관리 서비스로, 다양한 아이돌 그룹의 스케줄 정보를 제공합니다.

팬들은 자신이 좋아하는 아이돌 그룹의 활동을 빠르게 파악할 수 있습니다. 

또한 "최애인"에서 제공하는 아이돌의 일정 달력에 유저의 개인 일정을 입력할 수 있어 아이돌 일정과 개인 일정을 함께 관리할 수 있습니다. 

따라서 사용자는 자신이 좋아하는 아이돌과 자신의 일정을 효율적으로 관리 할 수 있습니다.

---

### 멤버 구성 

- 슬랙과 Github를 활용하여 협업

## Front 

- 최현우 : <https://github.com/chhw130>

- 박현지 : <https://github.com/hyeonJiP>

- 김지영 : <https://github.com/KIMJIYOUNGS2>

## Back 

- 고은기 : <https://github.com/sliverKi>

- 이수현 : <https://github.com/ssu-uky>

<br>

----

<br>

## 🔧 기술 스택

### 개발 및 협업관리 환경
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)     <img alt="Slack" src ="https://img.shields.io/badge/Slack-4A154B.svg?&style=for-the-badge&logo=Slack&logoColor=white"/></a>

### 호스팅
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=Render&logoColor=white)

### 개발

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### 주요 라이브러리

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
	![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
	![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)


<br>

----

<br>

## * :bulb: Architecture

<img width="800" alt="스크린샷 2023-04-04 오후 2 16 55" 
src="https://user-images.githubusercontent.com/121347506/229693783-22b5be1c-c88a-49c8-940d-37265e3bd72c.png">

----
## * :bulb: 주요 기능 
    
 ### - 로그인 & 로그아웃
   - DB값 검증
   - E-mail 로그인 
   - ID, PW 일치 불일치 검증 
   - PW 변경
   - 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
   
 ### - 회원가입 
   - 사용자 이름 글자수 검사 (2자 이상) 
   - E-mail 중복 검사  
   - 비밀번호 유효성 검사 
   - 나이 유효성 검사 (15세 이상)
   - 관리자 회원인지 일반 사용자 인지 구분 
   - 회원가입 시도하는 사용자의 최애 아이돌 선택 
   - DB 데이터 저장
   
 ### - 마이페이지
   - user-profile 변경시 image를 cloud-server에 저장
   - 기존의 자신의 최애 아이돌 외의 다른 아이돌 변경가능 
   - 사용자 정보 update
   
 ### - 메인 페이지 
   - sliding-bar 
   - 관리자 회원인 경우, 관리자 페이지 접속 가능
   - 일반 사용자인 경우, 관리자 페이지 접속 불가 
   - 아이돌 API 연동
   
 ### - 캘린더 페이지 
   - 활성 카테고리에 따라 달력에 표시되어 지는 일정 구분
   - 활성 카테고리에 맞추어 날짜에 카테고리별 해당하는 토글 노출 
   - 오늘 날짜 기준으로 다가올 날에 대한 일정 알림 
   - 사용자가 선택한 날짜에서 전날, 다음날에 대한 일정 목록 표시
   - 회원인 사용자에게만 보여지는 MY 카테고리 노출, 활성화   
   - 회원인 사용자인 경우 제보하기 버튼 노출, 활성화 
   - 회원인 사용자인 경우 자신의 일정 등록, 수정, 삭제 가능
 
 ### - 아이돌 일정 제보하기 
   - 회원인 사용자만이 자신이 선택한 아이돌의 일정을 관리자에게 정보 제공 가능 
   - 사용자가 회원, 비회원을 구분하여 "제보하기" 버튼 선택적 활성화 
   - 제보하기 data 검증 
     - 자신이 선택한 아이돌이 아닌 경우 제보 불가 
     - 제보 대상이 없는 경우 제보 불가 
     - 제보 대상이 한명이 아닌 여러명인 경우 제보 불가 
     - DB에 없는 아이돌인 경우 제보 불가 
     
 ### - 관리자 페이지   
   - 사용자로 부터 제보 받은 report-data가 관리자 페이지에 적재 및 저장 
   - 관리자는 제보받은 data를 조회, 수정, 삭제 가능

<br>



----

## * :bulb: 구성도
 
![](https://velog.velcdn.com/images/chhw130/post/0b435eae-9465-4bb5-9e9e-b90b91a0d0fb/image.png)

---

### 1. 메인페이지

![](https://velog.velcdn.com/images/chhw130/post/217ee46f-1d2a-4dbf-a62e-62cbb2db0664/image.gif)

### 2. 회원가입/로그인 페이지

![](https://velog.velcdn.com/images/chhw130/post/73eac9ae-cbbe-40e4-8b29-bc61de906127/image.png)

![](https://velog.velcdn.com/images/chhw130/post/a1884b19-ac5c-4cc8-9379-63893cc181e6/image.png)

### 3. 캘린더 페이지

-카테고리별로 일정 표시하기

![](https://velog.velcdn.com/images/chhw130/post/6d2fd408-ae0e-4519-9926-d85fcee40091/image.gif)

-제보하기

![](https://velog.velcdn.com/images/chhw130/post/d96ffa5c-b6c2-4e14-b84e-98b628cb2957/image.png)

-내 일정 등록/수정/삭제 기능

![](https://velog.velcdn.com/images/chhw130/post/58a5c48f-e58c-4f0e-9c3e-5ee357a224e6/image.gif)


![](https://velog.velcdn.com/images/chhw130/post/30c98eda-c02e-432e-aff7-61f566bc9b37/image.gif)


### 4. 관리자 페이지

![](https://velog.velcdn.com/images/chhw130/post/d3e8d0ff-2c36-4eec-b1dc-2c204e98f166/image.gif)

----

## * :bulb: 프로젝트를 진행하면서 고민했던 문제들

🙌자세한 내용은 [링크](https://github.com/chhw130/dev-idolCalendar-front/wiki/tech-issue)

- 로그인 구현에 대해서(session id or jwt)
- 서버데이터를 어떻게 처리에 대한 고민(react-query의 도입)
- 유효성 검사에 대해 백과 프론트가 취해야하는 자세
- cors오류에 대해서




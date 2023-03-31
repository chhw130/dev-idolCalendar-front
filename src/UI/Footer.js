import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerCell}>
        <div className={styles.footerHeader}>
          <img
            src="https://velog.velcdn.com/images/view_coding/post/b0d48523-f2f5-4319-be6f-1784d4457a54/image.png"
            alt="logo"
          />
        </div>
        <div className={styles.footerContain}>
          <div className={styles.footerContent}>
            <p>고객센터</p>
            <p>서비스 안내</p>
          </div>
          <div className={styles.footerSns}>
            <h1>더욱 다양한 최애인을 만나보세요!</h1>
            <div className={styles.footerSns_image}>
              <span>
                <a href="/">
                  <img
                    src="https://velog.velcdn.com/images/view_coding/post/5d5135de-adf6-4fcc-96a6-2dcc0a757aa7/image.png"
                    alt="sns_kakao"
                  />
                </a>
              </span>
              <span>
                <a href="/">
                  <img
                    src="https://velog.velcdn.com/images/view_coding/post/7943324d-0eaa-4f46-b5ca-4041843ffd56/image.png"
                    alt="sns_instagram"
                  />
                </a>
              </span>
              <span>
                <a href="/">
                  <img
                    src="https://velog.velcdn.com/images/view_coding/post/755b52f1-5bc6-4843-86b6-cf8596dfe462/image.png"
                    alt="sns_yutube"
                  />
                </a>
              </span>
            </div>
          </div>
          <div className={styles.footerMade}>
            <div className={styles.footerCompany}>
              <span>운영사: 김이박 최고</span>

              <span>|</span>

              <span>개발사: 최애인(주)</span>
            </div>
            <div className={styles.footerEmail}>
              <span>https://ozcodingschool.com</span>
              <span>|</span>
              <span>https://ozcodingschool.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

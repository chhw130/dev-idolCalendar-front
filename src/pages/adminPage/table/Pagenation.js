import styles from "./Pagenation.module.scss";

const Pagenation = ({ postPerPage, paginate, totalPosts, toggle }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pageUl}>
        {pageNumbers.map((number, index) => {
          return (
            <li key={number}>
              <p
                key={number}
                onClick={() => paginate(number)}
                className={
                  index === toggle - 1
                    ? `${styles.pageActive}`
                    : `${styles.page}`
                }
              >
                {number}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagenation;

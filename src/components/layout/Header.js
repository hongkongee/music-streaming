import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import useNavigation from "../../router/useNavigation";

const Header = () => {
  const { goRank, goArtist, goSearch } = useNavigation();

  // 스크롤시 헤더 색상 변경
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  return (
    <header>
      <div className={styles.headerContainer}>
        <div
          className={
            scrollPosition < 10
              ? styles.headerItem
              : `${styles.headerItem} ${styles.changeItem}`
          }
        >
          <div className={styles.items} onClick={goRank}>
            랭킹
          </div>
          <div>|</div>
          <div className={styles.items} onClick={goArtist}>
            아티스트
          </div>
          <div>|</div>
          <div className={styles.items} onClick={goSearch}>
            검색
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
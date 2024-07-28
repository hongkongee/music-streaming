import React, { useContext, useEffect } from "react";
import styles from "./UserInfo.module.scss";
import AuthContext from "../../config/AuthContext";

const UserInfo = () => {
  const { isLoggedIn, onLogout, userEmail, profileImage, name, country } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("isLoggedIn:", isLoggedIn);
      console.log("userEmail:", userEmail);
      console.log("profileImage:", profileImage);
      console.log("name:", name);
      console.log("country:", country);
    }
  }, []);
  return <div className={styles.userArea}>UserInfo</div>;
};

export default UserInfo;

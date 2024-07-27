import React from "react";
import styles from "./Login.module.scss";
import Button from "@mui/material/Button";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const Login = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login");
      console.log("from server, response:", response.data); // 서버에서 받은 응답 데이터
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onLoginSpotify = () => {
    fetchData();
  };
  return (
    <div className={styles.container}>
      <Button
        style={{ color: "black", fontSize: "18px" }}
        onClick={onLoginSpotify}
      >
        <div className={styles.imgContainer}>
          <img src={require("../../assets/img/spotify.png")} />
        </div>{" "}
        &nbsp; Login
      </Button>
    </div>
  );
};

export default Login;

import React, { useEffect } from "react";
import styles from "./Login.module.scss";
import Button from "@mui/material/Button";
import axios from "axios";
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI; // http://localhost:3000/oauth/spotify
// const REDIRECT_URI = "http://localhost:3000/oauth/spotify";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "code";
const SCOPE = "user-read-private user-read-email"; // 필요한 범위 설정

const Login = () => {
  // Spotify의 권한 페이지로 redirection
  useEffect(() => {
    console.log("redirect uri:", REDIRECT_URI);
  }, []);
  const onLoginSpotify = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    window.location = authUrl;
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

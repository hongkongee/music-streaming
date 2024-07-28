import React, { useContext, useEffect } from "react";
import AuthContext from "../../config/AuthContext";
import { useNavigate } from "react-router-dom";
import qs from "qs"; // 쿼리 문자열 파싱을 위한 모듈
import axios from "axios";
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const SpotifyLoginHandler = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  useEffect(() => {
    // redirection된 URI에서 코드 추출 후 이 코드를 이용하여 액세스 토큰 요청
    const fetchAccessToken = async (code) => {
      const body = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      };

      try {
        const authString = `${client_id}:${client_secret}`;
        const encodedAuthString = btoa(authString); // use btoa to base64 encode
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          qs.stringify(body),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Basic " + encodedAuthString,
            },
          }
        );
        console.log("Access Token:", response.data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code"); // 현재 url의 쿼리파라미터 중 code 값을 추출
    if (code) {
      fetchAccessToken(code);
    }
  }, []);
  return <div>SpotifyLoginHandler</div>;
};

export default SpotifyLoginHandler;

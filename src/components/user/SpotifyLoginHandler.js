import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../config/AuthContext";
import { useNavigate } from "react-router-dom";
import qs from "query-string"; // 쿼리 문자열 파싱을 위한 모듈
import axios from "axios";
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const SpotifyLoginHandler = () => {
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  // 1. redirection된 URI에서 코드 추출 후 이 코드를 이용하여 액세스 토큰 요청
  // 원래는 서버에 요청, 서버에서 토큰을 스포티파이 서버로부터 받아서 발급
  const fetchAccessToken = async (code) => {
    const authString = `${client_id}:${client_secret}`;
    const encodedAuthString = btoa(authString); // use btoa to base64 encode

    const body = {
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedAuthString}`,
    };

    console.log("Request Body:", body);
    console.log("Request Headers:", headers);

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(body),
        { headers: headers }
      );
      console.log("Access Token:", response.data.access_token);
      onLogin(response.data.access_token);
    } catch (error) {
      if (error.response) {
        // 서버가 4xx 또는 5xx 상태 코드로 응답한 경우
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        console.error("Error Request:", error.request);
      } else {
        // 요청을 설정하는 동안 발생한 다른 오류
        console.error("Error Message:", error.message);
      }
    }
  };

  // 액세스 토큰 받아오기 실행부
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code"); // 현재 url의 쿼리파라미터 중 code 값을 추출
    if (code) {
      fetchAccessToken(code);
    }
  }, []);

  // 2. 액세스 토큰을 이용하여 유저 정보 가져오기
  const fetchSpotifyUserData = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User Data:", response.data);
      const userData = response.data;
      onLogin(token, userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchSpotifyUserData();
  }, []);
  return <div>SpotifyLoginHandler</div>;
};

export default SpotifyLoginHandler;

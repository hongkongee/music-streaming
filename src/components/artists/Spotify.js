import React, { useEffect, useState } from "react";
import axios from "axios";
import Artist from "./Artist";
import TopTracks from "./TopTracks";
import SearchBar from "../ui/SearchBar";

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const Spotify = () => {
  const [accessToken, setAccessToken] = useState("");
  const [artist, setArtist] = useState(null);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [artistId, setAritstId] = useState(""); // 스포티파이 아티스트 아이디

  // 검색한 가수의 id 받기
  const getArtistId = (spotifyId) => {
    setAritstId(spotifyId);
  };

  // Access Token 발급 받기
  const getSpotifyToken = async () => {
    const url = "https://accounts.spotify.com/api/token";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);

    try {
      const response = await axios.post(url, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Access Token:", response.data.access_token);
      setAccessToken(response.data.access_token);
      localStorage.setItem("ACCESS_TOKEN", response.data.access_token); // 로컬 스토리지에 저장
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 아티스트 찾기
  const fetchArtistData = async () => {
    // const artistId = "7IrDIIq3j04exsiF3Z7CPg"; // 빈지노
    // https://open.spotify.com/artist/7IrDIIq3j04exsiF3Z7CPg?si=UxmbsWcfRa6alD6jE-HEMQ
    const url = `https://api.spotify.com/v1/artists/${artistId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Artist Data:", response.data);
      setArtist(response.data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  // 아티스트 인기 트랙
  const fetchArtistTopTracks = async () => {
    // const artistId = "7IrDIIq3j04exsiF3Z7CPg"; // 빈지노
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Artist Top Tracks:", response.data.tracks);
      setArtistTopTracks(response.data.tracks);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    console.log("client id:", clientId);
    getSpotifyToken();
  }, []);

  useEffect(() => {
    if (!artistId) return;
    fetchArtistData();
    fetchArtistTopTracks();
  }, [artistId]);

  return (
    <div style={{ margin: "14vh" }}>
      <SearchBar onArtist={getArtistId} />
      {artist && <Artist artist={artist} />}
      {artistTopTracks.length > 0 && <TopTracks topTracks={artistTopTracks} />}
    </div>
  );
};

export default Spotify;

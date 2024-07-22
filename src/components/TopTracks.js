import React, { useEffect } from "react";
import styles from "./TopTracks.module.scss";

const TopTracks = ({ topTracks }) => {
  useEffect(() => {
    console.log("in TopTracks Component, artistTopTracks:", topTracks);
  }, []);

  // 밀리세컨드를 분:초 포맷으로 바꾸기
  const formatMsToMinutesAndSeconds = (ms) => {
    // 밀리초를 초로 변환
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // 초가 10보다 작으면 앞에 0을 추가
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  const clickUri = (link) => {
    window.location.href = link;
  };
  return (
    <table>
      {topTracks.map((track) => (
        <tbody
          key={track.id}
          onClick={() => clickUri(track.external_urls.spotify)}
          style={{ cursor: "pointer" }}
        >
          <tr className={styles.oneTrack}>
            <td className={styles.imgContainer}>
              <img src={track.album.images[2].url} alt="앨범" />
            </td>
            <td className={styles.textArea}>
              <h2>{track.name}</h2>
              <div>{formatMsToMinutesAndSeconds(track.duration_ms)}</div>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};

export default TopTracks;

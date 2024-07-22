import React, { useEffect } from "react";
import axios from "axios";
import styles from "./Artist.module.scss";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const Artist = ({ artist }) => {
  return (
    <div className={styles.artist}>
      <div className={styles.imgContainer}>
        <img src={artist.images[1].url} alt="아티스트" />
      </div>

      <div className={styles.textArea}>
        <h2>{artist.name}</h2>
        <div>{artist.followers.total}</div>
        <div>
          {artist.genres.map((genre) => (
            <span key={genre}>{genre + " "}</span>
          ))}
        </div>

        <a href={artist.external_urls.spotify}>링크</a>
      </div>
    </div>
  );
};

export default Artist;

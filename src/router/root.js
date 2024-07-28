import { createBrowserRouter } from "react-router-dom";
import Main from "../Main";
import MainPage from "../components/MainPage";
import Spotify from "../components/artists/Spotify";
import SearchTemplate from "../components/search/SearchTemplate";
import Recommend from "../components/recommend/Recommend";
import Login from "../components/user/Login";
import SpotifyLoginHandler from "../components/user/SpotifyLoginHandler";

const root = createBrowserRouter([
  {
    path: "",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/artist",
        element: <Spotify />,
      },
      {
        path: "/search",
        element: <SearchTemplate />,
      },
      {
        path: "/recommend",
        element: <Recommend />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/oauth/spotify",
        element: <SpotifyLoginHandler />,
      },
    ],
  },
]);

export default root;

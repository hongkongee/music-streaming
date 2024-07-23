import { createBrowserRouter } from "react-router-dom";
import Main from "../Main";
import MainPage from "../components/MainPage";
import Spotify from "../components/artists/Spotify";
import SearchTemplate from "../components/search/SearchTemplate";

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
    ],
  },
]);

export default root;

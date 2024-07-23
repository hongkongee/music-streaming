import logo from "./logo.svg";
import "./App.css";
import Spotify from "./components/artists/Spotify";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import { Route, RouterProvider, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import SearchTemplate from "./components/search/SearchTemplate";
import root from "./router/root";

const GlobalStyle = createGlobalStyle`
 ${reset}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={root} />
    </div>
  );
}

export default App;

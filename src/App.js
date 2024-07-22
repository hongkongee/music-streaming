import logo from "./logo.svg";
import "./App.css";
import Spotify from "./components/Spotify";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 ${reset}
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Spotify />
    </div>
  );
}

export default App;

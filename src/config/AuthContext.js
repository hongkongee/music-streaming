import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userNo: "",
  userEmail: "",
  profileImage: "",
  name: "",
  country: "",
  onLogout: () => {},
  onLogin: () => {},
});

const isAuthenticated = () => {
  const atn = localStorage.getItem("ACCESS_TOKEN");
  return !!atn; // 토큰이 있으면 true, 없으면 false
};

export const AuthContextProvider = (props) => {
  console.log("App 컴포넌트 실행!");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  // token, email, loginPath, profileImage, regionName
  const loginHandler = (token, userData) => {
    if (userData === undefined) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.setItem("NAME", userData.display_name);
      localStorage.setItem("EMAIL", userData.email);
      localStorage.setItem("PROFILE_IMAGE", userData.images[0]);
      localStorage.setItem("COUNTRY", userData.country);

      setUserEmail(userEmail);
      setProfileImage(userData.images[0]);
      setName(userData.display_name);
      setCountry(userData.country);
    }
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserEmail("");
    setProfileImage("");
    setName("");
  };

  useEffect(() => {
    if (localStorage.getItem("NAME")) {
      setIsLoggedIn(true);
      setUserEmail(localStorage.getItem("LOGIN_EMAIL"));
      setProfileImage(localStorage.getItem("PROFILE_IMAGE"));
      setName(localStorage.getItem("NAME"));
      setCountry(localStorage.getItem("COUNTRY"));
    }
  });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        profileImage,
        name,
        country,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { isAuthenticated };

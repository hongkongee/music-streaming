import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  let [search, setSearch] = useState([]); // 자동 완성 결과

  // 더미데이터 (추후 서버에서 받아올 데이터)
  const mydata = [
    { id: 1, name: "BEENZINO", kor_name: "빈지노" },
    { id: 2, name: "Dynamic Duo", kor_name: "다이나믹듀오" },
    { id: 3, name: "IU", kor_name: "아이유" },
    { id: 4, name: "Kimkunmo", kor_name: "김건모" },
    { id: 5, name: "NewJeans", kor_name: "뉴진스" },
    { id: 6, name: "Cool", kor_name: "쿨" },
  ];

  // 한글인지 여부
  function isKorean(str) {
    const koreanRegex = /^[\uAC00-\uD7A3]+$/;
    return koreanRegex.test(str);
  }

  const updateChange = (e) => {
    let data = e.target.value; // input 입력값
    let filterData = mydata.filter(
      (i) => i.name.toLowerCase().includes(data.toLowerCase())
      // 내가 입력한 값과 서버에 있는 검색어의 substring과 같으면 자동완성에 추가
    );
    if (isKorean) {
      filterData = mydata.filter(
        (i) => i.kor_name.includes(data)
        // 내가 입력한 값과 서버에 있는 검색어의 substring과 같으면 자동완성에 추가
      );
    }
    if (data.length === 0) {
      filterData = [];
    }
    setSearch(filterData);
  };

  return (
    <div className="search">
      <input
        className="search-bar"
        style={{
          marginTop: "3rem",
          width: "60%",
          height: "40px",
          maxWidth: "800px",
        }}
        placeholder="아티스트를 입력하세요."
        onChange={(e) => updateChange(e)}
      ></input>
      {/* 자동 완성 */}
      {search.length > 0 &&
        search.map((item) => {
          return (
            <div
              key={item.id}
              className="search-result"
              style={{ margin: "1rem auto" }}
            >
              {/* <Link to={"/info/" + item.id}> */}
              <p onClick={() => setSearch([])}>
                {item.name} ({item.kor_name})
              </p>
              {/* </Link> */}
            </div>
          );
        })}
    </div>
  );
};

export default SearchBar;

import axios from "axios";
import { Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { Meta } = Card;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Leftbar = () => {
  const [news, setNews] = useState([]);
  const [spin, setSpin] = useState(false);
  const [newSpin, setNewsSpin] = useState(true);
  const [boolean, setBoolean] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const fetch = async () => {
    const { data } = await axios.get(
      "https://newsapi.in/newsapi/news.php?key=UGftyRfGg7YJ4u3FNoeqWSc3Smz244&category=india_english_world"
    );
    console.log(data);
    if (data.success) {
      setNewsSpin(false);
    }
    setNews([...data.News]);
  };
  useEffect(() => {
    fetch();
  }, []);
  const formSubmit = async (e) => {
    setSpin(true);
    e.preventDefault();
    const link = `https://newsapi.in/newsapi/search.php?key=UGftyRfGg7YJ4u3FNoeqWSc3Smz244&q=${searchValue}`;
    const { data } = await axios.get(link);
    console.log(data);
    if (data.success) {
      setSpin(false);
    }
    setNews([...data.News]);
    setBoolean(true);
  };
  return (
    <Wrapper className="flex2">
      <h3>Top News</h3>
      <form onSubmit={formSubmit}>
        <input
          type="text"
          placeholder="search news"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button type="submit" value={"Search"} className="btn">
          Search {spin && <LoadingOutlined />}
        </button>
      </form>
      <div className="newscard">
        {newSpin && (
          <p>
            Loading News...
            <Spin />
          </p>
        )}
        {news.map((news, index) => {
          return (
            <NavLink
              className="card link"
              key={index}
              to={
                boolean
                  ? `/news/${index}/${searchValue}`
                  : `/news/${index}/news`
              }
            >
              <Card
                hoverable
                style={{ width: "auto" }}
                cover={
<<<<<<< HEAD
                  news.image === "" || news.image === null ? (
=======
                  news.image === "" ? (
>>>>>>> 61ba19c83787998eb68bc8afebbf44dd0ac6957d
                    <img src="https://images.unsplash.com/photo-1504464920281-04959fd089db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
                  ) : (
                    <img src={news.image} alt="example" />
                  )
                }
              >
                <Meta title={news.title} description={news.description} />
              </Card>
            </NavLink>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  flex: 1.7;
  padding: 0rem 0.6rem;
  height: 90vh;
  overflow-y: auto;
  h3 {
    font-size: 2rem;
    margin-top: 0.5rem;
    text-align: center;
    padding: 0.4rem;
  }
  p {
    font-size: 3.4rem;
    text-align: center;
    margin-top: 20rem;
    color: #2628272c;
  }
  .newscard {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
  }
  .card {
    width: 90%;
    margin: auto;
  }
  img {
    width: 250px;
    height: 250px;
  }
  .link {
    text-decoration: none;
  }
  form {
    position: relative;
    width: 70%;
    margin: auto;
  }
  input {
    padding: 1.1rem 1rem;
    border: 1px solid #44bf78;
    outline: none;
    border-radius: 5px;
    width: 100%;
  }
  .btn {
    position: absolute;
    right: 2%;
    top: 20%;
    padding: 0.4rem 1rem;
    background-color: #44bf78;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    display: flex;
    gap: 1rem;
  }
  @media screen and (max-width: 768px) {
    flex: 0;
    padding: 0;
  }
`;

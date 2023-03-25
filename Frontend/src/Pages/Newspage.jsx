import React, { useState, useEffect } from "react";
import { Header } from "../componetns/header";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

export const Newspage = () => {
  const [news, setNews] = useState([]);
  const params = useParams();
  const fetch = async () => {
    const { data } =
      params.searchvalue === "news"
        ? await axios.get(
            "https://newsapi.in/newsapi/news.php?key=UGftyRfGg7YJ4u3FNoeqWSc3Smz244&category=india_english_world"
          )
        : await axios.get(
            `https://newsapi.in/newsapi/news.php?key=UGftyRfGg7YJ4u3FNoeqWSc3Smz244&q=${params.searchvalue}`
          );
    console.log(data);
    setNews([...data.News]);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <Wrapper>
      <Header />
      {news.length > 0 && (
        <div className="sectionnews">
          <div className="newscard">
            <Card
              hoverable
              style={{ width: "auto" }}
              cover={
                news[params.index].image === "" ? (
                  <img
                    src="https://images.unsplash.com/photo-1579532536935-619928decd08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fG5ld3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                    className="noimage"
                  />
                ) : (
                  <img src={news[params.index].image} alt="example" />
                )
              }
            >
              <Meta
                title={news[params.index].title}
                description={news[params.index].description}
              />
            </Card>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
  overflow-y: auto;
  .sectionnews {
    display: flex;
    align-items: center;
    padding: 2rem;
  }
  .newscard {
    width: 60%;
    margin: auto;
  }
  p {
    margin-top: 2rem;
  }
  .noimage {
    height: 500px;
  }
  @media screen and (max-width: 768px) {
    .newscard {
      width: 98%;
    }
  }
`;

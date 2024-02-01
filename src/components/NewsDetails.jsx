import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_NEWS, GET_NEWS_BY_ID } from "../apollo/postNews.js";
import { Link } from "react-router-dom";

const NewsDetails = ({ newsContent, loadMore }) => {
  return (
    <div>
      {newsContent.map((news, index) => (
        <NewsDetailsItem key={index} news={news} />
      ))}
      <div ref={loadMore} />
    </div>
  );
};

const NewsDetailsItem = ({ news }) => {
  const Wrapper = styled.section`
    margin: 0px auto;
    display: grid;
    width: 100%;
    max-width: 100%;
    grid-template-columns: minmax(0px, 825px);
    gap: 16px;
    text-align: start;
    margin-bottom: 40px;
  `;

  const ImgLink = styled.img`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    pointer-events: none;
  `;

  const Section = styled.div`
    height: 100%;
    margin-left: 16px;
    display: flex;
    max-width: 100%;
    flex-direction: column;
    -webkit-box-pack: justify;
    justify-content: space-between;
  `;

  const Title = styled.h1`
    color: rgb(15, 23, 42);
    font-size: 40px;
    letter-spacing: -1px;
    line-height: 44px;
    font-weight: 700;
    margin: 12px 0px 0px;
  `;

  const Paragraph = styled.p`
    line-height: 20px;
    font-size: 16px;
    font-weight: 400;
    margin: 0px 0px 10px;
    color: rgb(15, 23, 42);
  `;

  const Link = styled.a`
    text-decoration: none;
  `;

  return (
    <Wrapper>
      <Title>{news.title.short}</Title>
      <ImgLink
        src={`https://i.simpalsmedia.com/point.md/news/370x194/${news.thumbnail}`}
        alt=""
      />
      <Paragraph>{news.description.intro}</Paragraph>
    </Wrapper>
  );
};

const News = () => {
  const client = useApolloClient();
  const [newsContent, setNewsContent] = useState([]);
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(ALL_NEWS, {
    variables: { page },
  });

  useEffect(() => {
    if (!loading && !error) {
      const newsIds = data.contents.map((news) => news.id);

      const promises = newsIds.map((newsId) =>
        client.query({
          query: GET_NEWS_BY_ID,
          variables: { newsId },
        })
      );

      Promise.all(promises)
        .then((results) => {
          const newsData = results.map((result) => result.data.content);
          setNewsContent((prevNews) => [...prevNews, ...newsData]);
        })
        .catch((error) => {
          console.error("Error executing queries:", error);
        });
    }
  }, [loading, error, data, client, page]);

  const handleScroll = useCallback(() => {
    const scrollThreshold = 200;
    if (
      window.innerHeight +
        document.documentElement.scrollTop +
        scrollThreshold >=
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <NewsDetails newsContent={newsContent} loadMore={handleScroll} />;
};

export default News;

import styled from "styled-components";
import React, { useState, useEffect, useCallback } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { ALL_NEWS, GET_NEWS_BY_ID } from "../apollo/postNews.js";
import { Link } from "react-router-dom";

const NewsList = ({ newsContent, loadMore }) => {
  return (
    <div>
      {newsContent.map((news, index) => (
        <NewsItem key={index} news={news} />
      ))}
      <div ref={loadMore} />
    </div>
  );
};

const NewsItem = ({ news }) => {
  const Wrapper = styled.section`
    display: flex;
    text-align: left;
    margin-bottom: 24px;
  `;

  const ImgLink = styled.img`
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

  const Title = styled.h3`
    font-size: 24px;
    line-height: 26px;
    position: relative;
    color: rgb(15, 23, 42);
    letter-spacing: 0px;
    margin: -2.5px 0px 8px;
    font-weight: 500;
    &:hover {
      color: rgb(255, 71, 0);
    }
  `;

  const Paragraph = styled.p`
    line-height: 20px;
    font-size: 16px;
    font-weight: 400;
    margin: 0px 0px 10px;
    color: rgb(15, 23, 42);
  `;

  return (
    <Wrapper>
      <Link className="noDecoration" to={`/newsdetails/${news.url}`}>
        <ImgLink
          src={`https://i.simpalsmedia.com/point.md/news/370x194/${news.thumbnail}`}
          alt=""
        />
      </Link>
      <Section>
        <Link className="noDecoration" to={`/newsdetails/${news.url}`}>
          <Title>{news.title.short}</Title>
        </Link>
        <Paragraph>{news.description.intro}</Paragraph>
      </Section>
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

  return <NewsList newsContent={newsContent} loadMore={handleScroll} />;
};

export default News;

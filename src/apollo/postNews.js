import { gql } from "@apollo/client";

export const ALL_NEWS = gql`
  query AllNews {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      lang: "ru"
      skip: 0
      take: 10
    ) {
      id
    }
  }
`;

export const GET_NEWS_BY_ID = gql`
  query GetNewsById($newsId: String!) {
    content(
      id: $newsId
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      full_url: "business/simpals-novye-rabochie-mesta-dlia-vsekh-zhelaiushchikh"
    ) {
      title {
        short
      }
      description {
        intro
      }
      thumbnail
      url
    }
  }
`;

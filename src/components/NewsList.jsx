import styled from "styled-components";
import News from "./news";

export default function NewsLIst() {
  const Section = styled.div`
    max-width: 1240px;
    margin: 0px auto;
    width: 100%;
    position: relative;
  `;

  const Wrapper = styled.section`
    max-width: 1240px;
    padding: 24px;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
  `;

  const Title = styled.h1`
    color: rgb(15, 23, 42);
    position: relative;
    font-weight: 700;
    text-align: left;
    font-size: 28px;
    margin-bottom: 24px;
  `;

  return (
    <Section>
      <Wrapper>
        <Title>Сегодня</Title>
        <News />
      </Wrapper>
    </Section>
  );
}

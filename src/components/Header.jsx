import styled from "styled-components";
import logo from "/logo.svg";

export default function Header() {
  const Image = styled.img`
    padding: 15px;
  `;

  const Title = styled.span`
    color: rgb(128, 128, 128);
    margin-left: 10px;
    font-size: 13px;
  `;

  return (
    <header>
      <Image src={logo} alt={"News"} />
      <Title>Думай и решай свободно</Title>
    </header>
  );
}

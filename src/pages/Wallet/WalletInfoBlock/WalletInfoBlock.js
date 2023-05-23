import React from "react";
import {
  InnerCircle,
  InnerText,
  SquareBox,
  SquareBoxTitle,
} from "./WalletInfoBlockStyled";

const WalletInfoBlock = (props) => {
  const { title, innerNumber, innerText } = props;

  return (
    <SquareBox className="box" elevation={3}>
      <SquareBoxTitle variant="h6">{title}</SquareBoxTitle>
      <InnerCircle>
        <InnerText>{innerNumber}</InnerText>
        <InnerText>{innerText}</InnerText>
      </InnerCircle>
    </SquareBox>
  );
};

export default WalletInfoBlock;

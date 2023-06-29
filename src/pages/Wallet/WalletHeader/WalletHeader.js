import {
  ContentContainer,
  InnerCircle,
  InnerText,
  PendingTransfers,
  Title,
  TitleContainer,
} from "./WalletHeaderStyled";

const WalletHeader = ({ title }) => {
  return (
    <>
      <ContentContainer>
        <InnerCircle>
          <InnerText>logo</InnerText>
        </InnerCircle>
        <TitleContainer>
          <Title>{title}</Title>
          <PendingTransfers>Pending Transfers - 4</PendingTransfers>
        </TitleContainer>
      </ContentContainer>
    </>
  );
};

export default WalletHeader;

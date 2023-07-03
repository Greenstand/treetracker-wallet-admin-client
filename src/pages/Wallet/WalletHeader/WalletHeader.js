import WalletIcon from "@mui/icons-material/Wallet";
import {
  ContentContainer,
  InnerCircle,
  PendingTransfers,
  Title,
  TitleContainer,
} from "./WalletHeaderStyled";

const WalletHeader = ({ title }) => {
  return (
    <>
      <ContentContainer>
        <InnerCircle>
          <WalletIcon style={{ color: "#fff", fontSize: 70 }} />
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

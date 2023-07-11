import WalletIcon from "@mui/icons-material/Wallet";
import {
  ContentContainer,
  InnerCircle,
  PendingTransfers,
  Title,
  TitleContainer,
} from "./WalletHeaderStyled";

const WalletHeader = ({ title, pendingTransfers, logoURL }) => {
  return (
    <>
      <ContentContainer>
        <InnerCircle>
          {logoURL ? (
            <img src="logoURL" alt="Wallet Logo" />
          ) : (
            <WalletIcon style={{ color: "#fff", fontSize: 70 }} />
          )}
        </InnerCircle>
        <TitleContainer>
          <Title>{title}</Title>
          <PendingTransfers>
            Pending Transfers - {pendingTransfers}
          </PendingTransfers>
        </TitleContainer>
      </ContentContainer>
    </>
  );
};

export default WalletHeader;

import WalletIcon from "@mui/icons-material/Wallet";
import {
  ContentContainer,
  InnerCircle,
  PendingTransfers,
  Title,
  TitleContainer,
} from "./WalletHeaderStyled";

import { useEffect, useState } from "react";
import apiClient from "../../../utils/apiClient";

const WalletHeader = ({ title }) => {
  const [pendingTransfers, setPendingTransfers] = useState(0);

  useEffect(() => {
    apiClient.get("/transfers?state=pending").then((res) => {
      setPendingTransfers(res.data.transfers.length);
    });
  }, []);

  return (
    <>
      <ContentContainer>
        <InnerCircle>
          <WalletIcon style={{ color: "#fff", fontSize: 70 }} />
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

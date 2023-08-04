import styled from "@emotion/styled";
import { Typography, Container } from "@mui/material";

const Logo = "/logo_192x192.png";

export const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // This makes it take up the full height of the viewport
  background-color: #f0f0f0;
`;

export const LogoContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const NotFoundHeader = styled(Typography)`
  font-size: 3rem;
  color: #333;
`;

export const NotFoundText = styled(Typography)`
  font-size: 1.5rem;
  color: #666;
`;

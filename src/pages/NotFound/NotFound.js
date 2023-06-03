// 404 Page

import React from 'react';
import styled from '@emotion/styled';
import { Typography, Container } from '@mui/material';

const Logo = '/logo_192x192.png';

const NotFoundContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // This makes it take up the full height of the viewport
  background-color: #F0F0F0; // This could be a light color for a more modern look
`;

const LogoContainer = styled.div`
  width: 100px; // Adjust size as needed
  height: 100px; // Adjust size as needed
  margin-bottom: 20px;
  background-image: url(${Logo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const NotFoundHeader = styled(Typography)`
  font-size: 3rem; // Increase the font size
  color: #333; // A dark color for contrast
`;

const NotFoundText = styled(Typography)`
  font-size: 1.5rem; // Increase the font size
  color: #666; // A medium-dark color for readability
`;

const NotFound = () => (
  <NotFoundContainer>
    <LogoContainer />
    <NotFoundHeader variant="h2">404</NotFoundHeader>
    <NotFoundText>Page not found</NotFoundText>
  </NotFoundContainer>
);

export default NotFound;

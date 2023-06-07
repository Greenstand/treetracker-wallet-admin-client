import React from 'react';
import { NotFoundContainer, LogoContainer, NotFoundHeader, NotFoundText } from './NotFoundStyled';

const NotFound = () => (
  <NotFoundContainer>
    <LogoContainer />
    <NotFoundHeader variant="h2">404</NotFoundHeader>
    <NotFoundText>Page not found</NotFoundText>
  </NotFoundContainer>
);

export default NotFound;

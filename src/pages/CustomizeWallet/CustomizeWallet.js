import React from 'react';
import {
  ContentContainer,
  // LoaderContainer,
  StyledGrid,
} from './CustomizeWalletStyled';
import PageHeader from '../../components/layout/PageHeader/PageHeader';

const CustomizeWallet = () => {
  return (
    <StyledGrid>
      <PageHeader title="Send tokens" />
      {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
        {errorMessage && (
          <Message
            message={errorMessage}
            onClose={() => setErrorMessage('')}
            messageType={MessageType.Error}
          />
        )}
        {successMessage && (
          <Message
            message={successMessage}
            onClose={() => setSuccessMessage('')}
            messageType={MessageType.Success}
          />
        )}
      </div> */}
      <ContentContainer></ContentContainer>
    </StyledGrid>
  );
};

export default CustomizeWallet;

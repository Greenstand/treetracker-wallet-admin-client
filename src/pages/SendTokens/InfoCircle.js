import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';


const InnerCircle = styled('div')({
  width: '9rem',
  height: '9rem',
  borderRadius: '50%',
  border: '4px solid rgb(134, 194, 50)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const InnerText = styled(Typography)({
  fontSize: 24,
  lineHeight: 1,
  fontWeight: 700,
  color: 'rgb(134, 194, 50)',
});

const InnerSubtext = styled(Typography)({
  fontSize: 12,
  lineHeight: '16px',
  fontWeight: 400,
  marginTop: '1em',
  color: 'rgb(134, 194, 50)',
});

const InfoCircle = (props) => {
  const { innerNumber, innerText } = props;

  return (
    <InnerCircle>
      <InnerText>{innerNumber}</InnerText>
      <InnerSubtext>{innerText}</InnerSubtext>
    </InnerCircle>
  );
};

export default InfoCircle;

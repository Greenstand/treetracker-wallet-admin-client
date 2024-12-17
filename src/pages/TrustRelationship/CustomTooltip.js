import React from 'react';
import { Tooltip, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const CustomTooltipBox = styled(Box)(({ theme }) => ({
    color: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    fontSize: '0.9rem',
    maxWidth: 300,
}));

const CustomTooltipTypography = styled(Typography)({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#e0e0e0',
    },
});

function CustomTooltip({ content, maxChars = 10 }) {
    const truncatedContent =
        content.length > maxChars ? `${content.slice(0, maxChars)}...` : content;

    return (
        <Tooltip
            title={
                <CustomTooltipBox>
                    {content}
                </CustomTooltipBox>
            }
            arrow
        >
            <CustomTooltipTypography>{truncatedContent}</CustomTooltipTypography>
        </Tooltip>
    );
}

export default CustomTooltip;

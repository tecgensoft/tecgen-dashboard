import { Paper, styled } from '@mui/material';
import React from 'react';


const ItemBox = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    boxShadow: "none"
}));
export default function Item({ children }: { children: React.ReactNode }) {
    return (
        <ItemBox>{children}</ItemBox>
    )
}

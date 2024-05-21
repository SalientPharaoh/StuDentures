import { AccountProvider } from '@/context/AccountContext';
import { Container } from '@mui/material';
import React from 'react';
import "../app/globals.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <AccountProvider>
                <Container className="container bg-black text-white">
                    {children}
                </Container>
            </AccountProvider>
        </>
    );
};

export default Layout;

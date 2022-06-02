import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Container from '@mui/material/Container';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function Layout(props) {
  return (
    <Box>
      <Box sx={{ minHeight: '100vh' }}>
        <Header />
        <Container>{props.children}</Container>
      </Box>
      <Footer />
    </Box>
  );
}

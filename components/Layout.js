import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Container from '@mui/material/Container';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script
          src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js"
          crossorigin="anonymous"
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box>
        <Box sx={{ minHeight: '100vh' }}>
          <Header />
          <Container>{props.children}</Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

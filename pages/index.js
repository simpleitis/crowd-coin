import React, { useEffect } from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import CampaignCard from '../components/CampaignCard';

export default function Home({ campaigns }) {
  return (
    <>
      <Head>
        <title>CrowdCoin</title>
        <meta name="description" content="CrowdCoin homepage" />
      </Head>
      <Container sx={{}}>
        <Card
          elevation={0}
          sx={{
            width: '60%',
            marginTop: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: { xs: '1rem', sm: '2rem', md: '4rem' },
            minHeight: '80vh'
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image="collaboration.jpg"
            alt="home page image"
          />
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Hind Siliguri',
                fontWeight: '500',
              }}
            >
              Open campaign
            </Typography>
          </Grid>
          {campaigns.map((address, index) => (
            <CampaignCard key={index} address={address} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
export async function getServerSideProps() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: { campaigns },
  };
}

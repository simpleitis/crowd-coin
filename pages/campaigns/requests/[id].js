import React, { Component } from 'react';
import Link from 'next/link';
import RequestRow from '../../../components/RequestRow';
import factory from '../../../ethereum/factory';
import Campaign from '../../../ethereum/campaign';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const getStaticPaths = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  const paths = campaigns.map((address, index) => ({
    params: { id: address.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const address = context.params.id;
  const campaign = Campaign(address);
  const requestCount = +(await campaign.methods.getRequestsCount().call());
  const approversCount = await campaign.methods.approversCount().call();

  var requests = await Promise.all(
    Array(requestCount)
      .fill()
      .map((element, index) => {
        var request = campaign.methods.requests(index).call();
        return request;
      })
  );

  requests = await JSON.parse(JSON.stringify(requests));
  return {
    props: {
      address: address,
      requestCount: requestCount,
      approversCount: approversCount,
      requests: requests,
    },
  };
};

export default function RequestIndex(props) {
  const renderRows = () => {
    return props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={props.address}
          approversCount={props.approversCount}
        />
      );
    });
  };

  return (
    <Container sx={{ marginLeft: { xs: '1rem' } }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Link href={`/campaigns/requests/new/${props.address}`}>
            <Button
              variant="contained"
              sx={{
                margin: '5px 0 0 0',
                fontSize: { xs: '0.6rem', sm: 'default' },
                textTransform: 'none',
                backgroundColor: '#006bde',
              }}
            >
              Create request
            </Button>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Amout</TableCell>
                  <TableCell align="center">Recipient</TableCell>
                  <TableCell align="center">Approval count</TableCell>
                  <TableCell align="center">Approve</TableCell>
                  <TableCell align="center">Finalize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderRows()}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Typography mt={1}>Found {props.requestCount} requests</Typography>
    </Container>
  );
}

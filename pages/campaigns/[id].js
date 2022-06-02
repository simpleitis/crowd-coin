import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import Link from 'next/link';
import factory from '../../ethereum/factory';
import CampaignDetails from '../../components/CampaignDetails';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      address: address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};

export default function CampaignShow(props) {
  function getValues() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution (wei)',
        description:
          'You must contribute atleast this much wei to become an approver',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: requestsCount,
        meta: 'Number of request',
        description: 'A request tries to withdraw money from the contract',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of people who have already donated to this campaign',
        style: { overflowWrap: 'break-word' },
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description:
          'The balance is how much money this campaign has left to spend',
        style: { overflowWrap: 'break-word' },
      },
    ];

    return items;
  }

  return (
    <Container>
      <CampaignDetails items={getValues()} />
      <Link href={`/campaigns/requests/${props.address}`}>
        <Button variant="contained" sx={{ marginTop: '0.5rem' }}>
          View request
        </Button>
      </Link>
      <Link href={`/campaigns/contribute/${props.address}`}>
        <Button
          variant="outlined"
          sx={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}
        >
          Contribute
        </Button>
      </Link>
    </Container>
  );
}

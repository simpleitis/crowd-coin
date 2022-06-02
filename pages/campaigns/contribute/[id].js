import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import { useRouter } from 'next/router';
import factory from '../../../ethereum/factory';
import Campaign from '../../../ethereum/campaign';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'material-ui-image';
import SendIcon from '@mui/icons-material/Send';

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

  return {
    props: {
      address: address,
    },
  };
};

// export const getStaticProps = async (context) => {
//   const address = context.params.id;
//   const campaign = Campaign(address);
//   const summary = await campaign.methods.getSummary().call();

//   return {
//     props: {
//       address: address,
//       minimumContribution: summary[0],
//       balance: summary[1],
//       requestsCount: summary[2],
//       approversCount: summary[3],
//       manager: summary[4],
//     },
//   };
// };

export default function Contribute({ address }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(address);

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }

    setLoading(false);
    setValue('');
  };

  return (
      <>
        <Grid container spacing={2}>
          <Grid
            item
            xs={10}
            sm={10}
            md={4}
            sx={{ marginLeft: '5%', marginTop: '10%' }}
          >
            <Typography
              variant="h5"
              mb={2}
              sx={{ color: '#3f3d56', fontWeight: '500' }}
            >
              Contribute
            </Typography>
            <Box sx={{ flexGrow: 1 }} component={'form'} onSubmit={onSubmit}>
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                variant="outlined"
                fullWidth
                autoComplete="off"
                error={!!errorMessage}
                helperText={errorMessage}
                id="standard-error-helper-text"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">ETH</InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                variant="contained"
                type="submit"
                onClick={onSubmit}
                loading={loading}
                endIcon={<SendIcon />}
                sx={{ marginTop: '0.5rem' }}
              >
                Send
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item xs={10} sm={10} md={4} sx={{ margin: 'auto' }}>
            <Image src="/contribute.svg" width="2rem" />
          </Grid>
        </Grid>
    </>
  );
}

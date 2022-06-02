import React, { useState } from 'react';
import factory from '../../../../ethereum/factory';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Image from 'material-ui-image';

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

export default function RequestNew(props) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(props.address);
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      router.push(`/campaigns/requests/${props.address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
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
              Create request
            </Typography>
            <Box sx={{ flexGrow: 1 }} component={'form'} onSubmit={onSubmit}>
              <TextField
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                label="Description"
                variant="outlined"
                fullWidth
                autoComplete="off"
                error={!!errorMessage}
                helperText={errorMessage}
                id="standard-error-helper-text"
              />
              <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                label="Value in ether"
                variant="outlined"
                fullWidth
                autoComplete="off"
                error={!!errorMessage}
                helperText={errorMessage}
                id="standard-error-helper-text"
                sx={{ marginTop: '1rem' }}
              />
              <TextField
                value={recipient}
                onChange={(event) => setRecipient(event.target.value)}
                label="Recipient"
                variant="outlined"
                fullWidth
                autoComplete="off"
                error={!!errorMessage}
                helperText={errorMessage}
                id="standard-error-helper-text"
                sx={{ marginTop: '1rem' }}
              />
              <LoadingButton
                variant="contained"
                type="submit"
                onClick={onSubmit}
                loading={loading}
                endIcon={<SendIcon />}
                sx={{ marginTop: '1rem' }}
              >
                Create
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item xs={10} sm={10} md={4} sx={{ margin: 'auto' }}>
            <Image src="/newRequest.svg" width="2rem" />
          </Grid>
        </Grid>
      </>
  );
}

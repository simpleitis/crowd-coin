import React, { useState } from 'react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'material-ui-image';
import Container from '@mui/material/Container';

export default function CampaignNew() {
  const [title, setTitle] = useState('');
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution, title).send({
        from: accounts[0],
      });

      router.push('/');
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
          xs={12}
          sm={12}
          md={4}
          sx={{ marginLeft: '5%', marginTop: '10%' }}
        >
          <Typography
            variant="h5"
            mb={2}
            sx={{ color: '#3f3d56', fontWeight: '500' }}
          >
            Create a campaign
          </Typography>
          <Box sx={{ flexGrow: 1 }} component={'form'} onSubmit={onSubmit}>
            <TextField
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              label="Title"
              variant="outlined"
              fullWidth
              autoComplete="off"
              error={!!errorMessage}
              helperText={errorMessage}
              id="standard-error-helper-text"
              sx={{ marginBottom: '1rem' }}
            />
            <TextField
              value={minimumContribution}
              onChange={(event) => setMinimumContribution(event.target.value)}
              label="Minimum Contribution"
              variant="outlined"
              fullWidth
              autoComplete="off"
              error={!!errorMessage}
              helperText={errorMessage}
              id="standard-error-helper-text"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Wei</InputAdornment>
                ),
              }}
            />
            <LoadingButton
              variant="contained"
              type="submit"
              onClick={onSubmit}
              loading={loading}
              sx={{ marginTop: '1.5rem' }}
            >
              Create
            </LoadingButton>
          </Box>
        </Grid>
        <Grid item xs={10} sm={10} md={4} sx={{ margin: 'auto' }}>
          <Image src="/newCampaign.svg" width="2rem" />
        </Grid>
      </Grid>
    </>
  );
}

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Note({ address }) {
  const [name, setName] = React.useState('');
  const details = async () => {
    const campaign = Campaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      setName(await campaign.methods.name().call());
    } catch (err) {
      setErrorMessage(err.message);
    }
  }
  details();
  
  return (
    <Grid item xs={12} md={5.6}>
      <Card>
        <CardContent>
          <Typography
            sx={{
              flexGrow: '1',
              fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
              color: '#006bde',
              fontWeight: '500',
              paddingTop: '2rem',
              align: 'center',
              paddingTop: '0px',
            }}
            marginTop="auto"
          >
            {String(name)}
          </Typography>

          <Link href={`/campaigns/${address}`}>
            <Button
              variant="outlined"
              align="right"
              sx={{
                marginTop: '1rem',
                borderRadius: '2rem',
                textTransform: 'none',
                ':hover': {
                  backgroundColor: '#006bde',
                  color: 'white',
                },
              }}
            >
              View Campaign
              <KeyboardArrowRightIcon />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
}

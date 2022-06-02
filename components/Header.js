import React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Header() {
  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: 'white',
        }}
      >
        <Toolbar>
          <Link href="/">
            <Typography
              sx={{
                flexGrow: 1,
                ':hover': { backgroundColor: 'white' },
              }}
            >
              <Button
                align="right"
                disableRipple
                startIcon={
                  <Avatar
                    src="money.png"
                    variant="square"
                    sx={{ width: 40, height: 40 }}
                  />
                }
                sx={{ ':hover': { backgroundColor: 'white' } }}
              >
                <Typography
                  sx={{
                    color: '#006bde',
                    textTransform: 'none',
                    fontSize: {
                      xs: '2rem',
                      sm: '2.5rem',
                      md: '3rem',
                    },
                    paddingTop: '0.6rem',
                    margin: 0,
                    fontFamily: 'Hind Siliguri',
                    fontWeight: '700',
                    borderBlockColor: 'white',
                    ':hover': { backgroundColor: 'white' },
                  }}
                >
                  CrowdCoin
                </Typography>
              </Button>
            </Typography>
          </Link>
          <Link href="/campaigns/new">
            <Typography
              component="div"
              align="right"
              sx={{
                color: '#006bde',
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                align="right"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  textTransform: 'none',
                  fontSize: {
                    xs: '0.5rem',
                    sm: '1rem',
                    md: '1rem',
                  },
                  padding: '0.4rem',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  ':hover': { backgroundColor: '#006bde', color: 'white' },
                }}
              >
                New Campaign
              </Button>
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

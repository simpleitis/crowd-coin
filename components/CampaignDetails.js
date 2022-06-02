import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CampaignCards({ items }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={10} sm={10} md={6}>
        <Card>
          <CardContent>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '2.5rem', md: '2rem' },
                color: '#006bde',
                fontWeight: '500',
                align: 'center',
              }}
              marginTop="auto"
            >
              {String(items[0].header).slice(0, 5) +
                '...' +
                String(items[0].header).slice(-4)}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {items[0].meta}
            </Typography>
            <Typography variant="body2">{items[0].description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} sm={10} md={6}>
        <Card>
          <CardContent>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '2.5rem', md: '2rem' },
                color: '#006bde',
                fontWeight: '500',
                align: 'center',
                paddingTop: '0px',
              }}
              marginTop="auto"
            >
              {items[1].header}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {items[1].meta}
            </Typography>
            <Typography variant="body2">{items[1].description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} sm={10} md={6}>
        <Card>
          <CardContent>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '2.5rem', md: '2rem' },
                color: '#006bde',
                fontWeight: '500',
                align: 'center',
                paddingTop: '0px',
              }}
              marginTop="auto"
            >
              {items[2].header}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {items[2].meta}
            </Typography>
            <Typography variant="body2">{items[2].description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} sm={10} md={6}>
        <Card>
          <CardContent>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '2.5rem', md: '2rem' },
                color: '#006bde',
                fontWeight: '500',
                align: 'center',
                paddingTop: '0px',
              }}
              marginTop="auto"
            >
              {items[3].header}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {items[3].meta}
            </Typography>
            <Typography variant="body2">{items[3].description}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={10} sm={10} md={6}>
        <Card>
          <CardContent>
            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '2.5rem', md: '2rem' },
                color: '#006bde',
                fontWeight: '500',
                align: 'center',
                paddingTop: '0px',
              }}
              marginTop="auto"
            >
              {items[4].header}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {items[4].meta}
            </Typography>
            <Typography variant="body2">{items[4].description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

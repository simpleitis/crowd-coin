import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Credits() {
  return (
    <Container sx={{ background: 'black' }}>
      <Typography>
        <a href="https://www.flaticon.com/free-icons/coin" title="coin icons">
          Coin icons created by Freepik - Flaticon
        </a>
        ;
      </Typography>
      <Typography>
        <a href="https://www.freepik.com/vectors/about-page">
          About page vector created by pikisuperstar - www.freepik.com
        </a>
      </Typography>
      <Typography></Typography>
      <Typography></Typography>
      <Typography></Typography>
    </Container>
  );
}

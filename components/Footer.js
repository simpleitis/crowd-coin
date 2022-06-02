import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../components/Footer.module.css';

export default function Footer() {
  return (
    <footer style={{ background: '#333333' }}>
      <Container
        sx={{
          backgroundColor: '#333333',
          color: 'white',
          paddingTop: { xs: '1rem', sm: '2rem', md: '4rem' },
          marginTop: { xs: '3rem', sm: '3rem' },
        }}
      >
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box pb={2}>
                <Typography>Help</Typography>
              </Box>
              <Box>
                <Link href="/">
                  <Typography className={styles.footerLink}>Contact</Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <Typography className={styles.footerLink}>Support</Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <Typography className={styles.footerLink}>Privacy</Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box pb={2}>
                <Typography className="footerLink">Social</Typography>
              </Box>
              <Box>
                <Link href="/">
                  <Typography className={styles.footerLink}>
                    Facebook
                  </Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/">
                  <Typography className={styles.footerLink}>Twitter</Typography>
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  <Typography className={styles.footerLink}>
                    Instagram
                  </Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box pb={2}>
                <Typography>Credits</Typography>
              </Box>
              <Box>
                <Link href="/credits">
                  <Typography className={styles.footerLink}>Links</Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} p={{ xs: '3rem', sm: 'rem' }}>
            MyVote &copy; {new Date().getFullYear()}
          </Grid> */}
          <Grid item xs={12} sm={4}>
            <Box pt={5} pb={5}>
              <Typography className="footerLink">
                CrowdCoin &copy; {new Date().getFullYear()}
              </Typography>
            </Box>
          </Grid>
        </Container>
      </Container>
    </footer>
  );
}

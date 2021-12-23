import { Card, Grid, Typography } from '@material-ui/core';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import useStyles from './styles';

const Home = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container} justifyContent='space-evenly' alignItems='center'>
            <Grid container className={classes.cardContainer} justifyContent='space-evenly'>
                <Grid item >
                    <Card className={classes.cardLeft}>
                        <QrCodeScannerIcon sx={{ fontSize: 150 }}/>
                        <Typography>Scan QR</Typography>
                    </Card>
                </Grid>
                <Grid item >
                    <Card className={classes.cardRight}>
                        <QrCodeScannerIcon sx={{ fontSize: 150 }}/>
                        <Typography>Scan QR</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justifyContent='space-evenly'>
                <Grid item >
                    <Card className={classes.cardLeft}>
                        <QrCodeScannerIcon sx={{ fontSize: 150 }}/>
                        <Typography>Scan QR</Typography>
                    </Card>
                </Grid>
                <Grid item >
                    <Card className={classes.cardRight}>
                        <QrCodeScannerIcon sx={{ fontSize: 150 }}/>
                        <Typography>Scan QR</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;
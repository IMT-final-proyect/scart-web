import { Card, Grid, Typography } from '@material-ui/core';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../navigation/routes';
import useStyles from './styles';

const Home = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Grid container className={classes.container} justifyContent='space-evenly' alignItems='center'>
            <Grid item >
                <Card className={classes.cardLeft} onClick={() => {history.push(ROUTES.root+ROUTES.scanner)}}>
                    <QrCodeScannerIcon sx={{ fontSize: 150 }}/>
                    <Typography>Scan QR</Typography>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Home;
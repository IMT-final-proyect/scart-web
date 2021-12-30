import { Card, Grid, Typography } from '@material-ui/core';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArticleIcon from '@mui/icons-material/Article';
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
                        <AssignmentIndIcon sx={{ fontSize: 150 }}/>
                        <Typography>Mis datos</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justifyContent='space-evenly'>
                <Grid item >
                    <Card className={classes.cardLeft}>
                        <ArticleIcon sx={{ fontSize: 150 }}/>
                        <Typography>Mi Documentación</Typography>
                    </Card>
                </Grid>
                <Grid item >
                    <Card className={classes.cardRight}>
                        <DirectionsCarIcon sx={{ fontSize: 150 }}/>
                        <Typography>Vehiculos</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;
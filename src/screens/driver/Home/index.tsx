import { Card, Grid, Typography } from '@material-ui/core';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArticleIcon from '@mui/icons-material/Article';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../../redux/rootReducer';
import { getDriverData } from '../../../redux/slices/userSlice';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../navigation/routes'
import { isDriverUpToDate } from '../../../redux/slices/resourcesSlice';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const id = useSelector((state: RootState) => state.user.accountData?.entityId)
    const isValid = useSelector((state: RootState) => state.resources.drivers.driverUpToDate)

    useEffect(() => {
        dispatch(getDriverData(id))
        dispatch(isDriverUpToDate(id))
    }, [dispatch, id])

    return (
        <Grid container className={classes.container} justifyContent='space-evenly' alignItems='center'>
            <Grid container className={classes.status} >
                {isValid ? 
                <Grid container className={classes.enabled}>
                    <Typography className={classes.statusText}>Usted está habilitado para acceder a la planta</Typography>
                </Grid>
                :
                <Grid container className={classes.disabled}>
                    <Typography className={classes.statusText}>Usted NO está habilitado para acceder a la planta</Typography>
                </Grid>
                }
            </Grid>
            <Grid container className={classes.cardContainer} justifyContent='space-evenly'>
                <Grid item >
                    <Card className={classes.cardLeft}  onClick={() => history.push(ROUTES.root+ROUTES.QR)}>
                        <QrCodeScannerIcon sx={{ fontSize: 150 }}/>
                        <Typography>Scan QR</Typography>
                    </Card>
                </Grid>
                <Grid item >
                    <Card className={classes.cardRight} onClick={() => history.push(ROUTES.root+ROUTES.myData)}>
                        <AssignmentIndIcon sx={{ fontSize: 150 }}/>
                        <Typography>Mis datos</Typography>
                    </Card>
                </Grid>
            </Grid>
            <Grid container justifyContent='space-evenly'>
                <Grid item >
                    <Card className={classes.cardLeft} onClick={() => history.push(ROUTES.root+ROUTES.myDocuments)}>
                        <ArticleIcon sx={{ fontSize: 150 }}/>
                        <Typography>Mi Documentación</Typography>
                    </Card>
                </Grid>
                <Grid item >
                    <Card className={classes.cardRight} onClick={() => history.push(ROUTES.root+ROUTES.myVehicles)}>
                        <DirectionsCarIcon sx={{ fontSize: 150 }}/>
                        <Typography>Vehiculos</Typography>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;
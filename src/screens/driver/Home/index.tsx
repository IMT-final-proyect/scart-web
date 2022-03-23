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
import vehicleIcon from '../../../assets/icons/truck.png';
import qrIcon from '../../../assets/icons/qr-code.png';
import documentsIcon from '../../../assets/icons/file.png';
import userIcon from '../../../assets/icons/resume.png';

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
            <Grid container className={classes.cardContainer} justifyContent='space-evenly' spacing={2} >
                <Grid item xs={6} md={3}>
                    <Card className={classes.card}  onClick={() => history.push(ROUTES.root+ROUTES.QR)}>
                        {/* <QrCodeScannerIcon sx={{ fontSize: 150 }}/> */}
                        <img src={qrIcon} alt="Mostrar QR" className={classes.img} />
                        <p className={classes.text}>Mostrar QR</p>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.card} onClick={() => history.push(ROUTES.root+ROUTES.myData)}>
                        {/* <AssignmentIndIcon sx={{ fontSize: 150 }}/> */}
                        <img src={userIcon} alt="Mis Datos" className={classes.img}/>
                        <p className={classes.text}>Mis Datos</p>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.card} onClick={() => history.push(ROUTES.root+ROUTES.myDocuments)}>
                        {/* <ArticleIcon sx={{ fontSize: 150 }}/> */}
                        <img src={documentsIcon} alt="Mi Documentacion" className={classes.img}/>
                        <p className={classes.text}>Mi Documentación</p>
                    </Card>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card className={classes.card} onClick={() => history.push(ROUTES.root+ROUTES.myVehicles)}>
                        {/* <DirectionsCarIcon sx={{ fontSize: 150 }}/> */}
                        <img src={vehicleIcon} alt="Vehiculos" className={classes.img} />
                        <p className={classes.text}>Vehiculos</p>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home;
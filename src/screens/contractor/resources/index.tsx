import { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Snackbar, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Driver from './components/driverRow';
import Vehicle from './components/vehicleRow';
import { Link } from 'react-router-dom';
import { ROUTES } from '../navigation/routes';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver, createVehicle, getDriver, getVehicle } from '../../../redux/slices/resourcesSlice';
import { RootState } from '../../../redux/rootReducer';
import moment from 'moment';
import CreateDriverModal from './components/createDriverModal';
import CreateVehicleModal from './components/createVehicleModal';
import { IDriver, IVehicle } from '../../../utils/interfaces';
import { Alert } from '@mui/material';


const Resources = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openDriverModal, setOpenDriverModal] = useState(false)
    const [openVehicleModal, setOpenVehicleModal] = useState(false)
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const [openDriverSuccess, setOpenDriverSuccess] = useState(false)
    const [openVehicleSuccess, setOpenVehicleSuccess] = useState(false)
    const contractorId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const drivers: IDriver[] = useSelector((state: RootState) => state.resources.drivers.data)
    const vehicles: IVehicle[] = useSelector((state: RootState) => state.resources.vehicles.data)
    const error = useSelector((state: RootState) => state.resources.drivers.error)
    const driverSuccess = useSelector((state: RootState) => state.resources.drivers.success)
    const vehicleSuccess = useSelector((state: RootState) => state.resources.vehicles.success)

    useEffect(() => {
        dispatch(getDriver())
        dispatch(getVehicle())
    }, [])

    useEffect(() => {
        if (!!error)
            setOpenSnackbarError(true)
    }, [error])

    useEffect(() => {
        setOpenDriverSuccess(driverSuccess)
    }, [driverSuccess])

    useEffect(() => {
        setOpenDriverSuccess(vehicleSuccess)
    }, [vehicleSuccess])
    
    const addDriver = (username: string, password: string, name: string, surname: string, cuit: string, birthdate: moment.Moment) => {
        if(!!contractorId){
            dispatch(createDriver(username, password, name, surname, cuit, moment(birthdate), contractorId))
            setOpenDriverModal(false)
        }
    }

    const addVehicle = (brand: string, model: string, year: string, plate: string) => {
        if(!!contractorId){
            dispatch(createVehicle(plate, brand, model, year, contractorId))
            setOpenVehicleModal(false)
        }
    }

    return (
        <>
        <Modal open={openDriverModal} onClose={() => setOpenDriverModal(false)}>
            <CreateDriverModal
                setOpenDriverModal={setOpenDriverModal}
                addDriver={addDriver}
            />
        </Modal>
        <Modal open={openVehicleModal} onClose={() => setOpenVehicleModal(false)}>
            <CreateVehicleModal
                setOpenVehicleModal={setOpenVehicleModal}
                addVehicle={addVehicle}
            />
        </Modal>
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Card className={classes.leftCard}>
                    <Grid container className={classes.titleContainer} justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Conductores asociados
                        </text>
                        <Button onClick={() => setOpenDriverModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    {drivers.length === 0 ?
                        <text className={classes.textCenter}> No existen conductores asociados</text>
                        :
                        <>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Conductor
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Documento
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Fecha Nac.
                                    </text>
                                </Grid>
                                <Grid item xs={2} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Acciones
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' justifyContent='space-between' >
                                {Object.keys(drivers).map((key: string, i: any) =>
                                    <Button
                                        key={i}
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.driver+'/'+drivers[parseInt(key)].id}
                                    >  
                                        <Driver 
                                            name={drivers[parseInt(key)].name}
                                            surname={drivers[parseInt(key)].surname}
                                            document={drivers[parseInt(key)].cuit}
                                            birthday={drivers[parseInt(key)].birth_date}
                                        />
                                    </Button>
                                )}
                            </Grid>
                        </>
                    }
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Card className={classes.rightCard}>
                    <Grid container className={classes.titleContainer} justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Vehículos asociados
                        </text>
                        <Button onClick={() => setOpenVehicleModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    {vehicles.length === 0 ?
                        <text className={classes.textCenter}> No existen vehículos asociados</text>
                        :
                        <>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Marca
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Modelo
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Patente
                                    </text>
                                </Grid>
                                <Grid item xs={2} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Acciones
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column'>
                                {Object.keys(vehicles).map((key: string, i: any) =>
                                    <Button
                                        key={i}
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.vehicle+'/'+vehicles[parseInt(key)].id}
                                    >  
                                        <Vehicle 
                                            brand={vehicles[parseInt(key)].brand}
                                            model={vehicles[parseInt(key)].model}
                                            plate={vehicles[parseInt(key)].plate}
                                        />
                                    </Button>
                                )}
                            </Grid>
                        </>
                    }
                    <Snackbar className={classes.snackbar} open={openSnackbarError} autoHideDuration={6000} onClose={() => setOpenSnackbarError(false)} >
                        <Alert onClose={() => setOpenSnackbarError(false)} severity="error" sx={{ width: '50%' }}>
                            {error?.message}
                        </Alert>
                    </Snackbar>
                    <Snackbar className={classes.snackbar} open={openDriverSuccess} autoHideDuration={6000} onClose={() => setOpenDriverSuccess(false)} >
                        <Alert onClose={() => setOpenDriverSuccess(false)} severity="success" sx={{ width: '50%' }}>
                            Conductor creado con éxito
                        </Alert>
                    </Snackbar>
                    <Snackbar className={classes.snackbar} open={openVehicleSuccess} autoHideDuration={6000} onClose={() => setOpenVehicleSuccess(false)} >
                        <Alert onClose={() => setOpenVehicleSuccess(false)} severity="success" sx={{ width: '50%' }}>
                            Vehículo creado con éxito
                        </Alert>
                    </Snackbar>
                </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default Resources;
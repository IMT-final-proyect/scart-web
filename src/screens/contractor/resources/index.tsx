import { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Snackbar, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Driver from './components/driverRow';
import Vehicle from './components/vehicleRow';
import { Link } from 'react-router-dom';
import { ROUTES } from '../navigation/routes';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDrivers, getAllVehicles, createDriver, createVehicle } from '../../../redux/slices/resourcesSlice';
import { RootState } from '../../../redux/rootReducer';
import moment from 'moment';
import CreateDriverModal from './components/createDriverModal';
import CreateVehicleModal from './components/createVehicleModal';
import { IDriver, IVehicle } from '../../../utils/interfaces';
import { Alert } from '@mui/material';
import CustomInput from '../../../components/customInput'


const Resources = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openDriverModal, setOpenDriverModal] = useState(false)
    const [openVehicleModal, setOpenVehicleModal] = useState(false)
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const [openDriverSuccess, setOpenDriverSuccess] = useState(false)
    const [openVehicleSuccess, setOpenVehicleSuccess] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchDocument, setSearchDocument] = useState('')
    const [searchPlate, setSearchPlate] = useState('')
    const [driversFiltered, setDriversFiltered] = useState<IDriver[]>([])
    const [vehiclesFiltered, setVehiclesFiltered] = useState<IVehicle[]>([])
    const [loadingDriversFilter, setLoadingDriversFilter] = useState(false)
    const [loadingVehiclesFilter, setLoadingVehiclesFilter] = useState(false)
    const contractorId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const drivers: IDriver[] = useSelector((state: RootState) => state.resources.drivers.data)
    const vehicles: IVehicle[] = useSelector((state: RootState) => state.resources.vehicles.data)
    const error = useSelector((state: RootState) => state.resources.drivers.error)
    const loadingDrivers = useSelector((state: RootState) => state.resources.drivers.loading)
    const loadingVehicles = useSelector((state: RootState) => state.resources.vehicles.loading)
    const driverSuccess = useSelector((state: RootState) => state.resources.drivers.success)
    const vehicleSuccess = useSelector((state: RootState) => state.resources.vehicles.success)

    useEffect(() => {
        dispatch(getAllDrivers(contractorId))
        dispatch(getAllVehicles(contractorId))
    }, [contractorId, dispatch])

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

    useEffect(() => {
        setDriversFiltered(() => {
            let driversAux: IDriver[] = []
            Object.keys(drivers).map((key: string, i: any) => {
                driversAux.push(drivers[parseInt(key)])
            })
            return driversAux
        })
    }, [drivers])

    
    useEffect(() => {
        setLoadingDriversFilter(true)
        let driversAux: IDriver[] = []
        if(searchName !== '' || searchDocument !== ''){
            if(searchDocument === ''){
                Object.keys(drivers).map((key: string, i: any) => {
                    const driverName = drivers[parseInt(key)].name.toUpperCase() + ' ' + drivers[parseInt(key)].surname.toUpperCase()
                    if (driverName.includes(searchName.toUpperCase()))
                    driversAux.push(drivers[parseInt(key)])
                })
            }
            else{
                if(searchName === ''){
                    Object.keys(drivers).map((key: string, i: any) => {
                        if (drivers[parseInt(key)].cuit.includes(searchDocument))
                        driversAux.push(drivers[parseInt(key)])
                    })
                }
                else{
                    Object.keys(drivers).map((key: string, i: any) => {
                        const driverName = drivers[parseInt(key)].name.toUpperCase() + ' ' + drivers[parseInt(key)].surname.toUpperCase()
                        if (driverName.includes(searchName.toUpperCase()) && drivers[parseInt(key)].cuit.includes(searchDocument))
                        driversAux.push(drivers[parseInt(key)])
                    })
                }
            }
        }
        else{
            Object.keys(drivers).map((key: string, i: any) => {
                driversAux.push(drivers[parseInt(key)])
            })
        }
        setDriversFiltered(driversAux)
        setLoadingDriversFilter(false)
    }, [searchName, searchDocument, drivers])

    useEffect(() => {
        setVehiclesFiltered(() => {
            let vehiclesAux: IVehicle[] = []
            Object.keys(vehicles).map((key: string, i: any) => {
                vehiclesAux.push(vehicles[parseInt(key)])
            })
            return vehiclesAux
        })
    }, [vehicles])

    useEffect(() => {
        setLoadingVehiclesFilter(true)
        let vehiclesAux: IVehicle[] = []
        if(searchPlate !== ''){
            Object.keys(vehicles).map((key: string, i: any) => {
                const vehiclePlate = vehicles[parseInt(key)].plate.toUpperCase()
                if (vehiclePlate.includes(searchPlate.toUpperCase()))
                    vehiclesAux.push(vehicles[parseInt(key)])
            })
        }
        else{
            Object.keys(vehicles).map((key: string, i: any) => {
                vehiclesAux.push(vehicles[parseInt(key)])
            })
        }
        setVehiclesFiltered(vehiclesAux)
        setLoadingVehiclesFilter(false)
    }, [searchPlate, vehicles])
    
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
                    <Grid container justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Conductores asociados
                        </text>
                        <Button onClick={() => setOpenDriverModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                            <Grid item xs={10} md={5}>
                                <CustomInput variant='outlined' className={classes.input} value={searchName} setValue={setSearchName} placeholder={'Nombre + Apellido'} size='small' />
                            </Grid>
                            <Grid item xs={10} md={5}>
                                <CustomInput variant='outlined' className={classes.input} value={searchDocument} setValue={setSearchDocument}  placeholder={'Documento'} size='small'/>
                            </Grid>
                    </Grid>
                </Card> 
                {loadingDriversFilter || loadingDrivers ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Card className={classes.vehicleCard}>
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
                                {Object.keys(driversFiltered).map((key: string, i: any) =>
                                    <Button
                                        key={i}
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.driver+'/'+driversFiltered[parseInt(key)].id}
                                    >  
                                        <Driver 
                                            name={driversFiltered[parseInt(key)].name}
                                            surname={driversFiltered[parseInt(key)].surname}
                                            document={driversFiltered[parseInt(key)].cuit}
                                            birthday={driversFiltered[parseInt(key)].birth_date}
                                        />
                                    </Button>
                                )}
                            </Grid>
                        </>
                    }
                </Card>
            }
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Card className={classes.rightCard}>
                    <Grid container justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Vehículos asociados
                        </text>
                        <Button onClick={() => setOpenVehicleModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                            <Grid item xs={12}>
                                <CustomInput variant='outlined' className={classes.input} value={searchPlate} setValue={setSearchPlate} placeholder={'Patente'} size='small' />
                            </Grid>
                    </Grid>
                </Card> 
                {loadingVehiclesFilter || loadingVehicles ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                    <Card className={classes.vehicleCard}>
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
                                    {Object.keys(vehiclesFiltered).map((key: string, i: any) =>
                                        <Button
                                            key={i}
                                            className={classes.button}
                                            component={Link}
                                            to={ROUTES.root+ROUTES.vehicle+'/'+vehiclesFiltered[parseInt(key)].id}
                                        >  
                                            <Vehicle 
                                                brand={vehiclesFiltered[parseInt(key)].brand}
                                                model={vehiclesFiltered[parseInt(key)].model}
                                                plate={vehiclesFiltered[parseInt(key)].plate}
                                            />
                                        </Button>
                                    )}
                                </Grid>
                            </>
                        }
                    </Card>
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
            </Grid>
        </Grid>
        </>
    )
}

export default Resources;
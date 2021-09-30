import { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Driver from './components/driverRow';
import Vehicle from './components/vehicleRow';
import { Link } from 'react-router-dom';
import { ROUTES } from '../navigation/routes';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver, createVehicle, getDriver, getVehicle, IDriver, IVehicle } from '../../../redux/slices/contractorSlices/resourcesSlice';
import { RootState } from '../../../redux/rootReducer';
import moment from 'moment';
import CreateDriverModal from './components/createDriverModal';
import CreateVehicleModal from './components/createVehicleModal';


const Resources = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openDriverModal, setOpenDriverModal] = useState(false)
    const [openVehicleModal, setOpenVehicleModal] = useState(false)
    const contractorId = useSelector((state: RootState) => state.user.userData?.id)
    const drivers: IDriver[] = useSelector((state: RootState) => state.resources.drivers.data)
    const vehicles: IVehicle[] = useSelector((state: RootState) => state.resources.vehicles.data)

    useEffect(() => {
        dispatch(getDriver())
        dispatch(getVehicle())
    }, [])
    
    const addDriver = (name: string, surname: string, cuit: string, birthdate: moment.Moment) => {
        if(!!contractorId){
            dispatch(createDriver(name, surname, cuit, moment(birthdate), contractorId))
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
                        <Typography className={classes.textCenter}> No existen conductores asociados</Typography>
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
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.driver+'/'+drivers[parseInt(key)].id}
                                    >  
                                        <Driver 
                                            key={i}
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
                            Vehiculos asociados
                        </text>
                        <Button onClick={() => setOpenVehicleModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    {vehicles.length === 0 ?
                        <Typography className={classes.textCenter}> No existen vehiculos asociados</Typography>
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
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.vehicle+'/'+vehicles[parseInt(key)].id}
                                    >  
                                        <Vehicle 
                                            key={i}
                                            brand={vehicles[parseInt(key)].brand}
                                            model={vehicles[parseInt(key)].model}
                                            plate={vehicles[parseInt(key)].plate}
                                        />
                                    </Button>
                                )}
                            </Grid>
                        </>
                    }
                </Card>
            </Grid>
        </Grid>
        </>
    )
}

export default Resources;
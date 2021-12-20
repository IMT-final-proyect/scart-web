import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Snackbar, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import VehicleRow from './components/vehicleRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import CreateVehicleModal from './components/createVehicleModal';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import CustomInput from '../../../components/customInput';
import { createVehicle, deleteVehicle, getAllVehicles } from '../../../redux/slices/resourcesSlice';
import { getContractors } from '../../../redux/slices/contractorsSlice';
import { IVehicle } from '../../../utils/interfaces';
import DeleteModal from '../../../components/DeleteModal';
import { Alert } from '@mui/material';
import CustomSnackbar from '../../../components/customSnackbar';

const Contractors = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [selectedVehicleId, setSelectedVehicleId] = useState(-1)
    const [searchPlate, setSearchPlate] = useState('')
    const [searchContractor, setSearchContractor] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [openVehicleModal, setOpenVehicleModal] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const [deleteVehicleModal, setDeleteVehicleModal] = useState(false)
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const [openVehicleSuccess, setOpenVehicleSuccess] = useState(false)
    const [vehiclesFiltered, setVehiclesFiltered] = useState<IVehicle[]>([])
    const vehicles = useSelector((state: RootState) => state.resources.vehicles.data)
    const loadingVehicles = useSelector((state: RootState) => state.resources.vehicles.loading)
    const vehicleSuccess = useSelector((state: RootState) => state.resources.vehicles.success)
    const error = useSelector((state: RootState) => state.resources.vehicles.error)
    
    useEffect(() => {
        dispatch(getAllVehicles())
        dispatch(getContractors())
    }, [dispatch])

    useEffect(() => {
        if (!!error)
            setOpenSnackbarError(true)
    }, [error])

    useEffect(() => {
        setOpenVehicleSuccess(vehicleSuccess)
    }, [vehicleSuccess])

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
        setLoadingFilter(true)
        let vehiclesAux: IVehicle[] = []
        if(searchPlate !== '' || searchContractor !== ''){
            if(searchContractor === ''){
                Object.keys(vehicles).map((key: string, i: any) => {
                    const vehiclePlate = vehicles[parseInt(key)].plate.toUpperCase()
                    if (vehiclePlate.includes(searchPlate.toUpperCase()))
                        vehiclesAux.push(vehicles[parseInt(key)])
                })
            }
            else{
                if(searchPlate === ''){
                    Object.keys(vehicles).map((key: string, i: any) => {
                        const contractorName = vehicles[parseInt(key)].contractor.name.toUpperCase()
                        if (contractorName.includes(searchContractor.toUpperCase()))
                            vehiclesAux.push(vehicles[parseInt(key)])
                    })
                }
                else{
                    Object.keys(vehicles).map((key: string, i: any) => {
                        const vehiclePlate = vehicles[parseInt(key)].plate.toUpperCase()
                        const contractorName = vehicles[parseInt(key)].contractor.name.toUpperCase()
                        if (vehiclePlate.includes(searchPlate.toUpperCase()) && contractorName.includes(searchContractor.toUpperCase()))
                            vehiclesAux.push(vehicles[parseInt(key)])
                    })
                }
            }
        }
        else{
            Object.keys(vehicles).map((key: string, i: any) => {
                vehiclesAux.push(vehicles[parseInt(key)])
            })
        }
        setVehiclesFiltered(vehiclesAux)
        setLoadingFilter(false)
    }, [searchPlate, searchContractor, vehicles])

    const addVehicle = (brand: string, model: string, year: string, plate: string, contractorId: number) => {
        if(!!contractorId){
            dispatch(createVehicle(plate, brand, model, year, contractorId))
            setOpenVehicleModal(false)
            setMessageSnackbar('Vehiculo creado con exito')
        }
    }

    const handleDeleteVehicle = (id: number) => {
        if(!!id) {
            dispatch(deleteVehicle(id))
            setMessageSnackbar('Vehiculo eliminado con exito')
        }
    }

    const handleDeleteVehicleModal = (id: number) => {
        setSelectedVehicleId(id)
        setDeleteVehicleModal(true)
    }

    return (
        <>
        <Modal open={openVehicleModal} onClose={() => setOpenVehicleModal(false)}>
            <CreateVehicleModal
                setOpenVehicleModal={setOpenVehicleModal}
                addVehicle={addVehicle}
            />
        </Modal>
        <Modal open={deleteVehicleModal} onClose={() => setDeleteVehicleModal(false)}>
            <DeleteModal entity={'vehiculo'} id={selectedVehicleId} handleDelete={handleDeleteVehicle} setOpenModal={setDeleteVehicleModal} />
        </Modal>
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.card}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Vehiculos
                    </text>
                    <Button onClick={() => setOpenVehicleModal(true)}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                <Typography className={classes.searchTitle}> Filtar por </Typography>
                <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchPlate} setValue={setSearchPlate} placeholder={'Patente'} size='small' />
                        </Grid>
                        <Grid item xs={10} md={5}>
                            <CustomInput variant='outlined' className={classes.input} value={searchContractor}setValue={setSearchContractor}  placeholder={'Contratista'} size='small'/>
                        </Grid>
                </Grid>
            </Card> 
            {loadingFilter || loadingVehicles ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Card className={classes.vehicleCard}>
                    {vehicles.length === 0 ?
                        <text className={classes.textCenter}> No hay vehiculos registrados</text>
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
                                        Contratista
                                    </text>
                                </Grid>
                                <Grid item xs={2} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Patente
                                    </text>
                                </Grid>
                                <Grid item xs={1} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Acciones
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' justifyContent='space-between' >
                                {Object.keys(vehiclesFiltered).map((key: string, i: any) =>
                                <Button
                                    className={classes.button}
                                    component={Link}
                                    to={ROUTES.root+ROUTES.vehicles+'/'+vehiclesFiltered[parseInt(key)].id}
                                >  
                                    <VehicleRow 
                                        key={vehiclesFiltered[parseInt(key)].id}
                                        brand={vehiclesFiltered[parseInt(key)].brand}
                                        model={vehiclesFiltered[parseInt(key)].model}
                                        plate={vehiclesFiltered[parseInt(key)].plate}
                                        contractor={vehiclesFiltered[parseInt(key)].contractor?.name}
                                        id={vehiclesFiltered[parseInt(key)].id}
                                        handleDeleteVehicle={handleDeleteVehicleModal}
                                    />
                                </Button>
                                )}
                            </Grid>
                        </>
                    }
                </Card>
            }
            <CustomSnackbar open={openSnackbarError} message={error?.message || ''} type='error' onClose={() => setOpenSnackbarError(false)} />
            <CustomSnackbar open={openVehicleSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() => setOpenVehicleSuccess(false)} />
        </Grid>
        </>
    )
}

export default Contractors;
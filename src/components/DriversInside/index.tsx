/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { Card, CircularProgress, Grid, Typography, Modal } from '@material-ui/core';
import useStyles from './styles';
import DriverInsideRow from './components/driverInsideRow'
import { useDispatch, useSelector } from 'react-redux';
import { getDriversInsidePlant, putCheckOut } from '../../redux/slices/resourcesSlice';
import { RootState } from '../../redux/rootReducer';
import CustomSnackbar from '../../components/customSnackbar';
import { IDriverInside } from '../../utils/interfaces';
import CustomInput from '../../components/customInput';
import TomisBar from '../../components/TomisBar';
import DriverLeaves from './components/DriverLeaves';

const DriversInside = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [searchContractor, setSearchContractor] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [driverLeavesModal, setDriverLeavesModal] = useState(false)
    const [driverToLeave, setDriverToLeave] = useState<IDriverInside>()
    const driversInsidePlant = useSelector((state: RootState) => state.resources.drivers.driversInside.data)
    const [driversFiltered, setDriversFiltered] = useState<IDriverInside[]>([])
    const loading = useSelector((state: RootState) => state.resources.drivers.driversInside.loading)
    const success = useSelector((state: RootState) => state.resources.drivers.driversInside.success)
    const error = useSelector((state: RootState) => state.resources.drivers.driversInside.error)

    
    useEffect(() => {
        dispatch(getDriversInsidePlant())
    }, [dispatch])

    useEffect(() => {
        if (!!error)
        setOpenError(true)
    }, [error])

    useEffect(() => {
        setDriversFiltered(() => {
            let driversAux: IDriverInside[] = []
            Object.keys(driversInsidePlant).map((key: string, i: any) => {
                driversAux.push(driversInsidePlant[parseInt(key)])
            })
            return driversAux
        })
    }, [driversInsidePlant])

    useEffect(() => {
        setLoadingFilter(true)
        let driversAux: IDriverInside[] = []
        if(searchContractor !== ''){
            Object.keys(driversInsidePlant).map((key: string, i: any) => {
                const contractorName = driversInsidePlant[parseInt(key)].contractor?.name.toUpperCase()
                if (contractorName?.includes(searchContractor.toUpperCase()))
                    driversAux.push(driversInsidePlant[parseInt(key)])
            })
        }
        else{
            Object.keys(driversInsidePlant).map((key: string, i: any) => {
                driversAux.push(driversInsidePlant[parseInt(key)])
            })
        }
        setDriversFiltered(driversAux)
        setLoadingFilter(false)
    }, [driversInsidePlant, searchContractor])

    useEffect(() => {
        setOpenSuccess(success)
    }, [success])

    const openDriverLeavesModal = (_driverToLeave: IDriverInside) => {
        setDriverToLeave(_driverToLeave)
        setDriverLeavesModal(true)
    }
    const handleDriverToLeave = (driverId: number, vehicleId: number) => {
        dispatch(putCheckOut(driverId, vehicleId))
    }

    return (
        <>
            <Modal open={driverLeavesModal} onClose={() => setDriverLeavesModal(false)}>
                <DriverLeaves driverToLeave={driverToLeave} handleDriverToLeave={handleDriverToLeave} setOpenModal={setDriverLeavesModal} />
            </Modal>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Card className={classes.titleCard}>
                    <Grid container justifyContent='flex-start'>
                        <TomisBar />
                        <text className={classes.textTitle}>
                            Conductores en planta
                        </text>
                    </Grid>
                    <Typography className={classes.searchTitle}> Filtrar por </Typography>
                    <Grid className={classes.inputContainer} container  direction='row' justifyContent='space-between' >
                            <Grid item xs={10} md={5}>
                                <CustomInput variant='outlined' className={classes.input} value={searchContractor} setValue={setSearchContractor} placeholder={'Nombre del contratista'} size='small' />
                            </Grid>
                    </Grid>
                </Card>
                {loading || loadingFilter ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    : 
                    <Card className={classes.contentCard}>
                        {driversFiltered.length === 0 ?
                            <Typography className={classes.textCenter}>No hay conductores dentro de la planta o ninguno pertenece al contratista filtrado</Typography>
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
                                            Vehiculo
                                        </text>
                                    </Grid>
                                    <Grid item xs={2} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Contratista
                                        </text>
                                    </Grid>
                                    <Grid item xs={2} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Entrada
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
                                        <DriverInsideRow 
                                            key={driversFiltered[parseInt(key)].id}
                                            driverInside={driversFiltered[parseInt(key)]}
                                            openDriverLeavesModal={openDriverLeavesModal}
                                        />
                                    )}
                                </Grid>
                            </>
                        }
                    </Card>
                }
            </Grid>
            <CustomSnackbar open={openSuccess} message='Salida registrada con exito' type='success' onClose={() => setOpenSuccess(false)} />
            <CustomSnackbar open={openError} message={error?.message || 'Hubo un error registrando la salida'} type='error' onClose={() => setOpenError(false)} />
        </>
    )
}

export default DriversInside;
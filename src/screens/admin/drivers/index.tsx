import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Snackbar, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import DriverRow from './components/driverRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import TripleSearchBar from '../../../components/tripleSearchBar';
import CreateDriverModal from './components/createDriverModal';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { createDriver, deleteDriver, getAllDrivers } from '../../../redux/slices/resourcesSlice';
import moment from 'moment';
import { getContractors } from '../../../redux/slices/contractorsSlice';
import { IDriver } from '../../../utils/interfaces';
import DeleteModal from '../../../components/DeleteModal';
import { Alert } from '@mui/material';

const Drivers = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [selectedDriverId, setSelectedDriverId] = useState(-1)
    const [openDriverModal, setOpenDriverModal] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchSurname, setSearchSurname] = useState('')
    const [searchDocument, setSearchDocument] = useState('')
    const [searchContractor, setSearchContractor] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const [deleteDriverModal, setDeleteDriverModal] = useState(false)
    const [openSnackbarError, setOpenSnackbarError] = useState(false)
    const [openDriverSuccess, setOpenDriverSuccess] = useState(false)
    const drivers = useSelector((state: RootState) => state.resources.drivers.data)
    const loadingDrivers = useSelector((state: RootState) => state.resources.drivers.loading)
    const [driversFiltered, setDriversFiltered] = useState<IDriver[]>([])
    const driverSuccess = useSelector((state: RootState) => state.resources.drivers.success)
    const error = useSelector((state: RootState) => state.resources.drivers.error)


    useEffect(() => {
        dispatch(getAllDrivers())
        dispatch(getContractors())
    }, [dispatch])

    useEffect(() => {
        cleanFilters()
    }, [drivers])

    useEffect(() => {
        if (!!error)
            setOpenSnackbarError(true)
    }, [error])

    useEffect(() => {
        setOpenDriverSuccess(driverSuccess)
    }, [driverSuccess])


    useEffect(() => {
        cleanFilters()
    }, [drivers, searchName])

    useEffect(() => {
        setLoadingFilter(true)
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            const driverSurname = drivers[parseInt(key)].surname.toUpperCase()
            if (driverSurname.includes(searchSurname.toUpperCase()))
                driversAux.push(drivers[parseInt(key)])
        })
        setDriversFiltered(driversAux)
        setLoadingFilter(false)
    }, [drivers, searchSurname])

    useEffect(() => {
        setLoadingFilter(true)
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            const driverName = drivers[parseInt(key)].name.toUpperCase()
            if (driverName.includes(searchName.toUpperCase()))
                driversAux.push(drivers[parseInt(key)])
        })
        setDriversFiltered(driversAux)
        setLoadingFilter(false)
    }, [drivers, searchName])

    useEffect(() => {
        setLoadingFilter(true)
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            if (drivers[parseInt(key)].cuit.includes(searchDocument))
                driversAux.push(drivers[parseInt(key)])
        })
        setDriversFiltered(driversAux)
        setLoadingFilter(false)
    }, [drivers, searchDocument])

    useEffect(() => {
        setLoadingFilter(true)
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            const contractorName = drivers[parseInt(key)].contractor.name.toUpperCase()
            if (contractorName.includes(searchContractor.toUpperCase()))
                driversAux.push(drivers[parseInt(key)])
        })
        setDriversFiltered(driversAux)
        setLoadingFilter(false)
    }, [drivers, searchContractor])

    const cleanFilters = useCallback(() => {
        setDriversFiltered(() => {
            let driversAux: IDriver[] = []
            Object.keys(drivers).map((key: string, i: any) => {
                driversAux.push(drivers[parseInt(key)])
            })
            return driversAux
        })
    }, [drivers])

    const addDriver = (
        username: string,
        password: string,
        name: string,
        surname: string,
        cuit: string,
        birthdate: moment.Moment,
        street: string,
        number: number,
        city: string,
        province: string,
        zipCode: string,
        contractorId: number) => {
        if(!!contractorId){
            dispatch(createDriver(username, password, name, surname, cuit, moment(birthdate), street, number, city, province, zipCode, contractorId))
            setOpenDriverModal(false)
        }
    }

    const handleDeleteDriver = (id: number) => {
        dispatch(deleteDriver(id))
        setMessageSnackbar('Conductor eliminado con exito')
    }

    const handleDeleteDriverModal = (id: number) => {
        setSelectedDriverId(id)
        setDeleteDriverModal(true)
    }

    return (
        <>
            <Modal open={openDriverModal} onClose={() => setOpenDriverModal(false)}>
                <CreateDriverModal
                    setOpenDriverModal={setOpenDriverModal}
                    addDriver={addDriver}
                />
            </Modal>
            <Modal open={deleteDriverModal} onClose={() => setDeleteDriverModal(false)}>
                <DeleteModal entity={'conductor'} id={selectedDriverId} handleDelete={handleDeleteDriver} setOpenModal={setDeleteDriverModal} />
            </Modal>
            <Grid container className={classes.container} direction='row' justifyContent='space-between' >
                <Card className={classes.card}>
                    <Grid container justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Conductores
                        </text>
                        <Button onClick={() => setOpenDriverModal(true)}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    <TripleSearchBar 
                        placeholders={[{name: 'Nombre'}, {name: 'Apellido'}, {name: 'Documento'}, {name: 'Contratista'} ]}
                        firstValue={searchName}
                        setFirstValue={setSearchName} 
                        secondValue={searchSurname}
                        setSecondValue={setSearchSurname}
                        thirdValue={searchDocument}
                        setThirdValue={setSearchDocument}
                        fourthValue={searchContractor}
                        setFourthValue={setSearchContractor}
                        cleanAction={cleanFilters}
                    />
                </Card> 
            </Grid>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                {loadingFilter || loadingDrivers ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                    <Card className={classes.contractorCard}>
                        {driversFiltered.length === 0 ?
                            <text className={classes.textCenter}> No hay conductores registrados</text>
                            :
                            <>
                                <Grid container justifyContent='space-between'>
                                    <Grid item xs={3} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Nombre
                                        </text>
                                    </Grid>
                                    <Grid item xs={3} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Documento
                                        </text>
                                    </Grid>
                                    <Grid item xs={3} className={classes.headerText}>
                                        <text className={classes.headerText}>
                                            Contratista
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
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.drivers+'/'+driversFiltered[parseInt(key)].id}
                                    >  
                                        <DriverRow 
                                            key={driversFiltered[parseInt(key)].id}
                                            name={driversFiltered[parseInt(key)].name}
                                            surname={driversFiltered[parseInt(key)].surname}
                                            document={driversFiltered[parseInt(key)].cuit}
                                            contractor={driversFiltered[parseInt(key)].contractor.name}
                                            id={driversFiltered[parseInt(key)].id}
                                            handleDeleteDriver={handleDeleteDriverModal}
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
                <Snackbar className={classes.snackbar} open={openDriverSuccess && !!messageSnackbar} autoHideDuration={6000} onClose={() => setOpenDriverSuccess(false)} >
                    <Alert onClose={() => setOpenDriverSuccess(false)} severity="success" sx={{ width: '50%' }}>
                        {messageSnackbar}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}

export default Drivers;
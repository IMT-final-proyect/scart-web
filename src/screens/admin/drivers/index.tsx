import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Typography, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import DriverRow from './components/driverRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { createDocument } from '../../../redux/slices/documentsSlice';
import TripleSearchBar from '../../../components/tripleSearchBar';
import CreateDriverModal from './components/createDriverModal';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { createDriver, getAllDrivers } from '../../../redux/slices/resourcesSlice';
import moment from 'moment';
import { getContractors } from '../../../redux/slices/contractorsSlice';
import { IDriver } from '../../../utils/interfaces';

const Drivers = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openDriverModal, setOpenDriverModal] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchDocument, setSearchDocument] = useState('')
    const [searchContractor, setSearchContractor] = useState('')
    const [loadingFilter, setLoadingFilter] = useState(false)
    const drivers = useSelector((state: RootState) => state.resources.drivers.data)
    const loadingDrivers = useSelector((state: RootState) => state.resources.drivers.loading)
    const [driversFiltered, setDriversFiltered] = useState<IDriver[]>([])

    useEffect(() => {
        dispatch(getAllDrivers())
        dispatch(getContractors())
    }, [])

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
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            const driverName = drivers[parseInt(key)].name.toUpperCase()
            if (driverName.includes(searchName.toUpperCase()))
                driversAux.push(drivers[parseInt(key)])
        })
    }, [searchName])

    useEffect(() => {
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            const driverName = drivers[parseInt(key)].name.toUpperCase()
            if (driverName.includes(searchName.toUpperCase()))
                driversAux.push(drivers[parseInt(key)])
        })
    }, [searchDocument])

    useEffect(() => {
        let driversAux: IDriver[] = []
        Object.keys(drivers).map((key: string, i: any) => {
            const contractorName = drivers[parseInt(key)].contractor.name.toUpperCase()
            if (contractorName.includes(searchContractor))
                driversAux.push(drivers[parseInt(key)])
        })
    }, [searchContractor])

    const addDriver = (username: string, password: string, name: string, surname: string, cuit: string, birthdate: moment.Moment, contractorId: number) => {
        if(!!contractorId){
            dispatch(createDriver(username, password, name, surname, cuit, moment(birthdate), contractorId))
            setOpenDriverModal(false)
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
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
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
                        placeholders={[{name: 'Nombre Apellido'}, {name: 'Documento'}, {name: 'Contratista'} ]}
                        firstValue={searchName}
                        setFirstValue={setSearchName} 
                        secondValue={searchDocument}
                        setSecondValue={setSearchDocument}
                        thirdValue={searchContractor}
                        setThirdValue={setSearchContractor}
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
                                    {Object.keys(drivers).map((key: string, i: any) =>
                                    <Button
                                        className={classes.button}
                                        component={Link}
                                        to={ROUTES.root+ROUTES.drivers+'/'+drivers[parseInt(key)].id}
                                    >  
                                        <DriverRow 
                                            key={drivers[parseInt(key)].id}
                                            name={drivers[parseInt(key)].name}
                                            surname={drivers[parseInt(key)].surname}
                                            document={drivers[parseInt(key)].cuit}
                                            contractor={drivers[parseInt(key)].contractor.name}
                                        />
                                    </Button>
                                    )}
                                </Grid>
                            </>
                        }
                    </Card>
                }
            </Grid>
        </>
    )
}

export default Drivers;
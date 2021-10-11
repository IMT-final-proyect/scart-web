import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import DriverRow from './components/driverRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { createDocument } from '../../../redux/slices/documentsSlice';
import CreateContractorDocumentModal from './components/CreateDriverDocumentModal';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { getAllDrivers } from '../../../redux/slices/resourcesSlice';
import moment from 'moment';

const Contractors = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const drivers = useSelector((state: RootState) => state.resources.drivers.data)

    useEffect(() => {
        dispatch(getAllDrivers())
    }, [])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenModal(false)
    }


    return (
        <>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <CreateContractorDocumentModal
                setOpenDriverModal={setOpenModal}
                addDocument={addDocument}
            />
        </Modal>
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.leftCard}>
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Conductores
                    </text>
                    <Button onClick={() => setOpenModal(true)}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                {drivers.length === 0 ?
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
                                    Fecha de Nac.
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
                                to={ROUTES.root+ROUTES.contractors+'/'+drivers[parseInt(key)].id}
                            >  
                                <DriverRow 
                                    key={drivers[parseInt(key)].id}
                                    name={drivers[parseInt(key)].name}
                                    surname={drivers[parseInt(key)].surname}
                                    document={drivers[parseInt(key)].cuit}
                                    birthday={moment(drivers[parseInt(key)].birth_date)}
                                />
                            </Button>
                            )}
                        </Grid>
                    </>
                }
                </Card>
        </Grid>
        </>
    )
}

export default Contractors;
import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles';
import VehicleRow from './components/vehicleRow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import { createDocument, getContractorDocuments } from '../../../redux/slices/documentsSlice';
import CreateContractorDocumentModal from './components/CreateVehicleDocumentModal';
import { IDocument } from '../../../utils/interfaces';
import { ROUTES } from '../navigation/routes';
import { Link } from 'react-router-dom';
import { getAllVehicles } from '../../../redux/slices/resourcesSlice';

const Contractors = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const vehicles = useSelector((state: RootState) => state.resources.vehicles.data)

    useEffect(() => {
        dispatch(getAllVehicles())
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
                        Vehiculos
                    </text>
                    <Button onClick={() => setOpenModal(true)}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
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
                            {Object.keys(vehicles).map((key: string, i: any) =>
                            <Button
                                className={classes.button}
                                component={Link}
                                to={ROUTES.root+ROUTES.contractors+'/'+vehicles[parseInt(key)].id}
                            >  
                                <VehicleRow 
                                    key={vehicles[parseInt(key)].id}
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
        </>
    )
}

export default Contractors;
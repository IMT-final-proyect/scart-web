import React, { useState } from 'react';

import { Button, Card, Grid, Modal, Typography } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Vehicle from '../vehicleRow';
import Document from '../documentRow';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/rootReducer';
import { IVehicle } from '../../../../../utils/interfaces';
import { createDocument } from '../../../../../redux/slices/contractorSlices/documentsSlice';
import CreateVehicleDocumentModal from './components/CreateVehicleDocumentModal';


const conductores = []

const documents = [
    {
        'id':'1',
        'name':'Seguro',
        'expiration': '01/01/2022',
        'state':0
    },
    {
        'id':'2',
        'name':'VTV',
        'expiration': '30/01/2022',
        'state':2
    },
    {
        'id':'3',
        'name':'Habilitacion',
        'expiration': '04/05/2022',
        'state':1
    },
]

const VehicleDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params: any = useParams();
    const [openVehicleDocumentModal, setOpenVehicleDocumentModal] = useState(false)
    const vehicle: IVehicle = useSelector((state: RootState) => {
        const vehicles = state.resources.vehicles.data
        return vehicles[params.id]
    })

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenVehicleDocumentModal(false)
    }

    return (
        <>
            <Modal open={openVehicleDocumentModal} onClose={() => setOpenVehicleDocumentModal(false)}>
                <CreateVehicleDocumentModal
                    setOpenDocumentModal={setOpenVehicleDocumentModal}
                    addDocument={addDocument}
                />
            </Modal>
            <Grid container className={classes.container} direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container justifyContent='space-between' direction='row'>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Marca: </text>
                                <text className={classes.data}> {vehicle.brand} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Modelo: </text>
                                <text className={classes.data}> {vehicle.model} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Patente: </text>
                                <text className={classes.data}> {vehicle.plate} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Año: </text>
                                <text className={classes.data}> {vehicle.year} </text>
                            </div>
                    </Grid>
                </Card>
                <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card className={classes.leftCard}>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.textTitle}>
                                    Conductores
                                </text>
                            </Grid>
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
                            {conductores.length === 0 ? 
                            <Typography className={classes.textCenter}> No ha sido utilizado por ningún conductor </Typography>
                                :
                                <Grid container direction='column' justifyContent='space-between' >
                                    {/* {conductores.map((conductor) =>
                                        <Vehicle 
                                            key={conductor.id}
                                            brand={conductor.brand}
                                            model={conductor.model}
                                            plate={conductor.plate}
                                        />)
                                    } */}
                                </Grid>
                            }
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card className={classes.rightCard}>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.textTitle}>
                                    Documentos
                                </text>
                                <Button onClick={() => setOpenVehicleDocumentModal(true)}>
                                    <AddCircleIcon className={classes.circleIcon}/>
                                </Button>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Nombre
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Fec. vencimiento
                                    </text>
                                </Grid>
                                <Grid item xs={3} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Estado
                                    </text>
                                </Grid>
                                <Grid item xs={2} className={classes.headerText}>
                                    <text className={classes.headerText}>
                                        Acciones
                                    </text>
                                </Grid>
                            </Grid>
                            <Grid container direction='column' >
                                {documents.map((document) =>
                                    <Document 
                                        key={document.id}
                                        name={document.name}
                                        expiration={document.expiration}
                                        state={document.state}
                                    />)
                                }
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default VehicleDetails;
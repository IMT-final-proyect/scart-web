import React, { useEffect, useState } from 'react';

import { Button, Card, CircularProgress, Grid, Modal, Snackbar, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { RootState } from '../../../../../redux/rootReducer';
import { IDocument, IVehicle } from '../../../../../utils/interfaces';
import { createDocument, getVehicleDocuments } from '../../../../../redux/slices/documentsSlice';
import CreateVehicleDocumentModal from './components/CreateVehicleDocumentModal';
import DocumentRow from '../../../documentation/components/documentRow/DocumentRow';
import { ROUTES } from '../../../navigation/routes';
import EditVehicleModal from '../../../../../components/editVehicleModal';
import { editVehicle } from '../../../../../redux/slices/resourcesSlice';
import { Alert } from '@mui/material';


const conductores = []

const VehicleDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params: any = useParams();
    const [openVehicleDocumentModal, setOpenVehicleDocumentModal] = useState(false)
    const [openEditVehicleModal, setOpenEditVehicleModal] = useState(false)
    const [openEditVehicleSuccess, setOpenEditVehicleSuccess] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const vehicle: IVehicle = useSelector((state: RootState) => {
        const vehicles = state.resources.vehicles.data
        return vehicles[params.id]
    })
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.vehicles.data)
    const success: boolean = useSelector((state: RootState) => state.resources.vehicles.success)
    const loading: boolean = useSelector((state: RootState) => state.documents.vehicles.loading)

    useEffect(() => { 
        dispatch(getVehicleDocuments(vehicle.id))
    }, [dispatch, vehicle.id])

    useEffect(() => {
        setOpenEditVehicleSuccess(success)
    }, [success])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenVehicleDocumentModal(false)
    }

    const _editVehicle = (vehicle: IVehicle, plate: string, brand: string, model: string, year: number) => {
            dispatch(editVehicle(vehicle, plate, brand, model, year))
        setMessageSnackbar('Vehiculo modificado con exito')
    }


    return (
        <>
            <Modal open={openVehicleDocumentModal} onClose={() => setOpenVehicleDocumentModal(false)}>
                <CreateVehicleDocumentModal
                    vehicleId={vehicle.id}
                    setOpenDocumentModal={setOpenVehicleDocumentModal}
                    addDocument={addDocument}
                />
            </Modal>
            <Modal open={openEditVehicleModal} onClose={() => setOpenEditVehicleModal(false)}>
                <EditVehicleModal 
                    vehicle={vehicle} 
                    editVehicle={_editVehicle} 
                    setOpenEditVehicleModal={setOpenEditVehicleModal} 
                />
            </Modal>
            {loading ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
                <Grid container className={classes.container} direction='column' justifyContent='space-between'>
                    <Card className={classes.cardContainer}>
                        <Grid container justifyContent='space-between' direction='row' alignItems={'center'}>
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
                                <Button onClick={() => {setOpenEditVehicleModal(true)}}>
                                    <EditIcon />
                                </Button>
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
                                {conductores.length === 0 ? 
                                <Typography className={classes.textCenter}> El vehículo no ha sido utilizado por ningún conductor </Typography>
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
                                    </>
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
                            {Object.keys(documents).length === 0 ?
                                <Typography className={classes.textCenter}> El vehículo no tiene documentación asociada </Typography>
                            :
                                <>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={5} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Nombre
                                            </text>
                                        </Grid>
                                        <Grid item xs={3} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Fec. vencimiento
                                            </text>
                                        </Grid>
                                        <Grid item xs={2} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Estado
                                            </text>
                                        </Grid>
                                        <Grid item xs={2} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Importancia
                                            </text>
                                        </Grid>
                                    </Grid>
                                        <Grid container direction='column' justifyContent='space-between' >
                                            {Object.keys(documents).map((key: string, i: any) =>
                                            <Button
                                                className={classes.button}
                                                component={Link}
                                                to={ROUTES.root+ROUTES.documentacion+'/'+documents[parseInt(key)].id}
                                            >  
                                                <DocumentRow 
                                                    key={documents[parseInt(key)].id}
                                                    type={documents[parseInt(key)].type}
                                                    expiration={documents[parseInt(key)].expirationDate}
                                                    state={documents[parseInt(key)].state}
                                                />
                                            </Button>
                                            )}
                                        </Grid>
                                    </>
                                    }
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            }
            <Snackbar className={classes.snackbar} open={openEditVehicleSuccess && !!messageSnackbar} autoHideDuration={6000} onClose={() => setOpenEditVehicleSuccess(false)} >
                <Alert onClose={() => setOpenEditVehicleSuccess(false)} severity="success" sx={{ width: '50%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </>
    )
}

export default VehicleDetails;
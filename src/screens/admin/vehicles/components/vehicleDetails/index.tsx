import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Snackbar, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IDocument, IVehicle } from '../../../../../utils/interfaces';
import CreateVehicleDocumentModal from './components/CreateVehicleDocumentModal';
import { createDocument, getVehicleDocuments } from '../../../../../redux/slices/documentsSlice';
import { ROUTES } from '../../../navigation/routes';
import DocumentRow from './components/documentRow/DocumentRow';
import { Alert } from '@mui/material';
import EditVehicleModal from '../../../../../components/editVehicleModal';
import { editVehicle, getVehicleById } from '../../../../../redux/slices/resourcesSlice';

const VehicleDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
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
        dispatch(getVehicleById(params.id))
        dispatch(getVehicleDocuments(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        setOpenEditVehicleSuccess(success)
    }, [success])


    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[], contractorId: number) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images, contractorId))
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
                    setOpenVehicleDocumentModal={setOpenVehicleDocumentModal}
                    addDocument={addDocument}
                    vehicleId={params.id}
                    contractorId={vehicle.contractor.id}
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
            <Grid container direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container justifyContent='space-between' direction='row' alignItems={'center'}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Patente: </text>
                                <text className={classes.data}> {vehicle.plate} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Marca: </text>
                                <text className={classes.data}> {vehicle.brand} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Modelo: </text>
                                <text className={classes.data}> {vehicle.model} </text>
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
                <Grid item xs={12}>
                    <Card className={classes.rightCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Documentación asociada
                            </text>
                            <Button onClick={() => setOpenVehicleDocumentModal(true)}>
                                <AddCircleIcon className={classes.circleIcon} />
                            </Button>
                        </Grid>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={5} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Nombre
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Fecha de vencimiento
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Estado
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Severidad
                                </text>
                            </Grid>
                        </Grid>
                        <Grid container direction='column' justifyContent='space-between' >
                            {Object.keys(documents).length === 0 ?
                                <text className={classes.textCenter}> No hay documentacion asociada </text>
                                :
                                <Grid container direction='column' justifyContent='space-between' >
                                    {Object.keys(documents).map((key: string, i: any) =>
                                        <Button
                                            className={classes.button}
                                            component={Link}
                                            to={ROUTES.root+ROUTES.documentDetails+'/'+documents[parseInt(key)].id}
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
                            }
                        </Grid>
                    </Card>
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
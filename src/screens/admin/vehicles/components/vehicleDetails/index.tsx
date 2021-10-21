import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IDocument, IVehicle } from '../../../../../utils/interfaces';
import CreateVehicleDocumentModal from './components/CreateVehicleDocumentModal';
import { createDocument, getVehicleDocuments } from '../../../../../redux/slices/documentsSlice';
import { ROUTES } from '../../../navigation/routes';
import DocumentRow from './components/documentRow/DocumentRow';

const VehicleDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openVehicleDocumentModal, setOpenVehicleDocumentModal] = useState(false)
    const vehicle: IVehicle = useSelector((state: RootState) => {
        const vehicles = state.resources.vehicles.data
        return vehicles[params.id]
    })
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.vehicles.data)

    useEffect(() => { 
        dispatch(getVehicleDocuments(vehicle.id))
    }, [])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenVehicleDocumentModal(false)
    }

    return (
        <>
            <Modal open={openVehicleDocumentModal} onClose={() => setOpenVehicleDocumentModal(false)}>
                <CreateVehicleDocumentModal
                    setOpenVehicleDocumentModal={setOpenVehicleDocumentModal}
                    addDocument={addDocument}
                    vehicleId={vehicle.id}
                />
            </Modal>
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
                                    Contratista
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Fecha de vencimiento
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Estado
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
        </>
    )
}

export default VehicleDetails;
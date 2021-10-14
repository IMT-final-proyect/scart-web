import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, Typography, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IContractor, IDocument } from '../../../../../utils/interfaces';
import CreateContractorDocumentModal from './components/CreateContractorDocumentModal';
import { createDocument, getContractorDocuments } from '../../../../../redux/slices/documentsSlice';
import { ROUTES } from '../../../navigation/routes';
import { getAllDrivers, getAllVehicles } from '../../../../../redux/slices/resourcesSlice';
import DocumentRow from './components/documentRow/DocumentRow';


const autos: string[] = []


const ContractorDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openContractorDocumentModal, setOpenContractorDocumentModal] = useState(false)
    const contractor: IContractor = useSelector((state: RootState) => {
        const contractors = state.contractors.data
        return contractors[params.id]
    })
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.contractor.data)

    useEffect(() => { 
        dispatch(getContractorDocuments(contractor.id))
    }, [])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images))
        setOpenContractorDocumentModal(false)
    }

    return (
        <>
            <Modal open={openContractorDocumentModal} onClose={() => setOpenContractorDocumentModal(false)}>
                <CreateContractorDocumentModal
                    setOpenContractorDocumentModal={setOpenContractorDocumentModal}
                    addDocument={addDocument}
                    contractorId={contractor.id}
                />
            </Modal>
            <Grid container direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container justifyContent='space-between' direction='row' alignItems={'center'}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Nombre: </text>
                                <text className={classes.data}> {contractor.name} </text>
                            </div>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Cuit: </text>
                                <text className={classes.data}> {contractor.cuit} </text>
                            </div>
                    </Grid>
                </Card>
                <Grid item xs={12}>
                    <Card className={classes.rightCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Documentación asociada
                            </text>
                            <Button onClick={() => setOpenContractorDocumentModal(true)}>
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
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default ContractorDetails;
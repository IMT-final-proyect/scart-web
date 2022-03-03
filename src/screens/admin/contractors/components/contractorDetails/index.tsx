import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Modal, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IContractor, IDocument } from '../../../../../utils/interfaces';
import EditIcon from '@mui/icons-material/Edit';
import CreateContractorDocumentModal from './components/CreateContractorDocumentModal';
import { createDocument, getContractorDocuments } from '../../../../../redux/slices/documentsSlice';
import { ROUTES } from '../../../navigation/routes';
import DocumentRow from './components/documentRow/DocumentRow';
import CustomSnackbar from '../../../../../components/customSnackbar';
import { editContractor } from '../../../../../redux/slices/contractorsSlice';
import { putChangePassword } from '../../../../../redux/slices/userSlice';
import EditContractorModal from '../../../../../components/editContractorModal';
import { AllowedRol } from '../../../../../utils/constants';


const ContractorDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openContractorDocumentModal, setOpenContractorDocumentModal] = useState(false)
    const [openEditContractorModal, setOpenEditContractorModal] = useState(false)
    const [openEditContractorSuccess, setOpenEditContractorSuccess] = useState(false)
    const [openEditContractorError, setOpenEditContractorError] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFailure, setOpenFailure] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const contractor: IContractor = useSelector((state: RootState) => {
        const contractors = state.contractors.data
        return contractors[params.id]
    })
    const contractorSuccess = useSelector((state: RootState) => state.contractors.success)
    const contractorError = useSelector((state: RootState) => state.contractors.error?.message)
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.contractor.data)
    const success = useSelector((state: RootState) => state.documents.success)
    const error = useSelector((state: RootState) => state.documents.error)

    useEffect(() => { 
        dispatch(getContractorDocuments(contractor.id))
    }, [contractor.id, dispatch])

    useEffect(() => {
        setOpenEditContractorSuccess(contractorSuccess)
    }, [contractorSuccess])
    

    useEffect(() => {
        setOpenEditContractorError(contractorError ? true : false)
        setMessageSnackbar(contractorError || '')
    }, [contractorError])

    useEffect(() => {
        setOpenSuccess(success)
    }, [success])

    useEffect(() => {
        setOpenFailure(!!error)
    }, [error])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images, entityId))
        setOpenContractorDocumentModal(false)
    }

    const _editContractor = (
        contractor: IContractor, 
        name: string,
        username: string,
        email: string,
        cuit: string, 
        street: string,
        number: string,
        city: string,
        province: string,
        zipCode: string,
        password?: string) => {
        dispatch(editContractor(contractor, name, username, email, cuit, street, number, city, province, zipCode))
        if (changePassword && !!password) dispatch(putChangePassword(password, AllowedRol.contractor, contractor.id))
        setMessageSnackbar('Contratista modificado con exito')
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
            <Modal open={openEditContractorModal} onClose={() => setOpenEditContractorModal(false)}>
                <EditContractorModal 
                    contractor={contractor} 
                    changePassword={changePassword}
                    editContractor={_editContractor} 
                    setOpenEditContractorModal={setOpenEditContractorModal} 
                    setChangePassword={setChangePassword}
                />
            </Modal>
            <Grid container direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container className={classes.contractorDataRow} justifyContent='space-between' direction='row' alignItems={'center'}>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Nombre: </text>
                                <text className={classes.data}> {contractor.name || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Cuit: </text>
                                <text className={classes.data}> {contractor.cuit || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Usuario: </text>
                                <text className={classes.data}> {contractor?.username || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={() => {setOpenEditContractorModal(true)}}>
                                <EditIcon />
                            </Button>
                        </Grid>
                        
                    </Grid>
                    <Grid container className={classes.contractorDataRow} justifyContent='space-between' direction='row' alignItems={'center'}>      
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Calle: </text>
                                <text className={classes.data}> {contractor.address?.street || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Numero: </text>
                                <text className={classes.data}> {contractor.address?.number || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Ciudad: </text>
                                <text className={classes.data}> {contractor.address?.city || '-'} </text>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.contractorDataRow} justifyContent='space-between' direction='row' alignItems={'center'}>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Provincia: </text>
                                <text className={classes.data}> {contractor.address?.province || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Email: </text>
                                <text className={classes.data}> {contractor?.email || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Usuario: </text>
                                <text className={classes.data}> {contractor?.username ||'-'} </text>
                            </div>
                        </Grid>
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
            <CustomSnackbar open={openEditContractorSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() =>  setOpenEditContractorSuccess(false)} />
            <CustomSnackbar open={openEditContractorError && !!messageSnackbar} message={messageSnackbar} type='error' onClose={() =>  setOpenEditContractorError(false)} />
            <CustomSnackbar open={openSuccess} message='Documento creado con éxito' type='success' onClose={() => setOpenSuccess(false)} />
            <CustomSnackbar open={openFailure} message='Error creando documento' type='error' onClose={() => setOpenFailure(false)} />
        </>
    )
}

export default ContractorDetails;
import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Snackbar, } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { IDocument, IDriver } from '../../../../../utils/interfaces';
import CreateDriverDocumentModal from './components/CreateDriverDocumentModal';
import { createDocument, getDriverDocuments } from '../../../../../redux/slices/documentsSlice';
import { ROUTES } from '../../../navigation/routes';
import EditIcon from '@mui/icons-material/Edit';
import DocumentRow from './components/documentRow/DocumentRow';
import EditDriverModal from '../../../../../components/editDriverModal';
import { Alert } from '@mui/material';
import { editDriver } from '../../../../../redux/slices/resourcesSlice';
import CustomSnackbar from '../../../../../components/customSnackbar';
import { IUser } from '../../../../../redux/slices/userSlice';

const DriverDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openDriverDocumentModal, setOpenDriverDocumentModal] = useState(false)
    const [openEditDriverModal, setOpenEditDriverModal] = useState(false)
    const [openEditDriverSuccess, setOpenEditDriverSuccess] = useState(false)
    const [openEditDriverError, setOpenEditDriverError] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const [changePassword, setChangePassword] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openFailure, setOpenFailure] = useState(false)
    const driver: IDriver = useSelector((state: RootState) => {
        const drivers = state.resources.drivers.data
        return drivers[params.id]
    })
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.drivers.data)
    const loading: boolean = useSelector((state: RootState) => state.documents.drivers.loading)
    const success: boolean = useSelector((state: RootState) => state.resources.drivers.success)
    const error: boolean = useSelector((state: RootState) => state.resources.drivers.success)
    const documentSuccess = useSelector((state: RootState) => state.documents.success)
    const documentError = useSelector((state: RootState) => state.documents.error)

    useEffect(() => { 
        dispatch(getDriverDocuments(driver.id))
    }, [dispatch, driver.id])

    useEffect(() => {
        setOpenEditDriverSuccess(success)
    }, [success])

    useEffect(() => {
        setOpenSuccess(documentSuccess)
    }, [documentSuccess])

    useEffect(() => {
        setOpenFailure(!!error)
    }, [error])

    useEffect(() => {
        setOpenFailure(!!documentError)
    }, [documentError])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[], contractorId: number) => {
        dispatch(createDocument(expirationDate, type, entityType, entityId, images, contractorId))
        setOpenDriverDocumentModal(false)
    }
    
    const _editDriver = (
        driver: IDriver | IUser, 
        name: string, 
        surname: string, 
        cuit: string, 
        birthdate: moment.Moment, 
        street: string,
        number: number,
        city: string,
        province: string,
        zipCode: string,
        password?: string) => {
        if (changePassword)
            dispatch(editDriver(driver, name, surname, cuit, birthdate, street, number, city, province, zipCode, password))
        else
            dispatch(editDriver(driver, name, surname, cuit, birthdate, street, number, city, province, zipCode))
        setMessageSnackbar('Conductor modificado con exito')
    }

    return (
        <>
            <Modal open={openDriverDocumentModal} onClose={() => setOpenDriverDocumentModal(false)}>
                <CreateDriverDocumentModal
                    setOpenDriverDocumentModal={setOpenDriverDocumentModal}
                    addDocument={addDocument}
                    driverId={driver.id}
                    contractorId={driver.contractor.id}
                />
            </Modal>
            <Modal open={openEditDriverModal} onClose={() => setOpenEditDriverModal(false)}>
                <EditDriverModal 
                    driver={driver} 
                    changePassword={changePassword}
                    editDriver={_editDriver} 
                    setOpenEditDriverModal={setOpenEditDriverModal} 
                    setChangePassword={setChangePassword}
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
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Nombre: </text>
                                <text className={classes.data}> {driver?.name} </text>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Apellido: </text>
                                <text className={classes.data}> {driver?.surname} </text>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={() => {setOpenEditDriverModal(true)}}>
                                <EditIcon />
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-start' direction='row' alignItems={'center'}>
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Direccion: </text>
                                <text className={classes.data}> {driver?.address?.street || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Numero: </text>
                                <text className={classes.data}> {driver?.address?.number || '-'} </text>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-start' direction='row' alignItems={'center'}>
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Ciudad: </text>
                                <text className={classes.data}> {driver?.address?.city ||'-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Provincia: </text>
                                <text className={classes.data}> {driver?.address?.province || '-'} </text>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-start' direction='row' alignItems={'center'}>
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Codigo Postal: </text>
                                <text className={classes.data}> {driver?.address?.zip_code || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Fecha de nacimiento: </text>
                                <text className={classes.data}> {moment(driver.birth_date).format('DD/MM/YY') || '-'} </text>
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
                            <Button onClick={() => setOpenDriverDocumentModal(true)}>
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
            }
            <CustomSnackbar open={openEditDriverSuccess && !!messageSnackbar} message={messageSnackbar} type='success' onClose={() =>  setOpenEditDriverSuccess(false)} />
            <CustomSnackbar open={openEditDriverError} message={'Error editando conductor'} type='error' onClose={() =>  setOpenEditDriverError(false)} />
            <CustomSnackbar open={openSuccess} message='Documento creado con éxito' type='success' onClose={() => setOpenSuccess(false)} />
            <CustomSnackbar open={openFailure} message='Error creando documento' type='error' onClose={() => setOpenFailure(false)} />
        </>
    )
}

export default DriverDetails;
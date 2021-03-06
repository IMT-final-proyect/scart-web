import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal } from '@material-ui/core'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './styles' 
import { Link, useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../../../redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from "qrcode.react";
import moment from 'moment';
import { IDocument, IDriver } from '../../../../utils/interfaces';
import CreateDriverDocumentModal from './components/CreateDriverDocumentModal';
import { createDocument, getDriverDocuments } from '../../../../redux/slices/documentsSlice';
import { ROUTES } from '../../../../screens/admin/navigation/routes';
import EditIcon from '@mui/icons-material/Edit';
import DocumentRow from './components/documentRow/DocumentRow';
import EditDriverModal from '../../../editDriverModal';
import { editDriver } from '../../../../redux/slices/resourcesSlice';
import CustomSnackbar from '../../../customSnackbar';
import { IUser, putChangePassword } from '../../../../redux/slices/userSlice';
import { AllowedRol } from '../../../../utils/constants';
import { useRol } from '../../../../customHooks';

const DriverDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const rol = useRol()
    const { location } = useHistory()
    const path =  location.pathname.split('/')
    const [qrModal, setQrModal] = useState(false)
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
    const errorMessage = useSelector((state: RootState) => state.resources.drivers.error?.message)
    const documentSuccess = useSelector((state: RootState) => state.documents.success)
    const documentError = useSelector((state: RootState) => state.documents.error)

    useEffect(() => { 
        dispatch(getDriverDocuments(driver.id))
    }, [dispatch, driver.id])

    useEffect(() => {
        setOpenEditDriverSuccess(success)
    }, [success])


    useEffect(() => {
        setOpenEditDriverError(errorMessage ? true : false)
        setMessageSnackbar(errorMessage || '')
    }, [errorMessage])

    useEffect(() => {
        setOpenSuccess(documentSuccess)
    }, [documentSuccess])

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
        username: string,
        cuit: string, 
        phone: string,
        birthdate: moment.Moment, 
        email: string,
        password?: string) => {
        dispatch(editDriver(driver, name, surname, username, cuit, phone, birthdate, email))
        if (changePassword && !!password) dispatch(putChangePassword(password, AllowedRol.driver, driver.id))
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
            <Modal open={qrModal} onClose={() => setQrModal(false)}>
                <Grid className={classes.qrModal}>
                    <QRCode value={driver.id?.toString()} size={350} includeMargin/>
                </Grid>
            </Modal>
            {loading ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
            <Grid container direction='column' justifyContent='space-between'>
                <Card className={classes.cardContainer}>
                    <Grid container justifyContent='space-between' direction='row' alignItems={'center'}>
                        <Grid item xs={5}>
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
                            <Button className={classes.qrButton} variant='outlined' onClick={() => setQrModal(true)}>
                                <QrCode2Icon/>
                                <text>Ver QR</text>
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            {rol !== AllowedRol.auditor && rol !== AllowedRol.manager && rol !== AllowedRol.security &&
                                <Button onClick={() => {setOpenEditDriverModal(true)}}>
                                    <EditIcon />
                                </Button>
                            }
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-start' direction='row' alignItems={'center'}>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Telefono: </text>
                                <text className={classes.data}> {driver?.phone || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Email: </text>
                                <text className={classes.data}> {driver?.email || '-'} </text>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-start' direction='row' alignItems={'center'}>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> CUIL: </text>
                                <text className={classes.data}> {driver?.cuit || '-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Fecha de nacimiento: </text>
                                <text className={classes.data}> {moment(driver.birth_date).format('DD/MM/YY') || '-'} </text>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent='flex-start' direction='row' alignItems={'center'}>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Usuario: </text>
                                <text className={classes.data}> {driver?.username ||'-'} </text>
                            </div>
                        </Grid>
                        <Grid item xs={5}>
                            <div className={classes.dataContainer}>
                                <text className={classes.dataField}> Contratista: </text>
                                <text className={classes.data}> {driver?.contractor.name ||'-'} </text>
                            </div>
                        </Grid>
                    </Grid>
                </Card>
                <Grid item xs={12}>
                    <Card className={classes.rightCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Documentaci??n asociada
                            </text>
                            {rol !== AllowedRol.security && rol !== AllowedRol.auditor && 
                                <Button onClick={() => setOpenDriverDocumentModal(true)}>
                                    <AddCircleIcon className={classes.circleIcon} />
                                </Button>
                            }
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
                                    Importancia
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
                                        to={'/'+path[1]+ROUTES.documentDetails+'/'+documents[parseInt(key)].id}
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
            <CustomSnackbar open={openEditDriverError} message={messageSnackbar} type='error' onClose={() =>  setOpenEditDriverError(false)} />
            <CustomSnackbar open={openSuccess} message='Documento creado con ??xito' type='success' onClose={() => setOpenSuccess(false)} />
            <CustomSnackbar open={openFailure} message='Error creando documento' type='error' onClose={() => setOpenFailure(false)} />
        </>
    )
}

export default DriverDetails;
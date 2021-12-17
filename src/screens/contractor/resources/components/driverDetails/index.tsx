import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, Grid, Modal, Snackbar, Typography, } from '@material-ui/core'
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
import EditDriverModal from '../../../../../components/editDriverModal';
import EditIcon from '@mui/icons-material/Edit';
import { editDriver, getDriverById } from '../../../../../redux/slices/resourcesSlice';
import { Alert } from '@mui/material';
import DocumentRow from '../documentRow/DocumentRow';


const autos: string[] = []


const DriverDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    const [openDriverDocumentModal, setOpenDriverDocumentModal] = useState(false)
    const [openEditDriverModal, setOpenEditDriverModal] = useState(false)
    const [openEditDriverSuccess, setOpenEditDriverSuccess] = useState(false)
    const [messageSnackbar, setMessageSnackbar] = useState('')
    const [changePassword, setChangePassword] = useState(false)
    const driver: IDriver = useSelector((state: RootState) => {
        const drivers = state.resources.drivers.data
        return drivers[params.id]
    })
    const accountData = useSelector((state: RootState) => state.user.accountData)
    const documents: IDocument[] = useSelector((state: RootState) => state.documents.drivers.data)
    const loading: boolean = useSelector((state: RootState) => state.documents.drivers.loading)
    const success: boolean = useSelector((state: RootState) => state.resources.drivers.success)

    useEffect(() => { 
        dispatch(getDriverById(params.id))
        dispatch(getDriverDocuments(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        setOpenEditDriverSuccess(success)
    }, [success])

    const addDocument = (expirationDate: moment.Moment, type: number, entityType: number, entityId: number, images: string[]) => {
        if (!!accountData)
            dispatch(createDocument(expirationDate, type, entityType, entityId, images, accountData.entityId))
        setOpenDriverDocumentModal(false)
    }

    const _editDriver = (driver: IDriver, name: string, surname: string, cuit: string, birthdate: moment.Moment, password: string) => {
        if (changePassword)
            dispatch(editDriver(driver, name, surname, cuit, birthdate, password))
        else
            dispatch(editDriver(driver, name, surname, cuit, birthdate))
        setMessageSnackbar('Conductor modificado con exito')
    }

    return (
        <>
            <Modal open={openDriverDocumentModal} onClose={() => setOpenDriverDocumentModal(false)}>
                <CreateDriverDocumentModal
                    setOpenDocumentModal={setOpenDriverDocumentModal}
                    addDocument={addDocument}
                    driverId={parseInt(params.id)}
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
            {loading || !driver ?
                <Grid container alignContent='center' justifyContent='center' >
                    <CircularProgress className={classes.spinner} />
                </Grid>
                :
            <Grid container className={classes.container} direction='column' justifyContent='space-between'>
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
                                <text className={classes.data}> {driver?.address?.zipcode || '-'} </text>
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
                <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Card className={classes.leftCard}>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.textTitle}>
                                    Vehiculos conducidos
                                </text>
                            </Grid>
                            {autos.length === 0 ? 
                            <Typography className={classes.textCenter}> El conductor no ha conducido ningún vehiculo aún</Typography>
                                :
                                <>
                                    <Grid container justifyContent='space-between'>
                                        <Grid item xs={4} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Marca
                                            </text>
                                        </Grid>
                                        <Grid item xs={4} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Modelo
                                            </text>
                                        </Grid>
                                        <Grid item xs={4} className={classes.headerText}>
                                            <text className={classes.headerText}>
                                                Patente
                                            </text>
                                        </Grid>
                                    </Grid>
                                    <Grid container direction='column' justifyContent='space-between' >
                                        {/* {autos.map((auto) =>
                                            <Vehicle 
                                                key={auto.id}
                                                brand={auto.brand}
                                                model={auto.model}
                                                plate={auto.plate}
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
                                    Documentación asociada
                                </text>
                                <Button onClick={() => setOpenDriverDocumentModal(true)}>
                                    <AddCircleIcon className={classes.circleIcon} />
                                </Button>
                            </Grid>
                            {Object.keys(documents).length !== 0 ?
                                <>
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
                                :
                                <Typography className={classes.textCenter}>No hay documentacion asociada</Typography>
                            }
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            }
            <Snackbar className={classes.snackbar} open={openEditDriverSuccess && !!messageSnackbar} autoHideDuration={6000} onClose={() => setOpenEditDriverSuccess(false)} >
                <Alert onClose={() => setOpenEditDriverSuccess(false)} severity="success" sx={{ width: '50%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </>
    )
}

export default DriverDetails;


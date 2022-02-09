import React, { useEffect, useState } from 'react';

import { Button, Card, CircularProgress, Grid, Modal, TextField} from '@material-ui/core';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import Base64Downloader from 'react-base64-downloader';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getDriverDocuments, getVehicleDocuments } from '../../../redux/slices/documentsSlice';
import { RootState } from '../../../redux/rootReducer';
import globalColors from '../../../utils/styles/globalColors';
import { ROUTES } from '../navigation/routes';
import CustomSnackbar from '../../../components/customSnackbar';
import { getDriverById, getSecurityById, getVehicleById } from '../../../redux/slices/resourcesSlice';
import useStyles from './styles';
import { getStateColor, getStateName } from '../../../utils/functions/states';
import { States } from '../../../utils/constants';
import { putUpdateExceptions, _cleanSnackbar } from '../../../redux/slices/exceptionsSlice';

const ExceptionDetails = () => {
    const dispatch = useDispatch()
    const params: any = useParams();
    const { id, driverId, vehicleId, securityId } = params
    const history = useHistory();
    const [comment, setComment] = useState('')
    const [image, setImage] = useState('')
    const [modalImage, setModalImage] = useState(false)
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const loadingDriver = useSelector((state: RootState) => state.resources.drivers.loading)
    const loadingVehicle = useSelector((state: RootState) => state.resources.vehicles.loading)
    const loadingSecurity = useSelector((state: RootState) => state.resources.securities.loading)
    const evaluationLoading = useSelector((state:RootState) => state.exceptions.evaluationLoading)
    const userId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const evaluationSuccess = useSelector((state: RootState) => state.exceptions.evaluationSuccess)
    const error = useSelector((state: RootState) => state.exceptions.error)
    const driver = useSelector((state: RootState) => state.resources.drivers?.data[driverId])
    const vehicle = useSelector((state: RootState) => state.resources.vehicles?.data[vehicleId])
    const security = useSelector((state: RootState) => state.resources.securities?.data[securityId])
    const driverDocuments = useSelector((state: RootState) => state.documents.drivers.data)
    const vehicleDocuments = useSelector((state: RootState) => state.documents.vehicles.data)
    
    // const severity =  getSeverityName(activeDocument.type.severity)
    // const color = getSeverityColor(severity)
    const classes = useStyles();

    useEffect(() => {
        dispatch(getDriverById(driverId))
        dispatch(getVehicleById(vehicleId))
        dispatch(getSecurityById(securityId))
        dispatch(getDriverDocuments(driverId))
        dispatch(getVehicleDocuments(vehicleId))
    }, [dispatch, driverId, securityId, vehicleId])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    useEffect(() => {
        if(image !== '') setModalImage(true)
    }, [image])

    useEffect(() => {
        if(evaluationSuccess){
            history.push(ROUTES.root)
        }
        else{
            if(!!error?.message) setErrorSnackbar(true)
        }
    }, [error?.message, evaluationSuccess, history])

    const closeImagePicker = (value: any) => {
        setModalImage(false)
        setImage('')
    }

    useEffect(() => {
        if(evaluationSuccess){
            history.push(ROUTES.root)
        }
        else{
            if(!!error?.message) setErrorSnackbar(true)
        }
    }, [error?.message, evaluationSuccess, history])

    const handleRejected = () => {
        dispatch(putUpdateExceptions(id, comment, userId as number, 1))
        dispatch(_cleanSnackbar())
    }
    
    const handleApprove = () => {
        dispatch(putUpdateExceptions(id, comment, userId as number, 0))
        dispatch(_cleanSnackbar())
    }


    return (
    <>
        <Modal open={modalImage} onClose={() => closeImagePicker} onBackdropClick={closeImagePicker}>
            <div className={classes.imageCard}>
                <img src={image} alt='document' className={classes.image}/>
            </div>
        </Modal>
        {loadingDriver || loadingVehicle || loadingSecurity || evaluationLoading ?
            <Grid container alignContent='center' justifyContent='center' >
                <CircularProgress className={classes.spinner} />
            </Grid>
            :
            <Grid container className={classes.container} direction='row'>
                <Card className={classes.card}>
                    <Grid container justifyContent='flex-start'>
                        <text className={classes.textTitle}>
                            Conductor:
                        </text>
                        <text className={classes.textTitleField}>
                            {driver?.name + ' ' + driver?.surname || '-'}
                        </text>
                    </Grid>
                    <Grid container className={classes.dataFieldContainer} justifyContent='flex-start'>
                        <text className={classes.field}>
                            Documento:
                        </text>
                        <text className={classes.dataField}>
                            {driver?.cuit}
                        </text>
                    </Grid>
                    <Grid container justifyContent='flex-start'>
                        <text className={classes.textTitle}>
                            Vehiculo:
                        </text>
                        <text className={classes.textTitleField}>
                            {vehicle?.plate || '-'}
                        </text>
                    </Grid>
                    <Grid container justifyContent='flex-start'>
                        <text className={classes.textTitle}>
                            Seguridad:
                        </text>
                        <text className={classes.textTitleField}>
                            {security?.name || '-'}
                        </text>
                    </Grid>
                    <Grid container justifyContent='flex-start'>
                        <text className={classes.textTitle}>
                            Contratista:
                        </text>
                        <text className={classes.textTitleField}>
                            {vehicle?.contractor?.name || '-'}
                        </text>
                    </Grid>
                </Card>
                <Grid container className={classes.bottomContainer} direction='row' justifyContent='space-between'>
                    <Grid item md={6}>
                        <Card className={classes.filesCard}>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.fieldFile}>
                                    Archivos inválidos
                                </text>
                            </Grid>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.entityName}>
                                    Conductor
                                </text>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                {Object.keys(driverDocuments).map((key: string) => {
                                    if(driverDocuments[parseInt(key)].state === States.VALID)
                                        return true
                                    else                                
                                        return(
                                            <>
                                                <Grid item xs={9}>
                                                    <text className={classes.fileTitle}>
                                                        {driverDocuments[parseInt(key)].type.name}
                                                    </text>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Grid className={classes.stateColor} style={{backgroundColor: getStateColor(getStateName(driverDocuments[parseInt(key)].state))}}>
                                                        <text className={classes.stateText} >
                                                            {getStateName(driverDocuments[parseInt(key)].state)}
                                                        </text>
                                                    </Grid>
                                                </Grid>
                                                {driverDocuments[parseInt(key)].photos.length > 0 ? 
                                                    <Grid container direction='column' justifyContent='space-between'>
                                                        <Grid container justifyContent='space-between'>
                                                            {driverDocuments[parseInt(key)].photos.map((value: string, index: number) => {
                                                                    return(
                                                                        <Grid key={index} className={classes.filesCard} container direction='row'>
                                                                            <Grid item xs={1}>
                                                                                <AttachFileIcon/>
                                                                            </Grid>
                                                                            <Grid item xs={7}>
                                                                                <text style={{fontSize: 15}}>Archivo {index+1}</text>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <Base64Downloader 
                                                                                    base64={value}
                                                                                    downloadName={`archivo${index+1}`}
                                                                                    Tag="a"
                                                                                    extraAttributes={{ href: '#' }}
                                                                                    className="my-class-name"
                                                                                    style={{ color: globalColors.lightBlue }}
                                                                                >
                                                                                        <DownloadIcon style={{fontSize: 30}}/>
                                                                                </Base64Downloader>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <Button 
                                                                                    size="small" 
                                                                                    style={{padding: 0}} 
                                                                                    onClick={() => 
                                                                                        setImage(value)
                                                                                    }
                                                                                >
                                                                                    <PreviewIcon style={{fontSize: 30}} />
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                    :
                                                    <text className={classes.textCenter}> No hay archivos cargados</text>
                                                }
                                            </>
                                            )
                                    })
                                }
                            </Grid>
                            <Grid container className={classes.titleContainer} justifyContent='space-between'>
                                <text className={classes.entityName}>
                                    Vehiculos
                                </text>
                            </Grid>
                            <Grid container justifyContent='space-between'>
                                {Object.keys(vehicleDocuments).map((key: string) => {
                                    if(vehicleDocuments[parseInt(key)].state === States.VALID)
                                        return true
                                    else                                
                                        return(
                                            <>
                                                <Grid item xs={9}>
                                                    <text className={classes.fileTitle}>
                                                        {vehicleDocuments[parseInt(key)].type.name}
                                                    </text>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Grid className={classes.stateColor} style={{backgroundColor: getStateColor(getStateName(vehicleDocuments[parseInt(key)].state))}}>
                                                        <text className={classes.stateText} >
                                                            {getStateName(vehicleDocuments[parseInt(key)].state)}
                                                        </text>
                                                    </Grid>
                                                </Grid>
                                                {vehicleDocuments[parseInt(key)].photos.length > 0 ? 
                                                    <Grid container direction='column' justifyContent='space-between'>
                                                        <Grid container justifyContent='space-between'>
                                                            {vehicleDocuments[parseInt(key)].photos.map((value: string, index: number) => {
                                                                    return(
                                                                        <Grid key={index} className={classes.filesCard} container direction='row'>
                                                                            <Grid item xs={1}>
                                                                                <AttachFileIcon/>
                                                                            </Grid>
                                                                            <Grid item xs={7}>
                                                                                <text style={{fontSize: 15}}>Archivo {index+1}</text>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <Base64Downloader 
                                                                                    base64={value}
                                                                                    downloadName={`archivo${index+1}`}
                                                                                    Tag="a"
                                                                                    extraAttributes={{ href: '#' }}
                                                                                    className="my-class-name"
                                                                                    style={{ color: globalColors.lightBlue }}
                                                                                >
                                                                                        <DownloadIcon style={{fontSize: 30}}/>
                                                                                </Base64Downloader>
                                                                            </Grid>
                                                                            <Grid item xs={2}>
                                                                                <Button 
                                                                                    size="small" 
                                                                                    style={{padding: 0}} 
                                                                                    onClick={() => 
                                                                                        setImage(value)
                                                                                    }
                                                                                >
                                                                                    <PreviewIcon style={{fontSize: 30}} />
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    )
                                                                })
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                    :
                                                    <text className={classes.textCenter}> No hay archivos cargados</text>
                                                }
                                            </>
                                            )
                                    })
                                }
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card className={classes.commentCard}>
                            <TextField
                                className={classes.textField}
                                id="Comentario"
                                label="Observación"
                                multiline
                                value={comment}
                                onChange={handleChange}
                                variant="outlined"
                                rows={4}
                            />
                            <Grid container justifyContent='flex-end'>
                                <Button variant="contained" color="inherit" className={classes.rechazar} onClick={handleRejected}>Rechazar</Button>
                                <Button variant="contained" color="primary" className={classes.text} onClick={handleApprove}>Aceptar</Button>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        }
        <CustomSnackbar open={errorSnackbar} message={error?.message || 'Hubo un error evaluando el documento'} type='error' onClose={() => setErrorSnackbar(false)} />

    </>
    )
}

export default ExceptionDetails;
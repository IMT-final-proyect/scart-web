import React, { useEffect, useState } from 'react';

import { Button, Card, CircularProgress, Grid, Modal, TextField} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import FilePreview from "react-file-preview-latest";    
import { RootState } from '../../../redux/rootReducer';
import { ROUTES } from '../navigation/routes';
import CustomSnackbar from '../../../components/customSnackbar';
import { getDriverById, getSecurityById, getVehicleById } from '../../../redux/slices/resourcesSlice';
import useStyles from './styles';
import { putUpdateExceptions, _cleanSnackbar, getInvalidDocuments } from '../../../redux/slices/exceptionsSlice';
import ResourcesTabs from './components/resourcesTabs';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

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
    const classes = useStyles();

    useEffect(() => {
        dispatch(getDriverById(driverId))
        dispatch(getVehicleById(vehicleId))
        dispatch(getSecurityById(securityId))
        dispatch(getInvalidDocuments(driverId, vehicleId))
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
                <FilePreview
                    type={"url"}
                    url={image}
                    onError={() => {}}
                />            
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
                            - Documento:
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
                        <Card>
                            <CardHeader
                                title="Archivos inválidos o faltantes"
                            />
                            <CardContent>
                                <ResourcesTabs setImage={setImage} />
                            </CardContent>
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
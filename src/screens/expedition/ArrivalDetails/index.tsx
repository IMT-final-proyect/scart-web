import React, { useEffect, useState } from 'react';

import { Button, Card, CircularProgress, Grid } from '@material-ui/core';
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { RootState } from '../../../redux/rootReducer';
import moment from 'moment';
import { ROUTES } from '../navigation/routes';
import CustomSnackbar from '../../../components/customSnackbar';
import CustomInput from '../../../components/customInput';
import { putEvaluateAccess } from '../../../redux/slices/expeditionsSlice';
import NumericInput from 'react-numeric-input';

const ArrivalDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params: any = useParams();
    const history = useHistory();
    const arrivalId: number = params.id
    const [emptyError, setEmptyError] = useState(false)
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [destination, setDestination] = useState<string>('')
    const arrival = useSelector((state: RootState) => state.expeditions.data.nonEvaluated[arrivalId])
    const userId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const authorizationSuccess = useSelector((state: RootState) => state.expeditions.authorization.success)
    const authorizationError = useSelector((state: RootState) => state.expeditions.authorization.error)
    const loading = useSelector((state: RootState) => state.expeditions.authorization.loading)

    const driver = JSON.parse(arrival.driver)
    const vehicle = JSON.parse(arrival.vehicle)

    useEffect(() => {
        if(!arrival) history.push(ROUTES.root)
    }, [arrival, history])
    
    useEffect(() => {
        if(authorizationSuccess){
            history.push(ROUTES.root)
        }
        else{
            if(!!authorizationError?.message) setErrorSnackbar(true)
        }
    }, [authorizationError?.message, authorizationSuccess, history])

    const handleRejected = () => {
        dispatch(putEvaluateAccess(arrival.id, "1", destination, userId))
    }
    
    const handleApprove = () => {
        if(!!destination)
            dispatch(putEvaluateAccess(arrival.id, "0", destination, userId,))
        else{
            setEmptyError(true)
        }
    }

    return (
    <>
        {!!arrival && 
            <>
                <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                    <Grid container className={classes.bottomContainer} direction='row' justifyContent='space-between'>
                        <Card className={classes.card}>
                            <Grid container>
                                <text className={classes.textTitle}>
                                    Anuncio 
                                </text>
                            </Grid>
                            <Grid container className={classes.arrivalDataRow} justifyContent='space-between' direction='row'>
                                <Grid item xs={4}>
                                    <text className={classes.field}>
                                        Nombre del conductor: 
                                    </text>
                                    <text className={classes.dataField}>
                                        {driver.name}
                                    </text>
                                </Grid>
                                <Grid item xs={4}>
                                    <text className={classes.field}>
                                        Telefono del conductor: 
                                    </text>
                                    <text className={classes.dataField}>
                                        {driver.phone ? driver.phone : '-'}
                                    </text>
                                </Grid>
                                <Grid item xs={4} />
                            </Grid>
                            <Grid container className={classes.arrivalDataRow} justifyContent='space-between' direction='row'>
                                <Grid item xs={4}>
                                    <Grid container direction='row'>
                                        <text className={classes.field}>
                                            Vehiculo: 
                                        </text>
                                        <div className={classes.dataField}>
                                            <text> {vehicle.plate} </text>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container direction='row'>
                                        <text className={classes.field}>
                                            Tipo de vehiculo: 
                                        </text>
                                        <div className={classes.dataField}>
                                            <text> {vehicle.type ? vehicle.type : '-'} </text>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4} />
                            </Grid>
                            <Grid container className={classes.arrivalDataRow} justifyContent='space-between' direction='row'>
                                <Grid item xs={4}>
                                    <Grid container direction='row'>
                                        <text className={classes.field}>
                                            Contratista: 
                                        </text>
                                        <div className={classes.dataField}>
                                            <text> {arrival.contractor} </text>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <text className={classes.field}>
                                        Horario de anuncio: 
                                    </text>
                                    <text className={classes.dataField}>
                                        {moment(arrival.arrivalTime).format('DD/MM/YYYY - HH:mm')}
                                    </text>
                                </Grid>
                                <Grid item xs={4}>
                                    <text className={classes.field}>
                                        Pallets de entrada: 
                                    </text>
                                    <text className={classes.dataField}>
                                        {arrival.palletsEntrada}
                                    </text>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid container className={classes.bottomContainer} direction='row' justifyContent='space-between'>
                        <Card className={classes.palletsCard}>
                            <Grid container justifyContent='space-between'>
                                <text className={classes.textTitle}>
                                    Evaluar anuncio 
                                </text>
                            </Grid>
                            <Grid container justifyContent='space-between' alignItems='flex-end'>
                                <Grid item xs={6}>
                                    <CustomInput value={destination} setValue={setDestination} placeholder='Destino' />
                                </Grid>
                                <Grid item xs={6}>
                                    {loading ?
                                        <Grid container justifyContent='center' alignItems='center'>
                                            <CircularProgress  size={30} />
                                        </Grid>
                                    :
                                        <Grid container justifyContent='center' alignItems='center'>
                                            <Button variant="contained" color="inherit" className={classes.rechazar} onClick={handleRejected}>
                                                Rechazar
                                            </Button>
                                            <Button variant="contained" color="primary" className={classes.text} onClick={handleApprove}>
                                                Aceptar
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <CustomSnackbar open={errorSnackbar} message={authorizationError?.message || 'Hubo un error evaluando el arribo'} type='error' onClose={() => setErrorSnackbar(false)} />
                <CustomSnackbar open={emptyError} message={'Debe agregar cantidad no negativa de pallets y un destino'} type='error' onClose={() => setEmptyError(false)} />
            </>
        }
    </>
    )
}

export default ArrivalDetails

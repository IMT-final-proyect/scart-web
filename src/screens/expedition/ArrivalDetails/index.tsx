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
import { putEvaluateAccess, _cleanSnackbar } from '../../../redux/slices/expeditionsSlice';
import NumericInput from 'react-numeric-input';

const ArrivalDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const params: any = useParams();
    const history = useHistory();
    const arrivalId: number = params.id
    const [errorSnackbar, setErrorSnackbar] = useState(false)
    const [palletsOut, setPalletsOut] = useState<number>()
    const [destination, setDestination] = useState<string>('')
    const arrival = useSelector((state: RootState) => state.expeditions.data[arrivalId])
    const userId = useSelector((state: RootState) => state.user.accountData?.entityId)
    const authorizationSuccess = useSelector((state: RootState) => state.expeditions.authorization.success)
    const authorizationLoading = useSelector((state: RootState) => state.expeditions.authorization.error)
    const authorizationError = useSelector((state: RootState) => state.expeditions.authorization.error)

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
        dispatch(putEvaluateAccess(arrival.id, 1, userId))
        dispatch(_cleanSnackbar())
    }
    
    const handleApprove = () => {
        dispatch(putEvaluateAccess(arrival.id, 0, userId,))
        dispatch(_cleanSnackbar())
    }

    return (
    <>
        {!!arrival && 
            <>
                {authorizationLoading ?
                    <Grid container alignContent='center' justifyContent='center' >
                        <CircularProgress className={classes.spinner} />
                    </Grid>
                    :
                    <Grid container className={classes.container} direction='row'>
                        <Card className={classes.card}>
                            <Grid container justifyContent='space-between'>
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
                                        {arrival.driver}
                                    </text>
                                </Grid>
                                <Grid item xs={4}>
                                    <text className={classes.field}>
                                        Telefono del conductor: 
                                    </text>
                                    <text className={classes.dataField}>
                                        {arrival.driverPhone ? arrival.driverPhone : '-'}
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
                                            <text> {arrival.vehicle} </text>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container direction='row'>
                                        <text className={classes.field}>
                                            Tipo de vehiculo: 
                                        </text>
                                        <div className={classes.dataField}>
                                            <text> {arrival.vehicleType ? arrival.vehicleType : '-'} </text>
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
                                        {moment(arrival.arrivalTime).format('DD/MM/YYYY')}
                                    </text>
                                </Grid>
                                <Grid item xs={4}>
                                    <text className={classes.field}>
                                        Pallets de entrada: 
                                    </text>
                                    <text className={classes.dataField}>
                                        {arrival.palletsIn ? arrival.palletsIn : '-'}
                                    </text>
                                </Grid>
                            </Grid>
                        </Card>
                        <Grid container className={classes.bottomContainer} direction='row' justifyContent='space-between'>
                            <Card className={classes.palletsCard}>
                                <Grid container justifyContent='space-between'>
                                    <text className={classes.textTitle}>
                                        Evaluar anuncio 
                                    </text>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <text className={classes.palletsText}>Pallets de salida</text>
                                        <NumericInput value={palletsOut} onChange={(valueAsNumber) => setPalletsOut(valueAsNumber as number)}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <CustomInput value={destination} setValue={setDestination} placeholder='Destino' />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Grid container justifyContent='flex-end'>
                                            <Button variant="contained" color="inherit" className={classes.rechazar} onClick={handleRejected}>Rechazar</Button>
                                            <Button variant="contained" color="primary" className={classes.text} onClick={handleApprove}>Aceptar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                }
                <CustomSnackbar open={errorSnackbar} message={authorizationError?.message || 'Hubo un error evaluando el arribo'} type='error' onClose={() => setErrorSnackbar(false)} />
            </>
        }
    </>
    )
}

export default ArrivalDetails

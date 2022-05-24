import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IArrival } from '../../../../../utils/interfaces';
import moment from 'moment';
import globalColors from '../../../../../utils/styles/globalColors';
import { getResultColor, getResultName } from '../../../../../utils/functions/results';

interface Props{
    index: number
    arrival: IArrival
    _handleOpenModal: (id: number) => void
}
const ArrivalRow = ({ index, arrival, _handleOpenModal }: Props) => {
    const classes = useStyles();
    const driver = JSON.parse(arrival.driver)
    const vehicle = JSON.parse(arrival.vehicle)
    const resultName = getResultName(arrival.result)
    const resultColor = getResultColor(arrival.result)

    return(
        <Grid container className={classes.container} style={{backgroundColor: (index % 2) == 0 ? globalColors.grey : globalColors.white}} direction="row" justifyContent='space-between'>
            <Grid item xs={1} className={classes.text}>
                <text> {driver.name.length > 60 ? driver.name.substring(0, 40)+'...' : driver.name} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {driver.phone} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {vehicle.plate.length > 60 ? vehicle.plate.substring(0, 40)+'...' : vehicle.plate} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {vehicle.type || '-'} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {arrival.contractor.length > 60 ? arrival.contractor.substring(0, 40)+'...' : arrival.contractor} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {arrival.destiny || '-'} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> Entrada: {arrival.palletsEntrada} / Salida: {parseInt(arrival.palletsSalida) > -1 ? arrival.palletsSalida : '-'} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text className={classes.stateColor} style={{backgroundColor: resultColor}}> {resultName} </text>
            </Grid>
            <Grid item xs={1}>
                <text> {moment(arrival.arrivalTime).format('DD/MM/YY - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1}>
                <text> {moment(arrival.arrivalTime).format('DD/MM/YY - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1}>
                <text> {moment(arrival.arrivalTime).format('DD/MM/YY - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={1} className={classes.container}>
                {arrival.result === 0 ?
                    <Button className={classes.button} onClick={() => _handleOpenModal(arrival.id)} > 
                        Modificar
                    </Button>    
                :
                <Button className={classes.noActions} onClick={() => {}} > 
                    -
                </Button>    
                }
            </Grid>
        </Grid>
    )
}

export default ArrivalRow;
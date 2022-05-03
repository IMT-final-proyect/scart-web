import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IArrival } from '../../../../../utils/interfaces';
import moment from 'moment';

interface Props{
    arrival: IArrival
}
const ArrivalRow = ({ arrival }: Props) => {
    const classes = useStyles();
    const driver = JSON.parse(arrival.driver)
    const vehicle = JSON.parse(arrival.vehicle)

    return(
        <Grid container className={classes.container} direction="row" justifyContent='space-between'>
            <Grid item xs={2} className={classes.text}>
                <text> {driver.name.length > 60 ? driver.name.substring(0, 87)+'...' : driver.name} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {vehicle.plate.length > 60 ? vehicle.plate.substring(0, 87)+'...' : vehicle.plate} </text>
            </Grid>
            <Grid item xs={2}>
                <text> {arrival.contractor.length > 60 ? arrival.contractor.substring(0, 87)+'...' : arrival.contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {arrival.palletsEntrada} </text>
            </Grid>
            <Grid item xs={2}>
                <text className={classes.stateColor}> {moment(arrival.arrivalTime).format('DD/MM/yy - HH:mm')} hs</text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <text className={classes.actions}>No hay acciones</text>    
            </Grid>
        </Grid>
    )
}

export default ArrivalRow;
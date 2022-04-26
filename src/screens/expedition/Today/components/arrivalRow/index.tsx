import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IArrival } from '../../../../../utils/interfaces';
import moment from 'moment';

interface Props{
    arrival: IArrival
    route: string
}
const ArrivalRow = ({ arrival, route }: Props) => {
    const classes = useStyles();
    
    return(
        <Grid container className={classes.container} direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {arrival.driver.length > 60 ? arrival.driver.substring(0, 87)+'...' : arrival.driver} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {arrival.vehicle.length > 60 ? arrival.vehicle.substring(0, 87)+'...' : arrival.vehicle} </text>
            </Grid>
            <Grid item xs={2}>
                <text> {arrival.contractor.length > 60 ? arrival.contractor.substring(0, 87)+'...' : arrival.contractor} </text>
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
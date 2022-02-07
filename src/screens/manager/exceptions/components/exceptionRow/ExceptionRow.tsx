import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IContractor } from '../../../../../utils/interfaces';

interface Props{
    driverId: number,
    vehicleId: number,
    securityId: number
    contractor?: IContractor,
}
const ExceptionRow = ({ driverId, contractor, vehicleId, securityId }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems='center'>
            <Grid item xs={3} className={classes.text}>
                <text> {driverId} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {vehicleId} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {securityId} </text>
            </Grid>
            <Grid item xs={1} className={classes.container}>
                <Button color="primary" className={classes.text}>Evaluar</Button>
            </Grid>
    </Grid>
    )
}

export default ExceptionRow;
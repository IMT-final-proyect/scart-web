import React from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './styles';

interface Props{
    fecha: string
    entrada: string
    salida: string
    totalHoras: number

} 
const ReportRow = ({ fecha, entrada, salida, totalHoras }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {fecha} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {entrada} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {salida} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {totalHoras} </text>
            </Grid>
        </Grid>
    )
}

export default ReportRow;
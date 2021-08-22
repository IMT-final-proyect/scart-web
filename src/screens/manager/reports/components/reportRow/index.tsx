import React from 'react';
import { Button, Grid } from '@material-ui/core';
import useStyles from './styles';

interface Props{
    name: string,
    type: string,
    contractor: string
}
const ReportRow = ({ name, type, contractor }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={4} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <Grid item xs={1} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {type} </text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button color="primary" className={classes.text}>Generar</Button>
            </Grid>
    </Grid>
    )
}

export default ReportRow;
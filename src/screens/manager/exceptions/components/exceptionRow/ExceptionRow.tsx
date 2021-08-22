import React from 'react';
import { Button, Grid } from '@material-ui/core';
import useStyles from './styles';

interface Props{
    name: string,
    contractor: string,
    state: string,
    resource: string
}
const Exception = ({ name, contractor, state, resource }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={4} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {resource} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {state} </text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button color="primary" className={classes.text}>Aceptar</Button>
                <Button color="secondary" className={classes.text}>Rechazar</Button>
            </Grid>
    </Grid>
    )
}

export default Exception;
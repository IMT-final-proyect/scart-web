import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';

interface Props{
    driver: string,
    vehicle: string,
    contractor: string,
    route: string
}
const ExceptionRow = ({ driver, contractor, vehicle, route }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems='center'>
            <Grid item xs={3} className={classes.text}>
                <text> {driver} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {vehicle} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button
                        className={classes.button}
                        component={Link}
                        to={route}
                > 
                    <Button color="primary" className={classes.text}>Evaluar</Button>
                </Button>
            </Grid>
    </Grid>
    )
}

export default ExceptionRow;
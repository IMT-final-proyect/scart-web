import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { IException } from '../../../../utils/interfaces';

interface Props{
    exception: IException
    route: string
}
const ExceptionRow = ({ exception, route }: Props) => {
    const classes = useStyles();
    const driver = JSON.parse(exception.arrival.driver)
    const vehicle = JSON.parse(exception.arrival.vehicle)
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems='center'>
            <Grid item xs={3} className={classes.text}>
                <text> {driver.name} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {vehicle.name} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {exception.arrival.contractor} </text>
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
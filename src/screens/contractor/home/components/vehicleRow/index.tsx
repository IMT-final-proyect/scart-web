import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

interface Props{
    brand: string,
    model: string,
    plate: string,
    id: number,
    state: string,
    color: string,
} 
const Vehicle = ({ brand, model, plate, id, state, color}: Props) => {
    const classes = useStyles({color});

    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {brand} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {model} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {plate} </text>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.state}>
                    <text className={classes.stateColor}> {state} </text>
                </div>
            </Grid>
    </Grid>
    )
}

export default Vehicle;
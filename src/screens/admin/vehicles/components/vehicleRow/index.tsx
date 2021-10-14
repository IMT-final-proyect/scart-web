import React from 'react';
import { Grid, } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

interface Props{
    brand: string,
    model: string,
    plate: string,
    contractor: string,
}
const VehicleRow = ({ brand, model, plate, contractor }: Props) => {
    const classes = useStyles();    
    
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {brand} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {model} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {plate} </text>
            </Grid>
            <Grid item xs={1} className={classes.iconContainer}>
                <CreateIcon />
                <DeleteIcon />
            </Grid>
    </Grid>
    )
}

export default VehicleRow;
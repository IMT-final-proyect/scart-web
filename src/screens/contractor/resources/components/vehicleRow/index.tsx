import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props{
    brand: string,
    model: string,
    plate: string
} 
const Vehicle = ({ brand, model, plate}: Props) => {
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} >
                <text> {brand} </text>
            </Grid>
            <Grid item xs={3} >
                <text> {model} </text>
            </Grid>
            <Grid item xs={3} >
                <text> {plate} </text>
            </Grid>
            <Grid item xs={1} >
                <CreateIcon />
                <DeleteIcon />
            </Grid>
    </Grid>
    )
}

export default Vehicle;
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

interface Props{
    brand: string,
    model: string,
    plate: string,
    id: number
    handleDeleteVehicle: (id: number) => void
} 
const Vehicle = ({ brand, model, plate, id, handleDeleteVehicle}: Props) => {
    const classes = useStyles();

    const handleClick = (e: any) => {
        e.preventDefault()
        handleDeleteVehicle(id)
    }
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
            <Grid item xs={2} className={classes.iconContainer}>
                <Button onClick={handleClick} >
                    <DeleteIcon />
                </Button>
            </Grid>
    </Grid>
    )
}

export default Vehicle;
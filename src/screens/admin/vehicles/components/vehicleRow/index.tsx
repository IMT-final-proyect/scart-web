import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

interface Props{
    brand: string,
    model: string,
    plate: string,
    contractor: string,
    id: number,
    handleDeleteVehicle: (id: number) => void
}
const VehicleRow = ({ brand, model, plate, contractor, id, handleDeleteVehicle }: Props) => {
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
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {plate} </text>
            </Grid>
            <Grid item xs={1} className={classes.iconContainer}>
                <Button onClick={handleClick} >
                    <DeleteIcon />
                </Button>
            </Grid>
    </Grid>
    )
}

export default VehicleRow;
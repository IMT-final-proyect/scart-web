import React from 'react';
import { Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import globalColors from '../../../../../utils/styles/globalColors';

interface Props{
    brand: string,
    plate: string,
    is_valid: boolean,
    id: number
    handleDeleteVehicle: (id: number) => void
} 
const Vehicle = ({ brand, is_valid, plate, id, handleDeleteVehicle}: Props) => {
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
                <text> {plate} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                {is_valid ? 
                    <div className={classes.state}>
                        <text className={classes.stateColor} style={{backgroundColor: globalColors.green}}>Válida</text>
                    </div>
                :
                    <div className={classes.state}>
                        <text className={classes.stateColor} style={{backgroundColor: globalColors.red}}>Inválida</text>
                    </div>
                }
            </Grid>
            <Grid item xs={2} className={classes.iconContainer}>
                <Button onClick={handleClick} >
                    <DeleteIcon />
                    <text className={classes.text}>
                        Deshabilitar
                    </text>
                </Button>
            </Grid>
    </Grid>
    )
}

export default Vehicle;
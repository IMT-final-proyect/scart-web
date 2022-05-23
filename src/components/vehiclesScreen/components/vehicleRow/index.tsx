import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import { useRol } from '../../../../customHooks';
import { AllowedRol } from '../../../../utils/constants';
import globalColors from '../../../../utils/styles/globalColors';

interface Props{
    brand: string,
    model: string,
    plate: string,
    contractor: string,
    is_valid: boolean,
    id: number,
    handleDeleteVehicle: (id: number) => void
}
const VehicleRow = ({ brand, model, plate, contractor, id, is_valid, handleDeleteVehicle }: Props) => {
    const classes = useStyles();    
    const rol = useRol()
    const handleClick = (e: any) => {
        e.preventDefault()
        handleDeleteVehicle(id)
    }

    return(
        <Grid container direction="row" justifyContent='space-between' alignItems={'center'}>
            <Grid item xs={3} className={classes.text}>
                <text> {brand} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {plate} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {model} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
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
            <Grid item xs={1} className={classes.iconContainer}>
                {(rol !== AllowedRol.auditor && rol !== AllowedRol.manager && rol !== AllowedRol.security) ?
                    <Button className={classes.button} onClick={handleClick} >
                        <DeleteIcon />
                        <text className={classes.text}>
                            Deshabilitar
                        </text>
                    </Button>
                :
                    <text className={classes.text}>
                        No hay acciones
                    </text>
                }
            </Grid>
    </Grid>
    )
}

export default VehicleRow;
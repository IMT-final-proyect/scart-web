import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IContractor } from '../../../../utils/interfaces';
import globalColors from '../../../../utils/styles/globalColors';
import DeleteIcon from '@material-ui/icons/Delete';
import { AllowedRol } from '../../../../utils/constants';
import { useRol } from '../../../../customHooks';

interface Props{
    contractor: IContractor
    handleDeleteContractor: (id: number) => void
}
const ContractorRow = ({ contractor, handleDeleteContractor }: Props) => {
    const classes = useStyles()
    const rol = useRol()
    const handleClick = (e: any) => {
        e.preventDefault()
        handleDeleteContractor(contractor.id)
    }
    return(
        <>
            <Grid container direction="row" justifyContent='space-between'>
                <Grid item xs={3} className={classes.text}>
                    <text> {contractor.name} </text>
                </Grid>
                <Grid item xs={3} className={classes.text}>
                    <text> {contractor.cuit} </text>
                </Grid>
                <Grid item xs={3} className={classes.text}>
                    <text> {contractor?.username || '-'} </text>
                </Grid>
                <Grid item xs={2} className={classes.text}>
                    {contractor.is_valid ? 
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
                    {(rol === AllowedRol.admin) ? (
                        <Button onClick={handleClick} >
                            <DeleteIcon /> 
                            <text className={classes.text}>
                                Deshabilitar
                            </text>
                        </Button>)
                    :
                    <text className={classes.text}>
                        No hay acciones
                    </text>
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default ContractorRow;
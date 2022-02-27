import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles'
import { ISpecialUser } from '../../../../../redux/slices/specialUsersSlice';
import { getRolName } from '../../../../../utils/functions/roles';

interface Props {
    user: ISpecialUser
    handleDeleteSpecialUser: (id: number, rol: number) => void
} 
const SpecialUserRow = ({ user, handleDeleteSpecialUser }: Props) => {
    const classes = useStyles();
    const rolName = getRolName(user.rol)

    const handleClick = (e: any) => {
        e.preventDefault()
        handleDeleteSpecialUser(user.id, user.rol)
    }
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems={'center'}>
            <Grid item xs={3} className={classes.text}>
                <text> {user.name} </text>
                <text> {user.surname} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {user.username || '-'} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {user.cuit} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {rolName} </text>
            </Grid>
            <Grid item xs={1} className={classes.iconContainer}>
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

export default SpecialUserRow;
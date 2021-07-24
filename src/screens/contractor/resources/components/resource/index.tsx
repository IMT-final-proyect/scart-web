import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
    },
    data:{
        justifyContent: 'start',
    },
    iconsContainer:{
        justifyContent: 'space-between',
    },
}));

interface Props{
    driver?: {
        nombre: string,
        documento: string,
        fnac: string
    }
    car?: {
        marca: string,
        modelo: string,
        patente: string
    }

} 
const Resource = ({ driver, car }: Props) => {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.data}>
                <text> {driver ? driver?.nombre : car?.marca} </text>
            </div>
            <div className={classes.data}>
                <text> {driver ? driver?.documento : car?.modelo} </text>
            </div>
            <div className={classes.data}>
                <text> {driver ? driver?.fnac : car?.patente} </text>
            </div>
            <div className={classes.iconsContainer}>
                <CreateIcon />
                <DeleteIcon />
            </div>
        </div>
    )
}

export default Resource;
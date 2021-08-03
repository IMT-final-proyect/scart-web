import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        display: 'flex',
        flex: 1,
        marginRight: '3%',
        marginLeft: '3%',
    },
    data:{
        width: '220px',
        justifyContent: 'space-between',
    },
    iconsContainer:{
        justifyContent: 'space-between',
    },
}));

interface Props{
    brand: string,
    model: string,
    plate: string
} 
const Vehicle = ({ brand, model, plate}: Props) => {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.data}>
                <text> {brand} </text>
            </div>
            <div className={classes.data}>
                <text> {model} </text>
            </div>
            <div className={classes.data}>
                <text> {plate} </text>
            </div>
            <div className={classes.iconsContainer}>
                <CreateIcon />
                <DeleteIcon />
            </div>
        </div>
    )
}

export default Vehicle;
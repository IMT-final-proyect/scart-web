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
        width: '150px',
        justifyContent: 'start',
    },
    iconsContainer:{
        justifyContent: 'space-between',
    },
}));

interface Props{
    name: string,
    document: string,
    birthday: string

} 
const Driver = ({ name, document, birthday }: Props) => {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.data}>
                <text> {name} </text>
            </div>
            <div className={classes.data}>
                <text> {document} </text>
            </div>
            <div className={classes.data}>
                <text> {birthday} </text>
            </div>
            <div className={classes.iconsContainer}>
                <CreateIcon />
                <DeleteIcon />
            </div>
        </div>
    )
}

export default Driver;
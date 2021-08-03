import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        display: 'flex',
        flex: 1,
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
    },
    data:{
        width: '150px',
        marginRight: 'space-between',
    },
    iconsContainer:{
        justifyContent: 'space-between',
    },
}));

interface Props{
    document: {
        nombre: string,
        vigencia: string,
        estado: string
    }

} 
const Document = ({ document }: Props) => {
    const classes = useStyles();
    return(
        <div className={classes.container}>
            <div className={classes.data}>
                <text> {document.nombre} </text>
            </div>
            <div className={classes.data}>
                <text> {document.vigencia} </text>
            </div>
            <div className={classes.data}>
                <text> {document.estado} </text>
            </div>
        </div>
    )
}

export default Document;
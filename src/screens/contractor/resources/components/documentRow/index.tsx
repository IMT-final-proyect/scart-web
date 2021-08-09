import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

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
    name: string,
    expiration: string,
    state: string
} 
const Document = ({ name, expiration, state }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} >
                <text> {name} </text>
            </Grid>
            <Grid item xs={3} >
                <text> {expiration} </text>
            </Grid>
            <Grid item xs={3} >
                <text> {state} </text>
            </Grid>
            <Grid item xs={1} >
                <CreateIcon />
                <DeleteIcon />
            </Grid>
    </Grid>
    )
}

export default Document;
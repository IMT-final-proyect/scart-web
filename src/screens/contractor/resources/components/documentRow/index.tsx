import React from 'react';
import { Grid } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

interface Props{
    name: string,
    expiration: string,
    state: string
} 
const Document = ({ name, expiration, state }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {expiration} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {state} </text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <CreateIcon />
                <DeleteIcon />
            </Grid>
    </Grid>
    )
}

export default Document;
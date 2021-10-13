import React from 'react';
import { Grid, } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

interface Props{
    name: string,
    surname: string,
    document: string,
    contractor: String

} 
const Driver = ({ name, surname, document, contractor }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {name} </text>
                <text> {surname} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {document} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.iconContainer}>
                <CreateIcon />
                <DeleteIcon />
            </Grid>
        </Grid>
    )
}

export default Driver;
import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props{
    name: string,
    document: string,
    birthday: string

} 
const Driver = ({ name, document, birthday }: Props) => {
    return(
        <Grid container direction="row" justifyContent='space-between'>
                <Grid item xs={3} >
                    <text> {name} </text>
                </Grid>
                <Grid item xs={3} >
                    <text> {document} </text>
                </Grid>
                <Grid item xs={3} >
                    <text> {birthday} </text>
                </Grid>
                <Grid item xs={1} >
                    <CreateIcon />
                    <DeleteIcon />
                </Grid>
        </Grid>
    )
}

export default Driver;
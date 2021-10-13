import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';

interface Props{
    name: string,
    owner: string,
    state: string,
    type: string
}
const DocumentRow = ({ name, owner, state, type }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between' alignItems='center'>
            <Grid item xs={4} className={classes.text}>
                <text> {name} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {owner} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {type} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {state} </text>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button color="primary" className={classes.text}>Evaluar</Button>
            </Grid>
    </Grid>
    )
}

export default DocumentRow;
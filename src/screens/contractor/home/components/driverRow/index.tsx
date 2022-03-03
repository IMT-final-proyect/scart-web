import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';

interface Props{
    name: string,
    surname: string,
    document: string,
    state: string
    color: string
    birthday: moment.Moment
} 
const Driver = ({ name, surname, document, state, color, birthday }: Props) => {
    const classes = useStyles({color});
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
                <text> {moment(birthday).format('DD/MM/YY')} </text>
            </Grid>
            <Grid item xs={3}>
                <div className={classes.state}>
                    <text className={classes.stateColor}> {state} </text>
                </div>
            </Grid>
        </Grid>
    )
}

export default Driver;
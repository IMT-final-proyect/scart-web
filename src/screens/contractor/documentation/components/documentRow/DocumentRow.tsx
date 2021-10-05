import React from 'react';
import { Grid } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';
import moment from 'moment';
import { IDocumentType } from '../../../../../utils/interfaces';

interface Props{
    contractor: string | undefined
    type: IDocumentType,
    state: number,
    expiration: moment.Moment,
}
const Document = ({ type, expiration, state, contractor }: Props) => {
    const classes = useStyles();
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={4} className={classes.text}>
                <text> {type.name} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {moment(expiration).format('DD/MM/YY')} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
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
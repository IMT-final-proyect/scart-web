import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { IDocumentType } from '../../../../../utils/interfaces';
import { getStateColor, getStateName } from '../../../../../utils/functions/states';

interface Props{
    contractor: string | undefined
    type: IDocumentType,
    state: number,
    expiration: moment.Moment,
    images: string[]
}
const VehicleDriver = ({ type, expiration, state, contractor, images }: Props) => {
    const stateName = getStateName(state)
    const color = getStateColor(stateName)
    const classes = useStyles({color});    
    
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={5} className={classes.text}>
                <text> {type.name.substring(0, 60)}... </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {contractor} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {moment(expiration).format('DD/MM/YY')} </text>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.state}>
                    <text className={classes.stateColor}> {stateName} </text>
                </div>
            </Grid>
    </Grid>
    )
}

export default VehicleDriver;
import React from 'react';
import { Grid, } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { IDocumentType } from '../../../../../utils/interfaces';
import { getStateColor, getStateName } from '../../../../../utils/functions/states';
import { getSeverityName } from '../../../../../utils/functions/severities';
import { getRolName } from '../../../../../utils/functions/roles'

interface Props{
    ownerType: number
    type: IDocumentType,
    state: number,
    expiration: moment.Moment
}
const Document = ({ ownerType, type, expiration, state }: Props) => {
    const stateName = getStateName(state)
    const color = getStateColor(stateName)
    const classes = useStyles({color});  
    const rolName = getRolName(ownerType)
    
    return(
        <Grid container direction="row" justifyContent='space-between'>
            <Grid item xs={3} className={classes.text}>
                <text> {type.name.length > 60 ? type.name.substring(0, 45)+'...' : type.name} </text>
            </Grid>
            <Grid item xs={3} className={classes.text}>
                <text> {rolName} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {moment(expiration).format('DD/MM/YY')} </text>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.state}>
                    <text className={classes.stateColor}> {stateName} </text>
                </div>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {getSeverityName(type.severity)} </text>
            </Grid>
        </Grid>
    )
}

export default Document;
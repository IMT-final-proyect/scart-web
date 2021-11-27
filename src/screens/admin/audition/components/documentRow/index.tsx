import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IContractor, IDocumentType } from '../../../../../utils/interfaces';
import { getRolName } from '../../../../../utils/functions/roles';
import { Link } from 'react-router-dom';
import { getSeverityColor, getSeverityName } from '../../../../../utils/functions/severities';

interface Props{
    type: IDocumentType
    owner: number
    contractor?: IContractor
    route: string
}
const DocumentRow = ({ type, owner, contractor, route }: Props) => {
    const typeName = getRolName(type.appliesTo)
    const severity =  getSeverityName(type.severity)
    const color = getSeverityColor(severity)
    const classes = useStyles({color});
    
    return(
        <Grid container className={classes.container} direction="row" justifyContent='space-between'>
            <Grid item xs={6} className={classes.text}>
                <text> {type.name.length > 60 ? type.name.substring(0, 87)+'...' : type.name} </text>
            </Grid>
            <Grid item xs={2} className={classes.text}>
              { contractor && 
                <text> {contractor.name.length > 60 ? contractor.name.substring(0, 87)+'...' : contractor.name} </text>
              }
            </Grid>
            <Grid item xs={2}>
                <div className={classes.state}>
                    <text className={classes.text}> {typeName} </text>
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.severity}>
                    <text className={classes.stateColor}> {severity} </text>
                </div>
            </Grid>
            <Grid item xs={2} className={classes.container}>
                <Button
                    className={classes.button}
                    component={Link}
                    to={route}
                > 
                    Evaluar
                </Button>
            </Grid>
        </Grid>
    )
}

export default DocumentRow;
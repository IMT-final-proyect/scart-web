import React from 'react';
import { Button, Grid, } from '@material-ui/core';
import useStyles from './styles';
import { IDocumentType } from '../../../../../utils/interfaces';
import { getRolName } from '../../../../../utils/functions/roles';
import { Link } from 'react-router-dom';

interface Props{
    type: IDocumentType
    owner: number
    route: string
}
const DocumentRow = ({ type, owner, route }: Props) => {
    const classes = useStyles()
    const typeName = getRolName(type.appliesTo)
    
    return(
        <Grid container className={classes.container} direction="row" justifyContent='space-between'>
            <Grid item xs={4} className={classes.text}>
                <text> {type.name.length > 60 ? type.name.substring(0, 60)+'...' : type.name} </text>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.state}>
                    <text className={classes.text}> {owner} </text>
                </div>
            </Grid>
            <Grid item xs={2}>
                <div className={classes.state}>
                    <text className={classes.text}> {typeName} </text>
                </div>
            </Grid>
            <Grid item xs={2} className={classes.text}>
                <text> {type.severity} </text>
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
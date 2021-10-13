import React from 'react';

import { Button, Card, Grid, Link, makeStyles, Theme, } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import useStyles from './styles';
import ExceptionRow from './components/exceptionRow/ExceptionRow';

const documents = [
    {
        'id':'1',
        'name':'Constancia de cuil',
        'contractor': 'Contratista 1',
        'state':'Vigente',
        'resource': 'Martin Belcic'
    },
    {
        'id':'2',
        'name':'Licencia de conducir',
        'contractor': 'Contratista 2',
        'state':'Vigente',
        'resource': 'Wenceslao Mateos'
    },
    {
        'id':'3',
        'name':'Cedula Verde',
        'contractor': 'Contratista 3',
        'state':'Vigente',
        'resource': 'Fiat 600'
    },
    {
        'id':'4',
        'name':'Seguro',
        'contractor': 'Contratista 4',
        'state':'Vigente',
        'resource': 'Ferrari SF21'
    },
]

const Exceptions = () => {
    const classes = useStyles();

    const addDriver = () => {
        console.log("add driver");
    }

    const addCar = () => {
        console.log("add driver");
    }

    const handleBackward = () => {

    }
    const handleFoward = () => {

    }

    return (
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Card className={classes.leftCard}>
                <Grid container className={classes.titleContainer} justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Excepciones
                    </text>
                    <Button onClick={addDriver}>
                        <AddCircleIcon className={classes.circleIcon}/>
                    </Button>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={4} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Documento
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Recurso
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Contratista
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Estado
                        </text>
                    </Grid>
                    <Grid item xs={2} className={classes.headerText}>
                        <text className={classes.headerText}>
                            Acciones
                        </text>
                    </Grid>
                </Grid>
                <Grid container direction='column' justifyContent='space-between' >
                    {documents.map((document) =>
                        <ExceptionRow 
                            key={document.id}
                            name={document.name}
                            resource={document.resource}
                            contractor={document.contractor}
                            state={document.state}
                        />)
                    }
                </Grid>
            </Card>
        </Grid>
    )
}

export default Exceptions;
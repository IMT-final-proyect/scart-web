import React from 'react';

import { Button, Card, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import useStyles from './styles';
import DocumentRow from './components/documentRow/DocumentRow';

const documents = [
    {
        'id':'1',
        'name':'Constancia de cuil',
        'expiration': '01/01/2022',
        'state':'Vigente',
        'resource': 'Martin Belcic'
    },
    {
        'id':'2',
        'name':'Licencia de conducir',
        'expiration': '30/01/2022',
        'state':'Vigente',
        'resource': 'Wenceslao Mateos'
    },
    {
        'id':'3',
        'name':'Cedula Verde',
        'expiration': '04/05/2022',
        'state':'Vigente',
        'resource': 'Fiat 600'
    },
    {
        'id':'4',
        'name':'Seguro',
        'expiration': '10/01/2022',
        'state':'Vigente',
        'resource': 'Ferrari SF21'
    },
]

const Documentacion = () => {
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
                <Grid container justifyContent='space-between'>
                    <text className={classes.textTitle}>
                        Documentación
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
                            Fecha de venc.
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
                        <DocumentRow 
                            key={document.id}
                            name={document.name}
                            resource={document.resource}
                            expiration={document.expiration}
                            state={document.state}
                        />)
                    }
                </Grid>
                </Card>
        </Grid>
    )
}

export default Documentacion;
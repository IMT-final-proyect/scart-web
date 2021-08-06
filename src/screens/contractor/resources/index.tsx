import React from 'react';

import { Button, Card, Grid, Paper } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Driver from './components/driverRow';
import Vehicle from './components/vehicleRow';
import { Link } from 'react-router-dom';
import { ROUTES } from '../navigation/routes';
import useStyles from './styles';

const conductores = [
    {
        'id': '1',
        'nombre': 'Juan Perez',
        'documento': '40344386',
        'fnac': '12/03/97',
    },
    {
        'id': '2',
        'nombre': 'Tincho Belcic',
        'documento': '39988948',
        'fnac': '30/08/93',
    },
    {
        'id': '3',
        'nombre': 'Lucas Pratto',
        'documento': '09122018',
        'fnac': '01/01/1986',
    },
]

const autos = [
    {
        'id': '1',
        'marca': 'BMW',
        'modelo': '2015',
        'patente': 'DIC912',
    },
    {
        'id': '2',
        'marca': 'Ferrari',
        'modelo': '2020',
        'patente': 'LEC016',
    },
    {
        'id': '3',
        'marca': 'Aston Martin',
        'modelo': '2021',
        'patente': 'VET005',
    },
]


const Resources = () => {
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

    const footer = (
        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                <text className={classes.footerText}>1-5 of 13</text>
            <Grid>
                <Button onClick={handleBackward}>
                    <ArrowBackIosIcon />
                </Button>
                <Button onClick={handleFoward}>
                    <ArrowForwardIosIcon />
                </Button>
            </Grid>
        </Grid>
    )

    return (
        <Grid container className={classes.container} direction='row' justifyContent='space-between'>
            <Grid item xs={6}>
                <Card className={classes.card}>
                    <Grid container className={classes.titleContainer} justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Conductores
                        </text>
                        <Button onClick={addDriver}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    <Grid container justifyContent='space-between'>
                        <Grid item xs={3}>
                            <text className={classes.headerText}>
                                Conductor
                            </text>
                        </Grid>
                        <Grid item xs={3}>
                            <text className={classes.headerText}>
                                Documento
                            </text>
                        </Grid>
                        <Grid item xs={3}>
                            <text className={classes.headerText}>
                                Fecha Nac.
                            </text>
                        </Grid>
                        <Grid item xs={1}>
                            <text className={classes.headerText}>
                                Acciones
                            </text>
                        </Grid>
                    </Grid>
                    <Grid container direction='column' justifyContent='space-between' >
                        {conductores.map((conductor) =>
                                <Button
                                    className={classes.button}
                                    component={Link}
                                    to={'/contratista'+ROUTES.driver}
                                >  
                                    <Driver 
                                        key={conductor.id}
                                        name={conductor.nombre}
                                        document={conductor.documento}
                                        birthday={conductor.fnac}
                                    />
                                </Button>)
                        }
                    </Grid>
                    {footer}
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card className={classes.card}>
                    <Grid container className={classes.titleContainer} justifyContent='space-between'>
                        <text className={classes.textTitle}>
                            Vehiculos
                        </text>
                        <Button onClick={addDriver}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </Grid>
                    <Grid container justifyContent='space-between'>
                        <text className={classes.headerText}>
                            Marca
                        </text>
                        <text className={classes.headerText}>
                            Modelo
                        </text>
                        <text className={classes.headerText}>
                            Patente
                        </text>
                        <text className={classes.headerText}>
                            Acciones
                        </text>
                    </Grid>
                    <Grid container direction='column' >
                        {autos.map((auto) =>
                            <Button 
                                className = {classes.button}
                                component={Link}
                                to={'/contratista'+ROUTES.vehicle}
                            > 
                                <Vehicle 
                                    key={auto.id}
                                    brand={auto.marca}
                                    model={auto.modelo}
                                    plate={auto.patente}
                                />
                            </Button>)
                        }
                        {footer}
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    )
}

export default Resources;
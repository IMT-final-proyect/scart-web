import React from 'react';

import { Button, Card, Grid } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Vehicle from '../vehicleRow';
import Document from '../documentRow';
import useStyles from './styles';


const autos = [
    {
        'id': '1',
        'brand': 'BMW',
        'model': '2015',
        'plate': 'DIC912',
    },
    {
        'id': '2',
        'brand': 'Ferrari',
        'model': '2020',
        'plate': 'LEC016',
    },
    {
        'id': '3',
        'brand': 'Aston Martin',
        'model': '2021',
        'plate': 'VET005',
    },
]

const documents = [
    {
        'id':'1',
        'name':'Seguro',
        'expiration': '01/01/2022',
        'state':'Vigente'
    },
    {
        'id':'2',
        'name':'VTV',
        'expiration': '30/01/2022',
        'state':'Vigente'
    },
    {
        'id':'3',
        'name':'Habilitacion',
        'expiration': '04/05/2022',
        'state':'Vigente'
    },
]

const VehicleDetails = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container} direction='column' justifyContent='space-between'>
            <Card className={classes.cardContainer}>
                <Grid container justifyContent='space-between'>
                    <Grid item xs={6}>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Marca: </text>
                            <text className={classes.data}> Mercedes Benz </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Modelo: </text>
                            <text className={classes.data}> W12 E 2021 </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Patente: </text>
                            <text className={classes.data}> 111 ADDD 1111 </text>
                        </div>
                    </Grid>
                </Grid>
            </Card>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card className={classes.leftCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Conductores
                            </text>
                        </Grid>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Marca
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Modelo
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Patente
                                </text>
                            </Grid>
                            <Grid item xs={2} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Acciones
                                </text>
                            </Grid>
                        </Grid>
                        <Grid container direction='column' justifyContent='space-between' >
                            {autos.map((auto) =>
                                <Vehicle 
                                    key={auto.id}
                                    brand={auto.brand}
                                    model={auto.model}
                                    plate={auto.plate}
                                />)
                            }
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card className={classes.rightCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Documentos
                            </text>
                            <Button onClick={() => console.log('xd')}>
                                <AddCircleIcon className={classes.circleIcon}/>
                            </Button>
                        </Grid>
                        <Grid container justifyContent='space-between'>
                            <text className={classes.headerText}>
                                Nombre
                            </text>
                            <text className={classes.headerText}>
                                Fec. vencimiento
                            </text>
                            <text className={classes.headerText}>
                                Estado
                            </text>
                            <text className={classes.headerText}>
                                Acciones
                            </text>
                        </Grid>
                        <Grid container direction='column' >
                            {documents.map((document) =>
                                <Document 
                                    key={document.id}
                                    name={document.name}
                                    expiration={document.expiration}
                                    state={document.state}
                                />)
                            }
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default VehicleDetails;
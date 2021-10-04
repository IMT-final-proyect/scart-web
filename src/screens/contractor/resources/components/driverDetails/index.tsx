import React from 'react';
import { Button, Card, Grid, Hidden } from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import image from '../../../../../assets/images/pratto.jpg'
import Vehicle from '../vehicleRow'
import Document from '../documentRow';
import useStyles from './styles' 
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../../redux/rootReducer';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { IDriver } from '../../../../../utils/interfaces';


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
        'name':'Constancia de cuil',
        'expiration': '01/01/2022',
        'state':'Vigente'
    },
    {
        'id':'2',
        'name':'Licencia de conducir',
        'expiration': '30/01/2022',
        'state':'Vigente'
    },
    {
        'id':'3',
        'name':'Cedula Verde',
        'expiration': '04/05/2022',
        'state':'Vigente'
    },
    {
        'id':'4',
        'name':'Seguro',
        'expiration': '10/01/2022',
        'state':'Vigente'
    },
]



const DriverDetails = () => {
    const classes = useStyles();
    const params: any = useParams();
    const driver: IDriver = useSelector((state: RootState) => {
        const drivers = state.resources.drivers.data
        return drivers[params.id]
    })

    return (
        <Grid container className={classes.container} direction='column' justifyContent='space-between'>
            <Card className={classes.cardContainer}>
                <Grid container justifyContent='space-between' alignItems={'center'}>
                    {/* <Hidden only={["xs","sm"]}>
                        <Grid item xs={2} md={6}>
                            <img src={image} className={classes.image} />
                        </Grid>
                    </Hidden> */}
                    <Grid item xs={12} md={6}>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Nombre: </text>
                            <text className={classes.data}> {driver.name} </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Apellido: </text>
                            <text className={classes.data}> {driver.surname} </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> Fecha de Nac.: </text>
                            <text className={classes.data}> {moment(driver.birth_date).format('DD/MM/YY')} </text>
                        </div>
                        <div className={classes.dataContainer}>
                            <text className={classes.dataField}> CUIT: </text>
                            <text className={classes.data}> {driver.cuit} </text>
                        </div> 
                    </Grid>
                </Grid>
                </Card>
            <Grid container className={classes.container} direction='row' justifyContent='space-between'>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Card className={classes.leftCard}>
                        <Grid container className={classes.titleContainer} justifyContent='space-between'>
                            <text className={classes.textTitle}>
                                Vehiculos conducidos
                            </text>
                        </Grid>
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Conductor
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Documento
                                </text>
                            </Grid>
                            <Grid item xs={3} className={classes.headerText}>
                                <text className={classes.headerText}>
                                    Fecha Nac.
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
                                Documentación
                            </text>
                            <Button onClick={() => console.log('xd')}>
                                <AddCircleIcon className={classes.circleIcon}/>
                            </Button>
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

export default DriverDetails;
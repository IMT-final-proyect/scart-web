import React from 'react';

import { Button, Card, makeStyles, Theme } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { drawerWidth, headerSize } from '../../../utils/constants';
import globalColors from '../../../utils/styles/globalColors';
import Driver from './components/driverRow';
import Vehicle from './components/vehicleRow';
import { Link } from 'react-router-dom';
import { ROUTES } from '../navigation/routes';

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
        'nombre': 'Boca Juniors',
        'documento': '09122018',
        'fnac': '01/01/2000',
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

const useStyles = makeStyles((theme: Theme) => ({
    container:{
        marginLeft: drawerWidth,
    },
    cardContainer:{
        display: 'flex',
        flex: 1,
    },
    card:{
        flex: 1,
        marginTop: '5%',
        marginInline: '2%',
    },
    titleContainer:{
        display: 'flex',
        flex:1,
        justifyContent: 'space-between',

    },
    textTitle:{
        fontSize:20,
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
    },
    circleIcon:{
        marginTop: '3%',
        marginBottom: '3%',
        marginRight: '3%',
    },
    header:{
        display: 'flex',
        flex:1,
        justifyContent: 'space-between',
        marginLeft: '3%',
        marginRight: '3%',
    },
    headerText:{
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    footer:{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerText:{
        marginLeft: '5%',
    },
    arrowsContainer:{
        marginRight: '3%',
    },
    button:{
        display: 'flex',
        flexDirection: 'row',
    }
}));


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
        <div className={classes.footer}>
            <text className={classes.footerText}>1-5 of 13</text>
            <div className={classes.arrowsContainer}>
                <Button onClick={handleBackward}>
                    <ArrowBackIosIcon />
                </Button>
                <Button onClick={handleFoward}>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </div>
    )

    return (
        <div className={classes.container}>
            <div className={classes.cardContainer}>
                <Card className={classes.card}>
                    <div className={classes.titleContainer}>
                        <text className={classes.textTitle}>
                            Conductores
                        </text>
                        <Button onClick={addDriver}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </div>
                    <div className={classes.header}>
                        <text className={classes.headerText}>
                            Conductor
                        </text>
                        <text className={classes.headerText}>
                            Documento
                        </text>
                        <text className={classes.headerText}>
                            Fecha Nac.
                        </text>
                        <text className={classes.headerText}>
                            Acciones
                        </text>
                    </div>
                    {conductores.map((conductor) =>
                        <Button 
                            className = {classes.button}
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
                    {footer}
                </Card>
                <Card className={classes.card}>
                    <div className={classes.titleContainer}>
                        <text className={classes.textTitle}>
                            Conductores
                        </text>
                        <Button onClick={addCar}>
                            <AddCircleIcon className={classes.circleIcon}/>
                        </Button>
                    </div>
                    <div className={classes.header}>
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
                    </div>
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
                </Card>
            </div>
        </div>
    )
}

export default Resources;
import React from 'react';
import { Button, Card, Grid, makeStyles, Theme } from "@material-ui/core"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import globalColors from "../../../../../utils/styles/globalColors" 
import { headerSize } from '../../../../../utils/constants';
import image from '../../../../../assets/images/pratto.jpg'
import Driver from '../driverRow';
import Vehicle from '../vehicleRow'
import Document from '../documentRow';


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

const document = [
    {
        'id':'1',
        'nombre':'Constancia de cuil',
        'vigencia': '01/01/2022',
        'estado':'Vigente'
    },
    {
        'id':'2',
        'nombre':'Licencia de conducir',
        'vigencia': '30/01/2022',
        'estado':'Vigente'
    },
    {
        'id':'3',
        'nombre':'Cedula Verde',
        'vigencia': '04/05/2022',
        'estado':'Vigente'
    },
    {
        'id':'4',
        'nombre':'Seguro',
        'vigencia': '10/01/2022',
        'estado':'Vigente'
    },
]

const useStyles = makeStyles((theme: Theme) => ({
    container:{
    },
    cardContainer:{
        padding: '2.5%'
    },
    top:{
        marginRight: '3%',
        marginLeft: '3%',
    },
    botCardContainer:{
        marginTop: '1%',
        marginRight: '3%',
        marginLeft: '3%',
        marginBottom: '3%'
    },
    dataContainer:{
        marginTop: '2.5%',
        marginLeft: '7.5%'
    },
    leftData:{
    },
    rightData:{
        marginLeft: '40%',
    },
    dataFieldContainer:{
    },
    dataField:{
        marginBottom: '10%',
        color: globalColors.darkGrey
    },
    data:{
        marginLeft: '5%',
        fontWeight: 'bold'
    },
    imageContainer:{
        marginLeft: '5%',
        marginTop: '2%'
    },
    image:{
        borderRadius: '50%',
        height: 100,
    },
    titleContainer:{
        justifyContent: 'space-between',

    },
    textTitle:{
        fontSize:20,
        marginTop: '3%',
        marginBottom: '3%',
        marginLeft: '3%',
    },
    header:{
        justifyContent: 'space-between',
        marginLeft: '3%',
        marginRight: '3%',
    },
    headerText:{
        color: globalColors.darkGrey,
        fontSize: 12,
    },
    footer:{
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerText:{
        marginLeft: '5%',
    },
    arrowsContainer:{
        marginRight: '3%',
    },
}));

const DriverDetails = () => {
    const classes = useStyles();

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
        <Grid className={classes.container}>
            <Card className={classes.cardContainer}>
                <Grid
                    container
                    direction={'row'}
                >
                    <img src={image} className={classes.image} />
                    <Grid className={classes.top}>
                                <div className={classes.dataFieldContainer}>
                                    <text className={classes.dataField}> Nombre: </text>
                                    <text className={classes.data}> Lucas </text>
                                </div>
                                <div className={classes.dataFieldContainer}>
                                    <text className={classes.dataField}> DNI: </text>
                                    <text className={classes.data}> 912201831 </text>
                                </div>
                                <div className={classes.dataFieldContainer}>
                                    <text className={classes.dataField}> Telefono: </text>
                                    <text className={classes.data}> +542234484492 </text>
                                </div>
                        </Grid>
                        <Grid>
                            <div>
                                <div>
                                    <text className={classes.dataField}> Apellido: </text>
                                    <text className={classes.data}> Pratto </text>
                                </div>
                                <div className={classes.dataFieldContainer}>
                                    <text className={classes.dataField}> Email: </text>
                                    <text className={classes.data}> osopratto@hotmail.com </text>
                                </div>
                                <div className={classes.dataFieldContainer}>
                                    <text className={classes.dataField}> Fecha de Nac.: </text>
                                    <text className={classes.data}> 04/06/1988 </text>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
            </Card>
        </Grid>
    )
}

export default DriverDetails;